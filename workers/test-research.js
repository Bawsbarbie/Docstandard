// Test script for ClawTeam multi-agent system
// Usage: node test-research.js

require('dotenv').config({ path: '../.env' });

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function insertTestResearch() {
  console.log('Inserting test research task for Dex...');
  
  const { data, error } = await supabase
    .from('ops_mission_steps')
    .insert({
      kind: 'research',
      status: 'queued',
      payload: {
        topic: 'SERP Analysis: CargoWise vs Magaya Integration Keywords',
        agent_id: 'dex',
        research_type: 'serp',
        requested_by: 'leah'
      },
      project: 'docstandard'
    })
    .select();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('✅ Test research task created!');
  console.log('Task ID:', data[0].id);
  console.log('The research worker should pick this up in ~15 seconds...');
}

insertTestResearch();
