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
    
    // Update proposal status
    await supabase
      .from('ops_proposals')
      .update({ status: 'rejected' })
      .eq('id', proposalId);
    
    // Log event
    await supabase.from('ops_agent_events').insert({
      agent_id: proposal.agent_id,
      kind: 'proposal_rejected',
      title: `Rejected: ${proposal.title}`,
      summary: `Manually rejected by user`,
      tags: ['rejected', proposal.agent_id, proposal.project]
    });
    
    return NextResponse.redirect(new URL('/mission-control', request.url));
  } catch (err) {
    console.error('Reject error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
