import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const proposalId = params.id;
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  try {
    // Get the proposal
    const { data: proposal, error: fetchError } = await supabase
      .from('ops_proposals')
      .select('*')
      .eq('id', proposalId)
      .single();
    
    if (fetchError || !proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }
    
    if (proposal.status !== 'pending') {
      return NextResponse.json({ error: 'Proposal already processed' }, { status: 400 });
    }
    
    // Create mission
    const { data: mission, error: missionError } = await supabase
      .from('ops_missions')
      .insert({
        title: proposal.title,
        project: proposal.project,
        status: 'approved',
        created_by: proposalId
      })
      .select()
      .single();
    
    if (missionError) {
      return NextResponse.json({ error: 'Failed to create mission' }, { status: 500 });
    }
    
    // Create steps
    for (const step of proposal.proposed_steps || []) {
      await supabase.from('ops_mission_steps').insert({
        mission_id: mission.id,
        project: proposal.project,
        kind: step.kind,
        status: 'queued',
        payload: step.payload
      });
    }
    
    // Update proposal status
    await supabase
      .from('ops_proposals')
      .update({ status: 'accepted' })
      .eq('id', proposalId);
    
    // Log event
    await supabase.from('ops_agent_events').insert({
      agent_id: proposal.agent_id,
      kind: 'proposal_approved',
      title: `Approved: ${proposal.title}`,
      summary: `Manually approved by user`,
      tags: ['approved', proposal.agent_id, proposal.project]
    });
    
    return NextResponse.redirect(new URL('/mission-control', request.url));
  } catch (err) {
    console.error('Approve error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
