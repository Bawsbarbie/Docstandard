// Extract and compile Dex's research findings into blueprint
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function compileBlueprint() {
  const { data: tasks } = await supabase
    .from('ops_mission_steps')
    .select('*')
    .eq('project', 'ctomarketplace')
    .eq('status', 'succeeded')
    .order('updated_at', { ascending: true });
  
  console.log('Found', tasks?.length || 0, 'completed research tasks');
  
  // Extract unique findings
  const findings = [];
  
  tasks?.forEach(task => {
    const result = task.payload?.result;
    if (result) {
      findings.push({
        topic: task.payload?.topic,
        summary: result.summary || 'No summary',
        confidence: result.confidence || 0,
        findings: result.findings || [],
        alternatives: result.alternatives || []
      });
    }
  });
  
  // Write JSON for easy processing
  fs.writeFileSync(
    '/Users/bawsbarbie/clawd/ctomarketplace_research_data.json',
    JSON.stringify(findings, null, 2)
  );
  
  console.log('Research data extracted to: ctomarketplace_research_data.json');
  console.log('Findings with data:', findings.length);
}

compileBlueprint();
