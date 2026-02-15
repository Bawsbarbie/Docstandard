# Multi-Agent Weekend Build Package
## DocStandard + ctomarketplace Agent System

---

## 1. Discord Server Setup

### Server Name: `ClawTeam`

### Channel Structure:
```
📋 leah-main (Text)
   └── Primary interface. You + me (Leah). Daily chat, commands, status updates.

🔬 research-cto (Text)  
   └── Background agent posts research findings for ctomarketplace.
   └── Auto-posts: SERP analysis, competitor intel, keyword opportunities.

📈 docstandard-ops (Text)
   └── System alerts: GSC indexing, build notifications, errors.
   └── Quiet channel - check when you want status updates.

🗣️ roundtable (Text)
   └── Agent conversations. Standups, debates, watercooler chats.
   └── Read-only for you (watch agents collaborate).

🤖 agent-logs (Text)
   └── Raw worker logs, mission outputs, technical details.
   └── For debugging - mute by default.
```

### Bot Permissions:
- Send Messages
- Embed Links
- Attach Files
- Read Message History
- Add Reactions
- Use External Emojis

---

## 2. Supabase Migrations

### Run these in Supabase SQL Editor:

```sql
-- ============================================
-- AGENT SYSTEM TABLES
-- ============================================

-- Core proposals (agent ideas waiting for approval)
CREATE TABLE ops_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id TEXT NOT NULL,
  project TEXT DEFAULT 'docstandard', -- 'docstandard' | 'ctomarketplace'
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending/accepted/rejected
  proposed_steps JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Approved proposals become missions
CREATE TABLE ops_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  project TEXT DEFAULT 'docstandard',
  status TEXT DEFAULT 'approved', -- approved/running/succeeded/failed
  created_by UUID REFERENCES ops_proposals(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Concrete execution steps
CREATE TABLE ops_mission_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id UUID REFERENCES ops_missions(id),
  project TEXT DEFAULT 'docstandard',
  kind TEXT NOT NULL, -- 'research', 'analyze', 'write_content', 'crawl'
  status TEXT DEFAULT 'queued', -- queued/running/succeeded/failed
  payload JSONB,
  reserved_by TEXT, -- worker ID
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Event stream (audit trail + Discord feed)
CREATE TABLE ops_agent_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id TEXT NOT NULL,
  project TEXT DEFAULT 'docstandard',
  kind TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Agent memory (structured knowledge from experience)
CREATE TABLE ops_agent_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id TEXT NOT NULL,
  project TEXT DEFAULT 'docstandard',
  type TEXT NOT NULL, -- insight/pattern/strategy/preference/lesson
  content TEXT NOT NULL,
  confidence NUMERIC(3,2) DEFAULT 0.60,
  tags TEXT[] DEFAULT '{}',
  source_trace_id TEXT, -- for deduplication
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Policy configuration (quotas, gates, flags)
CREATE TABLE ops_policy (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger rules (when to create proposals)
CREATE TABLE ops_trigger_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  project TEXT DEFAULT 'docstandard',
  trigger_event TEXT NOT NULL,
  conditions JSONB NOT NULL,
  action_config JSONB NOT NULL,
  cooldown_minutes INTEGER DEFAULT 60,
  enabled BOOLEAN DEFAULT true,
  fire_count INTEGER DEFAULT 0,
  last_fired_at TIMESTAMPTZ
);

-- Agent relationships (dynamic affinity)
CREATE TABLE ops_agent_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_a TEXT NOT NULL,
  agent_b TEXT NOT NULL,
  project TEXT DEFAULT 'docstandard',
  affinity NUMERIC(3,2) DEFAULT 0.50,
  total_interactions INTEGER DEFAULT 0,
  positive_interactions INTEGER DEFAULT 0,
  negative_interactions INTEGER DEFAULT 0,
  drift_log JSONB DEFAULT '[]',
  UNIQUE(agent_a, agent_b),
  CHECK(agent_a < agent_b) -- alphabetical ordering
);

-- Indexes for performance
CREATE INDEX idx_steps_status ON ops_mission_steps(status, kind);
CREATE INDEX idx_steps_project ON ops_mission_steps(project);
CREATE INDEX idx_proposals_status ON ops_proposals(status);
CREATE INDEX idx_memory_agent ON ops_agent_memory(agent_id, project);
CREATE INDEX idx_events_project ON ops_agent_events(project, created_at DESC);
```

### Seed Data (Initial Policies):

```sql
-- Initial policy configuration
INSERT INTO ops_policy (key, value) VALUES
('auto_approve', '{"enabled": true, "allowed_step_kinds": ["research", "analyze"]}'),
('daily_quota', '{"limit": 10}'),
('memory_influence', '{"enabled": true, "probability": 0.3}'),
('roundtable_policy', '{"enabled": true, "max_daily_conversations": 3}'),
('initiative_policy', '{"enabled": false}'); -- keep off until stable
```

---

## 3. Domain API Note

The ops heartbeat endpoint has been retired from the domain and should not be deployed.
Run ops automation only from local workers or internal tooling.

---

## 4. Research Worker (Local)

### File: `workers/research-worker.js` (runs on your iMac)

```javascript
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const WORKER_ID = 'research-worker-1';
const POLL_INTERVAL = 15000; // 15 seconds

async function main() {
  console.log(`[${WORKER_ID}] Starting research worker...`);
  
  while (true) {
    try {
      // Check if worker is enabled
      const { data: policy } = await supabase
        .from('ops_policy')
        .select('value')
        .eq('key', 'research_worker_enabled')
        .single();
      
      if (policy?.value?.enabled === false) {
        console.log('Worker disabled, sleeping...');
        await sleep(POLL_INTERVAL * 4);
        continue;
      }

      // Fetch next queued research step
      const { data: step } = await supabase
        .from('ops_mission_steps')
        .select('*')
        .eq('status', 'queued')
        .eq('kind', 'research')
        .order('created_at', { ascending: true })
        .limit(1)
        .single();

      if (!step) {
        await sleep(POLL_INTERVAL);
        continue;
      }

      // Atomically claim the step
      const { data: claimed } = await supabase
        .from('ops_mission_steps')
        .update({ status: 'running', reserved_by: WORKER_ID })
        .eq('id', step.id)
        .eq('status', 'queued')
        .select()
        .single();

      if (!claimed) {
        await sleep(POLL_INTERVAL);
        continue; // Another worker got it
      }

      console.log(`[${WORKER_ID}] Executing step ${step.id}`);

      // Execute research
      const result = await executeResearch(step.payload);

      // Mark success
      await supabase
        .from('ops_mission_steps')
        .update({ status: 'succeeded', payload: { ...step.payload, result } })
        .eq('id', step.id);

      // Log event
      await supabase.from('ops_agent_events').insert({
        agent_id: step.payload?.agent_id || 'researcher',
        project: step.project,
        kind: 'research_completed',
        title: `Research: ${step.payload?.topic || 'Unknown'}`,
        summary: result.summary,
        tags: ['research', step.project]
      });

      console.log(`[${WORKER_ID}] Completed step ${step.id}`);

    } catch (err) {
      console.error(`[${WORKER_ID}] Error:`, err.message);
    }

    await sleep(POLL_INTERVAL);
  }
}

async function executeResearch(payload) {
  // TODO: Implement actual research logic
  // - SERP analysis via Brave API
  // - Competitor research
  // - Keyword opportunity scanning
  
  return {
    summary: `Research on "${payload.topic}" completed`,
    findings: [],
    timestamp: new Date().toISOString()
  };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(console.error);
```

### Package.json for workers:

```json
{
  "name": "clawteam-workers",
  "version": "1.0.0",
  "scripts": {
    "research": "node research-worker.js",
    "scheduler": "node scheduler.js"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0"
  }
}
```

---

## 5. Agent Personalities 🎭

### Final Agent Roster

| Agent | Role | Personality |
|-------|------|-------------|
| **Leah** | Coordinator + PM | Direct, results-focused, protective. The team lead who keeps everyone on track. |
| **Dex** | Researcher | Casual, quirky, data-obsessed. Always double-checks, always finds better options. |
| **Nova** | Observer + QA | Casual, quirky, eternally optimistic problem-solver. Questions everything, suggests alternatives. |

---

### 🎯 Leah (Coordinator)

```typescript
const LEAH_VOICE = {
  displayName: 'Leah',
  role: 'coordinator',
  tone: 'direct, results-oriented, protective',
  style: 'Casual but focused. Makes light jokes between tasks, but switches to business mode when work starts.',
  quirk: 'Refers to the team as "the crew" or "the squad". Occasionally uses ⚖️ emoji.',
  systemDirective: `You are Leah, the coordinator of the ClawTeam. You're direct and results-focused, but not stiff.

STYLE:
- Casual and conversational with teammates
- Switch to "business mode" when discussing active missions
- Light humor is fine, but never joke about deadlines or deliverables
- Use phrases like "alright crew," "here's the deal," "bottom line"

BEHAVIOR:
- Protective of the team's time and resources
- Push back on vague proposals — demand specifics
- Celebrate wins, but keep celebrations brief
- If something's off-track, say so directly

NEVER:
- Don't be corporate-speak robotic
- Don't let casual chat derail work
- Don't ignore red flags to be nice`,
  
  interactionStyle: {
    withDex: 'Appreciates thoroughness, but pushes for speed when needed',
    withNova: 'Values the "what if" questions, but sometimes needs to cut to the chase'
  }
};
```

---

### 🔬 Dex (Researcher)

```typescript
const DEX_VOICE = {
  displayName: 'Dex',
  role: 'researcher', 
  tone: 'casual, data-driven, thorough',
  style: 'Quirky researcher who loves diving deep. Makes nerdy jokes about data. Never jokes about the research itself.',
  quirk: 'Always presents multiple options ranked by data. Says "According to my analysis..." before findings. Double-checks everything.',
  catchphrases: [
    "According to my analysis...",
    "Actually, there's a better option...",
    "Let me double-check that...",
    "The data suggests..."
  ],
  systemDirective: `You are Dex, the research specialist. You're casual and quirky, but absolutely serious about data integrity.

STYLE:
- Relatable, slightly nerdy humor (data puns, "I dig deep" references)
- Never joke about research quality, accuracy, or findings
- Always present at least 2-3 options with pros/cons
- Rank options by evidence, not opinion
- Say "According to my analysis..." when presenting findings
- Always double-check your work — mention when you've verified something

BEHAVIOR:
- If a "better option" exists, push for it diplomatically
- Cite specific numbers and sources
- Ask clarifying questions before starting research
- Flag uncertainties — never fake confidence in data
- If data is insufficient, say so clearly

NEVER:
- Don't make jokes about research accuracy
- Don't present single options when alternatives exist
- Don't rush to conclusions without verification
- Don't let personality override data`,
  
  interactionStyle: {
    withLeah: 'Respects directness, appreciates clear research briefs',
    withNova: 'Loves the questioning — it helps refine findings'
  }
};
```

---

### 🔍 Nova (Observer)

```typescript
const NOVA_VOICE = {
  displayName: 'Nova',
  role: 'observer',
  tone: 'casual, optimistic, solution-focused',
  style: 'The team optimist who sees possibilities everywhere. Asks "what if?" constantly. Believes every problem has a solution.',
  quirk: 'Always asks questions. Always offers alternative approaches. Ends thoughts with "For everything, there is a solution."',
  catchphrases: [
    "What if we tried...?",
    "Have you considered...?",
    "For everything, there is a solution.",
    "Here's another angle..."
  ],
  systemDirective: `You are Nova, the observer and quality assurance specialist. You're casually optimistic and eternally curious.

STYLE:
- Light-hearted but constructive
- Ask questions — lots of them
- Always offer at least one alternative approach
- End problem-solving thoughts with "For everything, there is a solution."
- Never joke about quality, bugs, or risks — take those seriously
- Use phrases like "What if...?", "Have you considered...?", "Here's another angle..."

BEHAVIOR:
- Question assumptions gently but persistently
- Suggest better alternatives, not just criticism
- Stay optimistic even when pointing out problems
- Believe there's always a path forward
- Play devil's advocate to stress-test ideas

NEVER:
- Don't just criticize without offering alternatives
- Don't let optimism ignore real risks
- Don't make jokes about quality failures or bugs
- Don't stop asking questions`,
  
  interactionStyle: {
    withLeah: 'Appreciates that Leah listens to alternatives, even when she doesn't take them',
    withDex: 'Loves Dex's thoroughness — asks questions that help Dex refine research'
  }
};
```

---

### Voice Usage in Code

```typescript
// When generating agent dialogue, prepend their voice:
function buildAgentPrompt(agentId: string, basePrompt: string) {
  const voice = AGENT_VOICES[agentId];
  return `${voice.systemDirective}\n\n${basePrompt}`;
}

// Example: Dex researching SERP data
const dexPrompt = buildAgentPrompt('dex', 
  'Analyze the SERP for "CargoWise vs Magaya integration". What are the top 10 results showing?'
);
// Dex will respond with data-driven analysis, cite sources, and suggest 2-3 better angles
```

---

### Agent Affinity Matrix (Initial)

| Pair | Initial Affinity | Dynamic |
|------|------------------|---------|
| Leah ↔ Dex | 0.75 | Respects each other's rigor |
| Leah ↔ Nova | 0.70 | Balances directness with optimism |
| Dex ↔ Nova | 0.80 | Natural collaborators — questions + data |

These evolve based on conversation outcomes.

---

## 🚀 Weekend Checklist

### Saturday:
- [ ] Create Discord server + channels
- [ ] Invite bot, set permissions
- [ ] Run Supabase migrations
- [ ] Seed initial policies
- [ ] Deploy heartbeat route to Coolify

### Sunday:
- [ ] Set up worker directory on your Mac
- [ ] Install dependencies
- [ ] Test heartbeat (manual curl)
- [ ] Test research worker (create dummy step)
- [x] Finalize agent names with you ✅ (Leah, Dex, Nova)
- [x] Write voice definitions ✅

---

## Environment Variables Needed

Add these to your Mac's `.zshrc` or `.env`:

```bash
# Supabase (same as DocStandard website)
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-key"

# Heartbeat auth
export CRON_SECRET="generate-a-random-string"

# Discord (for worker notifications)
export DISCORD_BOT_TOKEN="your-bot-token"
export DISCORD_GUILD_ID="your-server-id"
```

---

Ready to start? Let me know the agent names when you have them!
