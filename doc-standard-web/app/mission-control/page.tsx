import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getMissionData() {
  const supabase = createClient();
  
  // Get pending proposals (awaiting approval)
  const { data: pendingProposals } = await supabase
    .from('ops_proposals')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  
  // Get recent accepted/rejected proposals
  const { data: recentProposals } = await supabase
    .from('ops_proposals')
    .select('*')
    .in('status', ['accepted', 'rejected'])
    .order('updated_at', { ascending: false })
    .limit(10);
  
  // Get active missions
  const { data: activeMissions } = await supabase
    .from('ops_missions')
    .select('*, ops_mission_steps(*)')
    .in('status', ['approved', 'running'])
    .order('created_at', { ascending: false });
  
  // Get recent events
  const { data: recentEvents } = await supabase
    .from('ops_agent_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);
  
  // Get stats
  const { count: totalProposals } = await supabase
    .from('ops_proposals')
    .select('*', { count: 'exact', head: true });
  
  const { count: totalMissions } = await supabase
    .from('ops_missions')
    .select('*', { count: 'exact', head: true });
  
  return {
    pendingProposals: pendingProposals || [],
    recentProposals: recentProposals || [],
    activeMissions: activeMissions || [],
    recentEvents: recentEvents || [],
    stats: {
      totalProposals: totalProposals || 0,
      totalMissions: totalMissions || 0,
      pendingCount: pendingProposals?.length || 0
    }
  };
}

export default async function MissionControlPage() {
  const data = await getMissionData();
  
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">🎯 Mission Control</h1>
          <p className="text-slate-600">Manage agent proposals and monitor operations</p>
        </div>
        
        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <StatCard 
            title="Pending Approval" 
            value={data.stats.pendingCount} 
            color="amber"
            icon="⏳"
          />
          <StatCard 
            title="Total Proposals" 
            value={data.stats.totalProposals} 
            color="blue"
            icon="📝"
          />
          <StatCard 
            title="Active Missions" 
            value={data.activeMissions.length} 
            color="green"
            icon="🚀"
          />
          <StatCard 
            title="Total Missions" 
            value={data.stats.totalMissions} 
            color="purple"
            icon="📊"
          />
        </div>
        
        {/* Pending Proposals - Nova's waiting for approval */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              ⏳ Pending Approvals
              {data.stats.pendingCount > 0 && (
                <span className="ml-2 rounded-full bg-amber-100 px-2 py-1 text-sm text-amber-700">
                  {data.stats.pendingCount}
                </span>
              )}
            </h2>
          </div>
          
          {data.pendingProposals.length === 0 ? (
            <p className="text-slate-500 italic">No pending proposals. All caught up!</p>
          ) : (
            <div className="space-y-3">
              {data.pendingProposals.map((proposal: any) => (
                <div 
                  key={proposal.id} 
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 hover:border-amber-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <AgentBadge agentId={proposal.agent_id} />
                        <ProjectBadge project={proposal.project} />
                        <span className="text-xs text-slate-400">
                          {new Date(proposal.created_at).toLocaleString()}
                        </span>
                      </div>
                      <h3 className="mt-1 font-medium text-slate-900">{proposal.title}</h3>
                      <div className="mt-2 flex gap-2">
                        {proposal.proposed_steps?.map((step: any, i: number) => (
                          <StepBadge key={i} kind={step.kind} />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <form action={`/api/ops/proposals/${proposal.id}/approve`} method="POST">
                        <button 
                          type="submit"
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                        >
                          ✓ Approve
                        </button>
                      </form>
                      <form action={`/api/ops/proposals/${proposal.id}/reject`} method="POST">
                        <button 
                          type="submit"
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                          ✕ Reject
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Active Missions */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">🚀 Active Missions</h2>
            {data.activeMissions.length === 0 ? (
              <p className="text-slate-500 italic">No active missions</p>
            ) : (
              <div className="space-y-3">
                {data.activeMissions.map((mission: any) => (
                  <div key={mission.id} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-slate-900">{mission.title}</h3>
                      <StatusBadge status={mission.status} />
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {mission.ops_mission_steps?.filter((s: any) => s.status === 'succeeded').length || 0} / {mission.ops_mission_steps?.length || 0} steps complete
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Recent Events */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">📡 Recent Activity</h2>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {data.recentEvents.map((event: any) => (
                <div key={event.id} className="flex items-start gap-3 rounded-lg border-b border-slate-100 py-2 last:border-0">
                  <AgentBadge agentId={event.agent_id} small />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.summary}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(event.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recent History */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">📜 Recent Decisions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200">
                <tr>
                  <th className="pb-2 font-medium text-slate-500">Agent</th>
                  <th className="pb-2 font-medium text-slate-500">Proposal</th>
                  <th className="pb-2 font-medium text-slate-500">Status</th>
                  <th className="pb-2 font-medium text-slate-500">Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentProposals.map((proposal: any) => (
                  <tr key={proposal.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-3">
                      <AgentBadge agentId={proposal.agent_id} small />
                    </td>
                    <td className="py-3 text-slate-900">{proposal.title}</td>
                    <td className="py-3">
                      <StatusBadge status={proposal.status} />
                    </td>
                    <td className="py-3 text-slate-400">
                      {new Date(proposal.updated_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components
function StatCard({ title, value, color, icon }: { title: string; value: number; color: string; icon: string }) {
  const colors: Record<string, string> = {
    amber: 'bg-amber-50 border-amber-200',
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200'
  };
  
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className="text-3xl font-bold text-slate-900">{value}</span>
      </div>
      <p className="mt-1 text-sm text-slate-600">{title}</p>
    </div>
  );
}

function AgentBadge({ agentId, small = false }: { agentId: string; small?: boolean }) {
  const agents: Record<string, { color: string; icon: string }> = {
    dex: { color: 'bg-blue-100 text-blue-700', icon: '🔬' },
    nova: { color: 'bg-purple-100 text-purple-700', icon: '🔍' },
    leah: { color: 'bg-green-100 text-green-700', icon: '✨' },
    system: { color: 'bg-slate-100 text-slate-700', icon: '⚙️' }
  };
  
  const agent = agents[agentId] || agents.system;
  const size = small ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${agent.color} ${size}`}>
      {agent.icon} {agentId.charAt(0).toUpperCase() + agentId.slice(1)}
    </span>
  );
}

function ProjectBadge({ project }: { project: string }) {
  const projects: Record<string, string> = {
    docstandard: 'bg-emerald-100 text-emerald-700',
    ctomarketplace: 'bg-orange-100 text-orange-700'
  };
  
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${projects[project] || 'bg-slate-100 text-slate-700'}`}>
      {project}
    </span>
  );
}

function StepBadge({ kind }: { kind: string }) {
  const kinds: Record<string, string> = {
    research: 'bg-blue-100 text-blue-700',
    analyze: 'bg-purple-100 text-purple-700',
    write_content: 'bg-green-100 text-green-700',
    crawl: 'bg-orange-100 text-orange-700'
  };
  
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium ${kinds[kind] || 'bg-slate-100 text-slate-700'}`}>
      {kind}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statuses: Record<string, { color: string; label: string }> = {
    pending: { color: 'bg-amber-100 text-amber-700', label: 'Pending' },
    accepted: { color: 'bg-green-100 text-green-700', label: 'Approved' },
    rejected: { color: 'bg-red-100 text-red-700', label: 'Rejected' },
    approved: { color: 'bg-blue-100 text-blue-700', label: 'Approved' },
    running: { color: 'bg-purple-100 text-purple-700', label: 'Running' },
    succeeded: { color: 'bg-green-100 text-green-700', label: 'Done' },
    failed: { color: 'bg-red-100 text-red-700', label: 'Failed' }
  };
  
  const s = statuses[status] || statuses.pending;
  
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${s.color}`}>
      {s.label}
    </span>
  );
}
