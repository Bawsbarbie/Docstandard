# ClawTeam Workers

Background workers for the multi-agent system (Dex & Nova).

## Setup

```bash
cd /Users/bawsbarbie/clawd/workers
npm install
```

## Environment Variables

Make sure these are in your main `.env` (workspace root):
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CRON_SECRET`
- `DISCORD_BOT_TOKEN` (for notifications)

## Running Workers

### Dex Research Worker
```bash
npm run research
```

This polls Supabase every 15 seconds for research tasks assigned to Dex.

## How It Works

1. **Heartbeat API** (on DocStandard server) runs every 5 minutes
2. It checks trigger rules and creates proposals
3. Approved proposals become missions with steps
4. **Research Worker** (on your Mac) polls for `research` type steps
5. Dex executes the research and posts results to Discord

## Testing

1. Deploy the heartbeat route to DocStandard
2. Run the research worker locally
3. Insert a test step into Supabase:
   ```sql
   INSERT INTO ops_mission_steps (mission_id, kind, status, payload, project)
   VALUES (
     null, 
     'research', 
     'queued',
     '{"topic": "CargoWise vs Magaya", "agent_id": "dex", "research_type": "serp"}',
     'docstandard'
   );
   ```
4. Watch the worker pick it up and process it
