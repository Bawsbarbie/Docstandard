// Reaction Matrix - Agents respond to each other's events
// When Dex finishes research, Nova automatically QA reviews it

async function processReactions(supabase, event) {
  const reactions = [];
  
  // Rule 1: When Dex completes research with low confidence, Nova QA reviews it
  if (event.agent_id === 'dex' && event.kind === 'research_completed') {
    // Check if result had low confidence
    const stepId = event.tags?.find(t => t.startsWith('step:'))?.replace('step:', '');
    if (stepId) {
      const { data: step } = await supabase
        .from('ops_mission_steps')
        .select('payload')
        .eq('id', stepId)
        .single();
      
      const confidence = step?.payload?.result?.confidence || 0;
      
      // Nova reviews if confidence < 0.8 OR randomly 30% of the time
      if (confidence < 0.8 || Math.random() < 0.3) {
        reactions.push({
          source_agent: 'dex',
          target_agent: 'nova',
          action: 'qa_review',
          reason: confidence < 0.8 ? 'low_confidence' : 'random_check',
          payload: {
            trigger_event_id: event.id,
            topic: event.title.replace('Research: ', ''),
            step_id: stepId,
            confidence
          }
        });
      }
    }
  }
  
  // Rule 2: When a mission fails, Nova diagnoses it
  if (event.kind === 'mission_failed') {
    reactions.push({
      source_agent: event.agent_id,
      target_agent: 'nova',
      action: 'failure_analysis',
      reason: 'mission_failed',
      payload: {
        trigger_event_id: event.id,
        mission_id: event.tags?.find(t => t.startsWith('mission:'))?.replace('mission:', '')
      }
    });
  }
  
  // Rule 3: When Dex finds high-opportunity keywords, log for follow-up
  if (event.agent_id === 'dex' && event.kind === 'research_completed') {
    const stepId = event.tags?.find(t => t.startsWith('step:'))?.replace('step:', '');
    if (stepId) {
      const { data: step } = await supabase
        .from('ops_mission_steps')
        .select('payload')
        .eq('id', stepId)
        .single();
      
      const serpData = step?.payload?.result?.serpData;
      if (serpData?.diversityScore > 0.8 && !serpData?.hasBigPlayers) {
        // High opportunity found - create a proposal for content creation
        reactions.push({
          source_agent: 'dex',
          target_agent: 'leah', // This would need human approval
          action: 'content_opportunity',
          reason: 'high_opportunity_keywords',
          payload: {
            trigger_event_id: event.id,
            topic: event.title.replace('Research: ', ''),
            opportunity_score: serpData.diversityScore,
            note: 'Low competition keywords identified - consider content creation'
          }
        });
      }
    }
  }
  
  return reactions;
}

// Create proposals from reactions
async function createProposalsFromReactions(supabase, reactions) {
  const created = [];
  
  for (const reaction of reactions) {
    try {
      // Check cooldown (don't spam)
      const { data: recent } = await supabase
        .from('ops_proposals')
        .select('created_at')
        .eq('agent_id', reaction.target_agent)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (recent?.length) {
        const minutesSince = (Date.now() - new Date(recent[0].created_at)) / (1000 * 60);
        if (minutesSince < 30) continue; // Skip if created proposal in last 30 min
      }
      
      let title, steps;
      
      switch (reaction.action) {
        case 'qa_review':
          title = `QA Review: ${reaction.payload.topic}`;
          steps = [{
            kind: 'analyze',
            payload: {
              analysis_type: 'qa_review',
              target_step_id: reaction.payload.step_id,
              trigger: reaction.reason
            }
          }];
          break;
          
        case 'failure_analysis':
          title = `Analyze Failure: Mission ${reaction.payload.mission_id?.slice(0, 8)}`;
          steps = [{
            kind: 'analyze',
            payload: {
              analysis_type: 'failure_diagnosis',
              target_mission_id: reaction.payload.mission_id
            }
          }];
          break;
          
        case 'content_opportunity':
          title = `Content Opportunity: ${reaction.payload.topic}`;
          steps = [{
            kind: 'analyze',
            payload: {
              analysis_type: 'content_opportunity',
              opportunity_score: reaction.payload.opportunity_score,
              note: reaction.payload.note
            }
          }];
          break;
          
        default:
          continue;
      }
      
      // Create the proposal
      const { data: proposal } = await supabase.from('ops_proposals').insert({
        agent_id: reaction.target_agent,
        project: 'docstandard',
        title,
        proposed_steps: steps,
        status: 'pending',
        metadata: {
          triggered_by: reaction.source_agent,
          trigger_reason: reaction.reason,
          reaction_matrix: true
        }
      }).select();
      
      if (proposal?.[0]) {
        created.push(proposal[0]);
        console.log(`[Reaction] ${reaction.target_agent} will ${reaction.action} (triggered by ${reaction.source_agent})`);
      }
    } catch (err) {
      console.error('[Reaction] Failed to create proposal:', err.message);
    }
  }
  
  return created;
}

module.exports = {
  processReactions,
  createProposalsFromReactions
};
