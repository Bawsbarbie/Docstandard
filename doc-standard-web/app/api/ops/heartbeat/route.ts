import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  // Auth check
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = {
    timestamp: new Date().toISOString(),
    triggers: 0,
    proposals: 0,
    recovered: 0,
    events: 0
  };

  try {
    // 1. Evaluate proactive triggers
    const proactiveTriggers = await evaluateProactiveTriggers();
    results.triggers += proactiveTriggers.length;
    
    // 2. Create proposals from triggered actions
    for (const trigger of proactiveTriggers) {
      const created = await createProposal(trigger);
      if (created) results.proposals++;
    }

    // 3. Auto-approve low-risk proposals
    const approved = await autoApproveProposals();
    results.proposals += approved;

    // 4. Recover stuck tasks (30+ min running)
    const { data: stuck } = await supabase
      .from('ops_mission_steps')
      .update({ status: 'failed', payload: { error: 'Recovered: timed out after 30 min' } })
      .eq('status', 'running')
      .lt('created_at', new Date(Date.now() - 30 * 60 * 1000).toISOString())
      .select('id');
    results.recovered = stuck?.length || 0;

    // 5. Log heartbeat event
    await supabase.from('ops_agent_events').insert({
      agent_id: 'system',
      kind: 'heartbeat',
      title: 'System Heartbeat',
      summary: `Triggers: ${results.triggers}, Proposals: ${results.proposals}, Recovered: ${results.recovered}`,
      tags: ['system', 'heartbeat']
    });

    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error('Heartbeat error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Evaluate proactive triggers
async function evaluateProactiveTriggers() {
  const triggered = [];
  
  // Check 1: Proactive research (Dex) - every 4 hours, 70% chance
  const { data: recentResearch } = await supabase
    .from('ops_agent_events')
    .select('created_at')
    .eq('agent_id', 'dex')
    .eq('kind', 'research_completed')
    .order('created_at', { ascending: false })
    .limit(1);
  
  let shouldResearch = true;
  if (recentResearch?.length) {
    const hoursSince = (Date.now() - new Date(recentResearch[0].created_at).getTime()) / (1000 * 60 * 60);
    if (hoursSince < 4) shouldResearch = false;
  }
  
  if (shouldResearch && Math.random() < 0.7) {
    const topics = [
      'CargoWise integration SEO',
      'Logistics TMS comparison keywords',
      'Customs declaration automation',
      'Freight forwarding content gaps',
      'EDI API integration trends'
    ];
    triggered.push({
      agent_id: 'dex',
      title: `Research: ${topics[Math.floor(Math.random() * topics.length)]}`,
      steps: [{ kind: 'research', payload: { research_type: 'serp' } }],
      project: 'docstandard'
    });
  }
  
  // Check 2: Health check (Nova) - every 6 hours, 60% chance
  const { data: recentHealth } = await supabase
    .from('ops_agent_events')
    .select('created_at')
    .eq('agent_id', 'nova')
    .eq('kind', 'health_check')
    .order('created_at', { ascending: false })
    .limit(1);
  
  let shouldHealthCheck = true;
  if (recentHealth?.length) {
    const hoursSince = (Date.now() - new Date(recentHealth[0].created_at).getTime()) / (1000 * 60 * 60);
    if (hoursSince < 6) shouldHealthCheck = false;
  }
  
  if (shouldHealthCheck && Math.random() < 0.6) {
    triggered.push({
      agent_id: 'nova',
      title: 'System Health Review',
      steps: [{ kind: 'analyze', payload: { analysis_type: 'health_check' } }],
      project: 'docstandard'
    });
  }
  
  return triggered;
}

// Create proposal from trigger
async function createProposal(trigger: any) {
  try {
    // Check daily quota
    const { data: quota } = await supabase
      .from('ops_policy')
      .select('value')
      .eq('key', 'daily_quota')
      .single();
    
    const today = new Date().toISOString().split('T')[0];
    const { count } = await supabase
      .from('ops_proposals')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today);
    
    if (count && count >= (quota?.value?.limit || 10)) {
      console.log('Daily quota reached, skipping proposal');
      return false;
    }
    
    // Create proposal
    const { data: proposal } = await supabase.from('ops_proposals').insert({
      agent_id: trigger.agent_id,
      project: trigger.project,
      title: trigger.title,
      proposed_steps: trigger.steps.map((s: any) => ({
        ...s,
        payload: { ...s.payload, topic: trigger.title, agent_id: trigger.agent_id }
      })),
      status: 'pending'
    }).select();
    
    console.log('Created proposal:', proposal?.[0]?.id);
    return true;
  } catch (err) {
    console.error('Failed to create proposal:', err);
    return false;
  }
}

// Auto-approve low-risk proposals (Dex only - Nova always requires approval)
async function autoApproveProposals() {
  let approved = 0;
  
  try {
    // Get pending proposals
    const { data: proposals } = await supabase
      .from('ops_proposals')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(5);
    
    for (const proposal of (proposals || [])) {
      // NEVER auto-approve Nova's proposals - always require manual review
      if (proposal.agent_id === 'nova') {
        // Notify that Nova is waiting for approval (only once per proposal)
        const { data: existingEvent } = await supabase
          .from('ops_agent_events')
          .select('id')
          .eq('kind', 'approval_needed')
          .ilike('title', `%${proposal.title}%`)
          .limit(1);
        
        if (!existingEvent || existingEvent.length === 0) {
          await supabase.from('ops_agent_events').insert({
            agent_id: 'nova',
            kind: 'approval_needed',
            title: `Nova requests approval: ${proposal.title}`,
            summary: `Nova proposed: "${proposal.title}". Review in ops_proposals table.`,
            tags: ['approval_needed', 'nova', proposal.project]
          });
          
          console.log('Nova proposal pending approval:', proposal.title);
        }
        continue; // Skip to next proposal - Nova's stay pending
      }
      
      // Only auto-approve Dex's research proposals
      if (proposal.agent_id !== 'dex') continue;
      
      // Only auto-approve research steps
      const isLowRisk = proposal.proposed_steps?.every((s: any) => 
        s.kind === 'research'
      );
      
      if (!isLowRisk) continue;
      
      // Create mission for Dex's research
      const { data: mission } = await supabase.from('ops_missions').insert({
        title: proposal.title,
        project: proposal.project,
        status: 'approved',
        created_by: proposal.id
      }).select();
      
      if (mission?.[0]) {
        // Create steps
        for (const step of proposal.proposed_steps) {
          await supabase.from('ops_mission_steps').insert({
            mission_id: mission[0].id,
            project: proposal.project,
            kind: step.kind,
            status: 'queued',
            payload: step.payload
          });
        }
        
        // Mark proposal as accepted
        await supabase
          .from('ops_proposals')
          .update({ status: 'accepted' })
          .eq('id', proposal.id);
        
        approved++;
      }
    }
  } catch (err) {
    console.error('Auto-approve error:', err);
  }
  
  return approved;
}
