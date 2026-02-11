import type { Metadata } from "next"
import Link from "next/link"
import { IntegrationDiagram } from "@/components/diagrams/IntegrationDiagram"

export const metadata: Metadata = {
  title: "CargoWise to Dynamics 365 Business Central Bridge | Freight Data Integration | DocStandard",
  description:
    "Bridge CargoWise operational and financial data into Dynamics 365 Business Central journals, invoices, and reconciliation workflows.",
}

export default function CargoWiseToDynamicsBcBridgePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden px-6 py-20"><div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" /><div className="relative z-10 mx-auto max-w-5xl"><p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Integration Deep Dive</p><h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">CargoWise to Dynamics 365 Business Central Bridge | Freight Data Integration | DocStandard</h1><p className="max-w-3xl text-lg text-white/80">Normalize CargoWise freight operations and accounting signals for Dynamics 365 Business Central. DocStandard automates account mapping, currency handling, and dimension-ready posting so forwarders can close books without spreadsheet translation loops.</p><div className="mt-8 flex flex-wrap gap-4"><Link href="/login" className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100">Start CargoWise-to-BC</Link><Link href="/integration" className="inline-flex items-center text-white/90 hover:underline">View all integrations</Link></div></div></section>

      <section className="mx-auto max-w-5xl space-y-14 px-6 py-14">
        <section className="space-y-6"><h2 className="text-3xl font-bold">Why Enterprise Logistics Data Stalls in Mid-Market ERP</h2><p className="text-lg text-slate-600">CargoWise is optimized for freight execution and forwarding operations, while Dynamics BC is optimized for structured financial control. Their data models differ in chart structure, dimension strategy, and posting semantics, which is why manual transformation often persists.</p><div className="grid gap-6 md:grid-cols-2"><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Chart-of-Accounts Mismatch</h3><p className="text-slate-600">CargoWise financial categories do not directly align to BC account structures, requiring explicit mapping and validation controls.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Multi-currency Operations</h3><p className="text-slate-600">Freight transactions can involve multiple transaction and reporting currencies. BC postings need deterministic FX treatment at line level.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Job vs Project Semantics</h3><p className="text-slate-600">CargoWise shipment jobs and BC project dimensions are related but not equivalent. Profitability requires a controlled translation model.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Month-end Translation Burden</h3><p className="text-slate-600">Without integration, teams export and reshape trial-balance and transactional detail manually, increasing close-cycle risk and delay.</p></article></div></section>

        <section className="space-y-8"><h2 className="text-3xl font-bold">CargoWise-to-Dynamics BC Pipeline</h2><IntegrationDiagram sourceSystem="CargoWise" targetSystem="Dynamics 365 BC" vertical="finance" fields={["Jobs", "Journals", "Dimensions"]} className="mx-auto w-full max-w-4xl" /><div className="grid gap-6"><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 1: CargoWise Data Capture</h3><p className="mt-3 text-slate-600">Capture job-level references, invoice and bill detail, branch/department tags, and GL-impacting entries through eAdapter, API, or scheduled export channels.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Modes: SOAP/web services, XML messaging, export files</li><li>Scope: revenue, cost, and profitability context</li><li>Security: read-only ingestion posture</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 2: Financial Normalization</h3><p className="mt-3 text-slate-600">Map source accounts to BC chart values, translate branch and department attributes to dimensions, and normalize tax/currency representations.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Account crosswalk controls</li><li>Dimension assignment model</li><li>FX and rounding policy support</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 3: BC Posting Payloads</h3><p className="mt-3 text-slate-600">Generate BC journal, invoice, and purchase payloads through API-ready schemas with validation before submit.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>General journals and document postings</li><li>Job/project linkage for profitability analysis</li><li>External reference retention for audit</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 4: Reconciliation Controls</h3><p className="mt-3 text-slate-600">Run trial-balance and transaction-line matching between CargoWise and BC to detect mapping gaps or posting failures early.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Tolerance-based variance checks</li><li>Exception report generation</li><li>Auto-handling for small rounding differences</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 5: Reporting and Governance</h3><p className="mt-3 text-slate-600">Enable branch-, mode-, and customer-level reporting with full traceability back to CargoWise references and source transactions.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Power BI and BC-native reporting support</li><li>Audit-ready lineage from source to ledger</li><li>Multi-company consolidation scenarios</li></ul></article></div></section>

        <section className="space-y-6"><h2 className="text-3xl font-bold">Field Mapping Tables</h2><h3 className="text-xl font-semibold">CargoWise Source Fields</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">Source</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Purpose</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Job Number</td><td className="px-4 py-3">tblJob.JobNumber</td><td className="px-4 py-3">CHI123456</td><td className="px-4 py-3">Operational reference</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Branch</td><td className="px-4 py-3">tblJob.Branch</td><td className="px-4 py-3">CHI</td><td className="px-4 py-3">Dimension source</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Revenue</td><td className="px-4 py-3">tblJob.Revenue</td><td className="px-4 py-3">5000.00</td><td className="px-4 py-3">Journal posting amount</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Cost</td><td className="px-4 py-3">tblJob.DirectCosts</td><td className="px-4 py-3">3500.00</td><td className="px-4 py-3">Expense allocation basis</td></tr></tbody></table></div><h3 className="text-xl font-semibold">Dynamics BC Journal Fields</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">BC API</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Rule</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Posting Date</td><td className="px-4 py-3">postingDate</td><td className="px-4 py-3">2026-02-11</td><td className="px-4 py-3">Period-open validation</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Account Number</td><td className="px-4 py-3">accountNumber</td><td className="px-4 py-3">61100</td><td className="px-4 py-3">Crosswalk from source account</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Dimension 1</td><td className="px-4 py-3">shortcutDimension1Code</td><td className="px-4 py-3">CHI</td><td className="px-4 py-3">Branch mapping</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Dimension 2</td><td className="px-4 py-3">shortcutDimension2Code</td><td className="px-4 py-3">OCEAN</td><td className="px-4 py-3">Department mapping</td></tr></tbody></table></div><h3 className="text-xl font-semibold">Account Crosswalk Example</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">CargoWise Account</th><th className="px-4 py-3">BC Account</th><th className="px-4 py-3">Meaning</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">REV-OCN</td><td className="px-4 py-3">61100</td><td className="px-4 py-3">Ocean revenue</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">COST-OCN</td><td className="px-4 py-3">71100</td><td className="px-4 py-3">Ocean direct cost</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">REV-AIR</td><td className="px-4 py-3">61200</td><td className="px-4 py-3">Air revenue</td></tr></tbody></table></div></section>

        <section className="space-y-6"><h2 className="text-3xl font-bold">BC Configuration and Delivery Standards</h2><p className="text-slate-600">Recommended setup includes General Ledger, receivables/payables modules, and standardized dimensions for branch and department contexts. Integration delivery supports cloud and compatible on-premise BC deployments with OAuth-managed service credentials.</p><div className="grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">SLA Targets</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>Job-to-journal processing around 15 minutes</li><li>Scheduled and near-real-time sync options</li><li>Nightly reconciliation and variance reporting</li></ul></div><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Quality Controls</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>Account mapping validation before post</li><li>Currency and rounding consistency checks</li><li>Posting retry and failure alerting</li></ul></div></div></section>
      </section>
    <section className="mx-auto max-w-5xl space-y-8 px-6 pb-14">
        <h2 className="text-3xl font-bold">Technical Appendix for Integration Governance</h2>
        <p className="text-slate-600">
          The highest cost in logistics integration programs is not initial mapping. The highest cost
          is operational drift after go live. Drift appears when source systems add new codes,
          carriers change invoice formats, users override references, or master data updates without
          corresponding integration rule changes. This appendix defines the control methods used to
          keep normalized outputs stable over time.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Control Family 1: Reference Integrity</h3>
            <p className="text-slate-600">
              Every outbound financial or operational record must retain at least one immutable
              source reference and one normalized target reference. This dual key pattern prevents
              duplicate posting and supports rapid incident investigation.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
              <li>Primary keys: shipment or entry identifiers from source platform</li>
              <li>Secondary keys: invoice numbers, purchase references, or event IDs</li>
              <li>Idempotency checks before post and during replay</li>
              <li>Duplicate suppression with configurable time windows</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Control Family 2: Validation Sequencing</h3>
            <p className="text-slate-600">
              Validation is run in sequence to avoid wasted compute and reduce noisy exceptions.
              Structural checks run first, business checks run second, and accounting checks run last.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
              <li>Structure checks: required fields, data types, format constraints</li>
              <li>Business checks: tolerances, status eligibility, partner policy rules</li>
              <li>Accounting checks: account resolution, period controls, currency validation</li>
              <li>Routing logic: auto post, hold queue, or reject queue</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Control Family 3: Exception Taxonomy</h3>
            <p className="text-slate-600">
              Exceptions are grouped by root cause so teams can fix classes of problems rather than
              single records. This allows trend reporting and durable remediation plans.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
              <li>Reference mismatch</li>
              <li>Master data missing or inactive</li>
              <li>Tolerance breach on cost or quantity</li>
              <li>Policy conflict for tax or capitalization</li>
              <li>Transport failure and retry exhaustion</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Control Family 4: Replay and Recovery</h3>
            <p className="text-slate-600">
              Recovery capability is mandatory for high-volume integration. Each failed record keeps
              a payload snapshot, transformation version, and validation summary to support clean
              replay after correction.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
              <li>Point replay for single-record correction</li>
              <li>Batch replay for outage windows</li>
              <li>Version locking to avoid non-deterministic output changes</li>
              <li>Post replay reconciliation reporting</li>
            </ul>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-slate-200 text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-4 py-3">Operational KPI</th>
                <th className="px-4 py-3">Definition</th>
                <th className="px-4 py-3">Target Band</th>
                <th className="px-4 py-3">Escalation Trigger</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              <tr className="border-t border-slate-200"><td className="px-4 py-3">Posting Success Rate</td><td className="px-4 py-3">Successful posts divided by total eligible records</td><td className="px-4 py-3">99 percent or higher</td><td className="px-4 py-3">Two consecutive windows below target</td></tr>
              <tr className="border-t border-slate-200"><td className="px-4 py-3">Auto Match Rate</td><td className="px-4 py-3">Records matched without analyst intervention</td><td className="px-4 py-3">95 percent or higher</td><td className="px-4 py-3">Weekly decline greater than five points</td></tr>
              <tr className="border-t border-slate-200"><td className="px-4 py-3">Exception Aging</td><td className="px-4 py-3">Median hours from exception creation to closure</td><td className="px-4 py-3">Within one business day</td><td className="px-4 py-3">More than two business days median</td></tr>
              <tr className="border-t border-slate-200"><td className="px-4 py-3">Reference Completeness</td><td className="px-4 py-3">Records with required source and target references</td><td className="px-4 py-3">99 percent or higher</td><td className="px-4 py-3">Any day below 98 percent</td></tr>
              <tr className="border-t border-slate-200"><td className="px-4 py-3">Reconciliation Delta</td><td className="px-4 py-3">Variance between source totals and posted totals</td><td className="px-4 py-3">Near zero after approved tolerance</td><td className="px-4 py-3">Persistent non zero variance</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-slate-600">
          Governance is enforced with a monthly rule review and quarterly integration health check.
          Monthly review focuses on new carrier codes, partner onboarding changes, and master data
          updates that can affect mapping behavior. Quarterly review focuses on trend analysis across
          failures, exception causes, and reconciliation outcomes. Teams should document rule changes
          with effective dates and approval history so historical transaction behavior remains
          explainable.
        </p>

        <p className="text-slate-600">
          For large organizations, a change advisory workflow is recommended. Proposed mapping
          changes should be tested against a recent sample set and a historical edge-case set before
          release. Release bundles should include migration scripts for mapping tables, validation
          updates, and dashboard threshold changes. This level of discipline keeps integration
          quality stable as operational complexity grows.
        </p>
      </section>
    </main>
  )
}

