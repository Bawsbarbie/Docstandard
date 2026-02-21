// Trigger rule checkers for the heartbeat
// Each function evaluates a condition and returns whether to fire

const { createClient } = require('@supabase/supabase-js');

// Proactive: Dex researches SEO opportunities every 4 hours
async function checkProactiveResearch(sb) {
  // Check if we've done research in the last 4 hours
  const { data: recent } = await sb
    .from('ops_agent_events')
    .select('created_at')
    .eq('agent_id', 'dex')
    .eq('kind', 'research_completed')
    .order('created_at', { ascending: false })
    .limit(1);
  
  if (recent && recent.length > 0) {
    const hoursSince = (Date.now() - new Date(recent[0].created_at)) / (1000 * 60 * 60);
    if (hoursSince < 4) return { fired: false, reason: 'Too soon' };
  }
  
  // 70% chance to fire (not every time - adds naturalness)
  if (Math.random() > 0.7) return { fired: false, reason: 'Skipped by probability' };
  
  // Topics to rotate through
  const topics = [
    'CargoWise integration keywords',
    'Freight forwarding SEO opportunities', 
    'Customs declaration automation trends',
    'SAP TM vs Oracle OTM comparison',
    'Logistics document processing workflows',
    'EDI vs API integration trends'
  ];
  
  const topic = topics[Math.floor(Math.random() * topics.length)];
  
  return {
    fired: true,
    proposal: {
      agent_id: 'dex',
      title: `Proactive Research: ${topic}`,
      proposed_steps: [{
        kind: 'research',
        payload: {
          topic,
          agent_id: 'dex',
          research_type: 'serp',
          proactive: true
        }
      }]
    }
  };
}

// Reactive: When Dex completes research with low confidence, Nova QA reviews it
async function checkLowConfidenceResearch(sb) {
  // Find recent research with confidence < 0.7 that hasn't been QA'd
  const { data: steps } = await sb
    .from('ops_mission_steps')
    .select('*')
    .eq('kind', 'research')
    .eq('status', 'succeeded')
    .order('updated_at', { ascending: false })
    .limit(5);
  
  for (const step of (steps || [])) {
    const confidence = step.payload?.result?.confidence || 0;
    if (confidence < 0.7) {
      // Check if already QA'd
      const { data: existing } = await sb
        .from('ops_agent_events')
        .select('id')
        .eq('kind', 'qa_review')
        .eq('title', `QA: ${step.payload?.topic}`)
        .limit(1);
      
      if (!existing || existing.length === 0) {
        return {
          fired: true,
          proposal: {
            agent_id: 'nova',
            title: `QA Review: ${step.payload?.topic}`,
            proposed_steps: [{
              kind: 'analyze',
              payload: {
                target_step_id: step.id,
                topic: step.payload?.topic,
                agent_id: 'nova',
                confidence_issue: true
              }
            }]
          }
        };
      }
    }
  }
  
  return { fired: false };
}

// Proactive: Nova reviews system health every 6 hours
async function checkProactiveHealthCheck(sb) {
  const { data: recent } = await sb
    .from('ops_agent_events')
    .select('created_at')
    .eq('agent_id', 'nova')
    .eq('kind', 'health_check')
    .order('created_at', { ascending: false })
    .limit(1);
  
  if (recent && recent.length > 0) {
    const hoursSince = (Date.now() - new Date(recent[0].created_at)) / (1000 * 60 * 60);
    if (hoursSince < 6) return { fired: false };
  }
  
  // 60% chance to fire
  if (Math.random() > 0.6) return { fired: false };
  
  return {
    fired: true,
    proposal: {
      agent_id: 'nova',
      title: 'System Health Check',
      proposed_steps: [{
        kind: 'analyze',
        payload: {
          topic: 'System health and metrics review',
          agent_id: 'nova',
          health_check: true
        }
      }]
    }
  };
}

// Reactive: When there's a failed mission, alert and suggest fixes
async function checkFailedMissions(sb) {
  const { data: failed } = await sb
    .from('ops_missions')
    .select('*')
    .eq('status', 'failed')
    .order('updated_at', { ascending: false })
    .limit(3);
  
  for (const mission of (failed || [])) {
    // Check if already alerted
    const { data: existing } = await sb
      .from('ops_agent_events')
      .select('id')
      .eq('kind', 'failure_alert')
      .ilike('title', `%${mission.title}%`)
      .limit(1);
    
    if (!existing || existing.length === 0) {
      return {
        fired: true,
        proposal: {
          agent_id: 'nova',
          title: `Diagnose Failed Mission: ${mission.title}`,
          proposed_steps: [{
            kind: 'analyze',
            payload: {
              mission_id: mission.id,
              topic: mission.title,
              agent_id: 'nova',
              failure_analysis: true
            }
          }]
        }
      };
    }
  }
  
  return { fired: false };
}

module.exports = {
  checkProactiveResearch,
  checkLowConfidenceResearch,
  checkProactiveHealthCheck,
  checkFailedMissions,
  
  // All checkers for heartbeat to iterate through
  ALL_CHECKERS: [
    { name: 'proactive_research', fn: checkProactiveResearch, cooldown: 240 }, // 4 hours
    { name: 'low_confidence_qa', fn: checkLowConfidenceResearch, cooldown: 60 }, // 1 hour
    { name: 'health_check', fn: checkProactiveHealthCheck, cooldown: 360 }, // 6 hours
    { name: 'failed_mission_alert', fn: checkFailedMissions, cooldown: 30 } // 30 min
  ]
};
