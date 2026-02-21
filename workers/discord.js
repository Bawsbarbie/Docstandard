// Discord integration for ClawTeam agents
// Posts research findings to agent-specific channels

require('dotenv').config({ override: true });

const DISCORD_CHANNELS = {
  dex: '1472561620738769059',      // #dex-workspace
  nova: '1472561683145822219',     // #nova-workspace
  leah: '1472561520826126530',     // #leah-workspace
  roundtable: '1472560592047833280', // #algemeen
  docstandard: '1472635937082314940',      // #docstandard-ops
  ctomarketplace: '1472635938306789592'    // #ctomarketplace-ops
};

// Post to project-specific channel (docstandard or ctomarketplace)
async function postToProjectChannel(project, message, options = {}) {
  const channelId = DISCORD_CHANNELS[project];
  if (!channelId) {
    console.error(`Unknown project: ${project}`);
    return false;
  }

  const botToken = process.env.DISCORD_BOT_TOKEN;
  if (!botToken || botToken === 'your-bot-token-here') {
    console.error('DISCORD_BOT_TOKEN not configured');
    return false;
  }

  try {
    const payload = {
      content: message,
      embeds: options.embeds || []
    };

    const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Discord API error: ${response.status}`, error);
      return false;
    }

    console.log(`[Discord] Posted to #${project}-ops`);
    return true;
  } catch (err) {
    console.error(`[Discord] Failed to post:`, err.message);
    return false;
  }
}

async function postToDiscord(agentId, message, options = {}) {
  const channelId = DISCORD_CHANNELS[agentId];
  if (!channelId) {
    console.error(`Unknown agent: ${agentId}`);
    return false;
  }

  const botToken = process.env.DISCORD_BOT_TOKEN;
  if (!botToken || botToken === 'your-bot-token-here') {
    console.error('DISCORD_BOT_TOKEN not configured');
    return false;
  }

  try {
    const payload = {
      content: message,
      embeds: options.embeds || []
    };

    const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Discord API error: ${response.status}`, error);
      return false;
    }

    console.log(`[Discord] Posted to #${agentId}-workspace`);
    return true;
  } catch (err) {
    console.error(`[Discord] Failed to post:`, err.message);
    return false;
  }
}

// Format research findings as a Discord embed
function formatResearchEmbed(result) {
  const fields = result.findings.map((finding, i) => ({
    name: `Finding ${i + 1}`,
    value: finding,
    inline: false
  }));

  if (result.alternatives && result.alternatives.length > 0) {
    const altText = result.alternatives
      .map(alt => `**${alt.option}**: ${alt.pros.join(', ')} | ⚠️ ${alt.cons.join(', ')}`)
      .join('\n');
    
    fields.push({
      name: '🔬 Dex Analysis: Alternative Options',
      value: altText,
      inline: false
    });
  }

  return [{
    title: `🔬 Research: ${result.topic}`,
    description: result.summary,
    color: 0x3498db, // Blue for Dex
    fields,
    footer: {
      text: `Confidence: ${Math.round(result.confidence * 100)}% | According to my analysis...`
    },
    timestamp: result.timestamp
  }];
}

module.exports = {
  postToDiscord,
  postToProjectChannel,
  formatResearchEmbed,
  DISCORD_CHANNELS
};
