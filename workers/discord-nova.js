// Discord formatting for Nova's messages
// Observer/QA style embeds

require('dotenv').config({ override: true });

function formatNovaEmbed(result) {
  const fields = [];
  
  if (result.concerns && result.concerns.length > 0) {
    fields.push({
      name: '🔍 Observations',
      value: result.concerns.map(c => `• ${c}`).join('\n'),
      inline: false
    });
  }
  
  if (result.suggestions && result.suggestions.length > 0) {
    fields.push({
      name: '💡 Alternative Approaches',
      value: result.suggestions.map(s => `• ${s}`).join('\n'),
      inline: false
    });
  }
  
  if (result.alternatives && result.alternatives.length > 0) {
    fields.push({
      name: '🔄 Options to Consider',
      value: result.alternatives.map(alt => `**${alt.option}**: ${alt.pros.join(', ')}`).join('\n'),
      inline: false
    });
  }

  return [{
    title: result.topic ? `🔍 QA Review: ${result.topic}` : '🔍 Observer Report',
    description: result.summary || 'For everything, there is a solution.',
    color: 0x9b59b6, // Purple for Nova
    fields: fields.length > 0 ? fields : [{
      name: 'Status',
      value: 'All clear — no issues detected!',
      inline: false
    }],
    footer: {
      text: `Confidence: ${Math.round((result.confidence || 0.75) * 100)}% | For everything, there is a solution.`
    },
    timestamp: result.timestamp || new Date().toISOString()
  }];
}

module.exports = {
  formatNovaEmbed
};
