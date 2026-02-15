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
    reactions: 0,
    recovered: 0,
    learnings: 0
  };

  try {
    // 1. Evaluate triggers (check conditions, create proposals)
    const { data: triggers } = await supabase
      .from('ops_trigger_rules')
      .select('*')
      .eq('enabled', true);
    
    for (const rule of triggers || []) {
      const shouldFire = await evaluateTrigger(rule);
      if (shouldFire) {
        await createProposalFromTrigger(rule);
        results.triggers++;
      }
    }

    // 2. Process reaction queue (agent interactions)
    // TODO: Implement based on conversation matrix

    // 3. Recover stuck tasks (30+ min running)
    const { data: stuck } = await supabase
      .from('ops_mission_steps')
      .update({ status: 'failed' })
      .eq('status', 'running')
      .lt('created_at', new Date(Date.now() - 30 * 60 * 1000).toISOString())
      .select('id');
    results.recovered = stuck?.length || 0;

    // 4. Learn from outcomes (write memories from results)
    // TODO: Implement outcome learning

    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error('Heartbeat error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

async function evaluateTrigger(rule: any): Promise<boolean> {
  // Check cooldown
  if (rule.last_fired_at) {
    const minutesSince = (Date.now() - new Date(rule.last_fired_at).getTime()) / 60000;
    if (minutesSince < rule.cooldown_minutes) return false;
  }
  
  // TODO: Implement condition checking based on rule.trigger_event
  // For now, proactive triggers with probability
  if (rule.trigger_event.startsWith('proactive_')) {
    return Math.random() < 0.3; // 30% chance
  }
  
  return false;
}

async function createProposalFromTrigger(rule: any) {
  await supabase.from('ops_proposals').insert({
    agent_id: rule.action_config.target_agent,
    project: rule.project,
    title: `Triggered: ${rule.name}`,
    proposed_steps: rule.action_config.proposed_steps || [],
    status: 'pending'
  });
  
  await supabase
    .from('ops_trigger_rules')
    .update({ fire_count: rule.fire_count + 1, last_fired_at: new Date().toISOString() })
    .eq('id', rule.id);
}
