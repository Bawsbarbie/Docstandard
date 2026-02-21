// Outcome learning - Agents write memories from their experiences
// This is how Dex and Nova "learn" from results

async function writeMemory(supabase, { agentId, type, content, confidence, sourceId, tags }) {
  try {
    // Check for duplicate (same source = same lesson)
    const { data: existing } = await supabase
      .from('ops_agent_memory')
      .select('id')
      .eq('source_trace_id', sourceId)
      .limit(1);
    
    if (existing && existing.length > 0) {
      console.log(`[Memory] Already recorded for ${sourceId}`);
      return false;
    }
    
    const { data, error } = await supabase
      .from('ops_agent_memory')
      .insert({
        agent_id: agentId,
        type, // 'insight', 'pattern', 'strategy', 'lesson', 'preference'
        content,
        confidence: Math.min(Math.max(confidence, 0.1), 0.95),
        tags: tags || [],
        source_trace_id: sourceId
      })
      .select();
    
    if (error) throw error;
    console.log(`[Memory] ${agentId} learned: ${content.substring(0, 50)}...`);
    return true;
  } catch (err) {
    console.error('[Memory] Failed to write:', err.message);
    return false;
  }
}

// Dex learns from research outcomes
async function learnFromResearch(supabase, stepId, result) {
  const learnings = [];
  
  // Lesson: Low confidence means need better data
  if (result.confidence < 0.6) {
    learnings.push({
      type: 'lesson',
      content: `Research on "${result.topic}" had low confidence. Consider manual verification or broader keyword search.`,
      confidence: 0.7,
      tags: ['research', 'low-confidence', 'verification']
    });
  }
  
  // Pattern: High diversity = opportunity
  if (result.serpData?.diversityScore > 0.8) {
    learnings.push({
      type: 'pattern',
      content: `High domain diversity found for "${result.topic}". This keyword has low competition - prioritize similar terms.`,
      confidence: 0.75,
      tags: ['research', 'low-competition', 'opportunity']
    });
  }
  
  // Pattern: Big players present = challenging
  if (result.serpData?.hasBigPlayers) {
    learnings.push({
      type: 'pattern', 
      content: `Wikipedia/Reddit rank for "${result.topic}". Need exceptional content to outrank - consider long-tail variations.`,
      confidence: 0.8,
      tags: ['research', 'high-competition', 'strategy']
    });
  }
  
  // Strategy: Thin content gaps
  if (result.serpData?.thinContentCount > 2) {
    learnings.push({
      type: 'strategy',
      content: `Multiple thin content results for "${result.topic}". Target comprehensive 1500+ word posts to capture these gaps.`,
      confidence: 0.8,
      tags: ['research', 'content-gap', 'strategy']
    });
  }
  
  // Write all learnings
  for (const learning of learnings) {
    await writeMemory(supabase, {
      agentId: 'dex',
      ...learning,
      sourceId: `research:${stepId}`,
      tags: [...learning.tags, result.topic?.toLowerCase().replace(/\s+/g, '-')]
    });
  }
  
  return learnings.length;
}

// Nova learns from QA outcomes
async function learnFromQA(supabase, qaResult) {
  const learnings = [];
  
  // If found real issues, remember the pattern
  if (qaResult.concerns.length > 0) {
    learnings.push({
      type: 'lesson',
      content: `QA found ${qaResult.concerns.length} issue(s) in "${qaResult.topic}". Always verify confidence scores and alternative options.`,
      confidence: 0.75,
      tags: ['qa', 'quality-check', 'research-validation']
    });
  }
  
  // If research passed, note what worked
  if (qaResult.concerns.length === 0) {
    learnings.push({
      type: 'pattern',
      content: `Research "${qaResult.topic}" passed QA with no issues. Good data quality on this topic type.`,
      confidence: 0.7,
      tags: ['qa', 'quality-pass', 'good-example']
    });
  }
  
  for (const learning of learnings) {
    await writeMemory(supabase, {
      agentId: 'nova',
      ...learning,
      sourceId: `qa:${qaResult.topic}`,
      tags: learning.tags
    });
  }
  
  return learnings.length;
}

// Query memories for decision-making
async function getRelevantMemories(supabase, agentId, topic, types = ['lesson', 'pattern', 'strategy']) {
  try {
    // Get recent memories of specified types
    const { data: memories } = await supabase
      .from('ops_agent_memory')
      .select('*')
      .eq('agent_id', agentId)
      .in('type', types)
      .gte('confidence', 0.6)
      .order('created_at', { ascending: false })
      .limit(10);
    
    // Simple keyword matching (could be more sophisticated with embeddings)
    const topicWords = topic.toLowerCase().split(/\s+/);
    const relevant = (memories || []).filter(m => {
      const contentWords = m.content.toLowerCase();
      return topicWords.some(w => contentWords.includes(w)) || 
             m.tags.some(t => topicWords.some(w => t.includes(w)));
    });
    
    return relevant.slice(0, 3); // Top 3 most relevant
  } catch (err) {
    console.error('[Memory] Query failed:', err.message);
    return [];
  }
}

module.exports = {
  writeMemory,
  learnFromResearch,
  learnFromQA,
  getRelevantMemories
};
