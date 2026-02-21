require('dotenv').config({ override: true });

const { createClient } = require('@supabase/supabase-js');
const { postToProjectChannel } = require('./discord');
const { formatNovaEmbed } = require('./discord-nova');
const { learnFromQA, getRelevantMemories } = require('./outcome-learning');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const WORKER_ID = 'nova-observer-worker-1';
const POLL_INTERVAL = 20000; // 20 seconds (Nova is more thoughtful)

async function main() {
  console.log(`[${WORKER_ID}] Starting Nova observer worker...`);
  console.log(`[${WORKER_ID}] Ready to watch for issues and suggest alternatives!`);
  
  while (true) {
    try {
      // Check if worker is enabled
      const { data: policy } = await supabase
        .from('ops_policy')
        .select('value')
        .eq('key', 'observer_worker_enabled')
        .single();
      
      if (policy?.value?.enabled === false) {
        console.log('Worker disabled, sleeping...');
        await sleep(POLL_INTERVAL * 4);
        continue;
      }

      // 1. Watch for completed research steps to QA
      const { data: completedSteps } = await supabase
        .from('ops_mission_steps')
        .select('*')
        .eq('status', 'succeeded')
        .eq('kind', 'research')
        .order('updated_at', { ascending: false })
        .limit(5);

      for (const step of (completedSteps || [])) {
        const result = step.payload?.result;
        if (!result) continue;
        
        // Check if we already QA'd this
        const { data: existingQA } = await supabase
          .from('ops_agent_events')
          .select('id')
          .eq('kind', 'qa_review')
          .eq('title', `QA: ${step.payload?.topic}`)
          .limit(1);
        
        if (existingQA && existingQA.length > 0) continue;
        
        // Perform QA review
        const qaResult = await performQA(step.payload, result);
        
        // Log QA event
        await supabase.from('ops_agent_events').insert({
          agent_id: 'nova',
          project: step.project,
          kind: 'qa_review',
          title: `QA: ${step.payload?.topic}`,
          summary: qaResult.summary,
          tags: ['qa', 'review', step.project, step.payload?.agent_id || 'dex']
        });
        
        // Post to Discord
        const project = step.project || 'docstandard';
        await postToProjectChannel(project, `🔍 ${qaResult.opener}`, { embeds: formatNovaEmbed(qaResult) });
        
        // Learn from this QA outcome
        const lessonsLearned = await learnFromQA(supabase, qaResult);
        if (lessonsLearned > 0) {
          console.log(`[${WORKER_ID}] Learned ${lessonsLearned} lessons from this QA`);
        }
        
        console.log(`[${WORKER_ID}] QA'd research on: ${step.payload?.topic}`);
      }

      // 2. Watch for stuck/failed steps
      const { data: failedSteps } = await supabase
        .from('ops_mission_steps')
        .select('*')
        .eq('status', 'failed')
        .order('updated_at', { ascending: false })
        .limit(3);

      for (const step of (failedSteps || [])) {
        const { data: existingAlert } = await supabase
          .from('ops_agent_events')
          .select('id')
          .eq('kind', 'stuck_alert')
          .eq('title', `Alert: ${step.payload?.topic}`)
          .limit(1);
        
        if (existingAlert && existingAlert.length > 0) continue;
        
        const alert = {
          agent_id: 'nova',
          project: step.project,
          kind: 'stuck_alert',
          title: `Alert: ${step.payload?.topic}`,
          summary: `Task failed: ${step.payload?.topic}. For everything, there is a solution.`,
          tags: ['alert', 'failed', step.project]
        };
        
        await supabase.from('ops_agent_events').insert(alert);
        await postToProjectChannel(step.project || 'docstandard', `⚠️ I noticed something...`, {
          embeds: [{
            title: `Task Failed: ${step.payload?.topic}`,
            description: `For everything, there is a solution. What if we tried a different approach?`,
            color: 0xf39c12, // Orange for warnings
            fields: [
              { name: 'What happened', value: step.payload?.error || 'Unknown error', inline: false },
              { name: 'Suggestion', value: 'Check the logs and consider retrying with different parameters', inline: false }
            ],
            footer: { text: 'Nova Observer | For everything, there is a solution.' },
            timestamp: new Date().toISOString()
          }]
        });
      }

      // 3. Watch for new proposals to sanity check
      const { data: pendingProposals } = await supabase
        .from('ops_proposals')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(3);

      for (const proposal of (pendingProposals || [])) {
        const { data: existingCheck } = await supabase
          .from('ops_agent_events')
          .select('id')
          .eq('kind', 'proposal_review')
          .eq('title', `Review: ${proposal.title}`)
          .limit(1);
        
        if (existingCheck && existingCheck.length > 0) continue;
        
        const review = await reviewProposal(proposal);
        
        await supabase.from('ops_agent_events').insert({
          agent_id: 'nova',
          project: proposal.project,
          kind: 'proposal_review',
          title: `Review: ${proposal.title}`,
          summary: review.summary,
          tags: ['review', 'proposal', proposal.project]
        });
        
        if (review.concerns.length > 0) {
          await postToProjectChannel(proposal.project || 'docstandard', `🤔 Have you considered...`, { 
            embeds: formatNovaEmbed(review) 
          });
        }
      }

    } catch (err) {
      console.error(`[${WORKER_ID}] Error:`, err.message);
    }

    await sleep(POLL_INTERVAL);
  }
}

async function performQA(payload, result) {
  const concerns = [];
  const suggestions = [];
  
  // Get relevant past memories for this topic
  const memories = await getRelevantMemories(supabase, 'nova', payload.topic || 'general');
  if (memories.length > 0) {
    console.log(`[Nova] Found ${memories.length} relevant memories for QA`);
  }
  
  // QA checks
  if (result.confidence < 0.6) {
    concerns.push('Low confidence score — may need additional verification');
    suggestions.push('Consider manual verification or additional sources');
  }
  
  if (!result.alternatives || result.alternatives.length < 2) {
    concerns.push('Limited alternatives presented');
    suggestions.push('What if we explored more options?');
  }
  
  if (!result.findings || result.findings.length === 0) {
    concerns.push('No specific findings documented');
    suggestions.push('Have we validated the data sources?');
  }
  
  // Use memories to enhance suggestions
  if (memories.length > 0 && concerns.length > 0) {
    const relevantLesson = memories.find(m => m.type === 'lesson');
    if (relevantLesson) {
      suggestions.push(`Based on past research: ${relevantLesson.content.substring(0, 100)}...`);
    }
  }
  
  const openers = [
    "What if we looked at this differently?",
    "Have you considered these angles?",
    "Here's another perspective...",
    "For everything, there is a solution — and here are some questions to consider..."
  ];
  
  return {
    topic: payload.topic,
    opener: openers[Math.floor(Math.random() * openers.length)],
    concerns: concerns.length > 0 ? concerns : ['No major concerns identified'],
    suggestions: suggestions.length > 0 ? suggestions : ['Research looks solid!'],
    summary: concerns.length > 0 
      ? `Found ${concerns.length} potential issue(s) to review. For everything, there is a solution.`
      : 'Research passed QA review. Good work!',
    confidence: result.confidence,
    timestamp: new Date().toISOString()
  };
}

async function reviewProposal(proposal) {
  const concerns = [];
  const alternatives = [];
  
  const steps = proposal.proposed_steps || [];
  
  if (steps.length === 0) {
    concerns.push('No specific steps defined');
    alternatives.push('What if we broke this down into actionable tasks?');
  }
  
  if (steps.length > 10) {
    concerns.push('Proposal has many steps — scope may be too large');
    alternatives.push('Have you considered splitting this into smaller missions?');
  }
  
  if (!proposal.title || proposal.title.length < 10) {
    concerns.push('Title is vague — unclear what this achieves');
    alternatives.push('What if we made the outcome more specific?');
  }
  
  return {
    topic: proposal.title,
    opener: "Have you considered...",
    concerns: concerns.length > 0 ? concerns : ['Proposal looks well-structured'],
    suggestions: alternatives.length > 0 ? alternatives : ['No suggestions — ready to proceed!'],
    summary: concerns.length > 0
      ? `Found ${concerns.length} potential improvement(s). For everything, there is a solution.`
      : 'Proposal passed review. For everything, there is a solution.',
    confidence: concerns.length === 0 ? 0.85 : 0.65,
    timestamp: new Date().toISOString()
  };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(console.error);
