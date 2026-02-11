import type { Metadata } from "next"
import Link from "next/link"
import { IntegrationDiagram } from "@/components/diagrams/IntegrationDiagram"

export const metadata: Metadata = {
  title: "FreightPop to NetSuite Normalization | SMB Freight Integration | DocStandard",
  description:
    "Normalize FreightPop shipment and cost data into NetSuite vendor bills, landed-cost records, and reconciliation outputs.",
}

export default function FreightPopToNetSuiteNormalizationPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Integration Deep Dive</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">FreightPop to NetSuite Normalization | SMB Freight Integration | DocStandard</h1>
          <p className="max-w-3xl text-lg text-white/80">Connect FreightPop shipment operations to NetSuite accounting and inventory controls. DocStandard automates quote-to-actual reconciliation, carrier bill processing, and freight cost allocation so growing teams stop relying on spreadsheet handoffs.</p>
          <div className="mt-8 flex flex-wrap gap-4"><Link href="/login" className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100">Start FreightPop-to-NetSuite</Link><Link href="/integration" className="inline-flex items-center text-white/90 hover:underline">View all integrations</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-14 px-6 py-14">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Why SMB Freight Data Stalls in NetSuite</h2>
          <p className="text-lg text-slate-600">SMB teams use FreightPop because it is fast to deploy and easy to operate across multiple carriers. The accounting side still breaks when quote details, delivery status, and carrier invoice lines are not normalized into NetSuite-ready records.</p>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Quote-to-Invoice Variance</h3><p className="text-slate-600">Initial shipping quotes rarely equal final charges after fuel updates and accessorials. Without systematic matching, accruals drift and close-cycle adjustments consume analyst time.</p></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Multi-Carrier Billing Diversity</h3><p className="text-slate-600">Different carriers emit different identifiers, invoice timing, and format assumptions. Manual normalization causes inconsistent GL coding and delayed approvals.</p></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">BOL-to-Receipt Mapping</h3><p className="text-slate-600">BOL-level events often need item-level NetSuite posting. Mapping one shipment record to multiple receipt lines requires deterministic allocation and line reference preservation.</p></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Lean IT Bandwidth</h3><p className="text-slate-600">Most mid-market operators do not have dedicated integration engineering resources. They need a managed normalization layer that follows finance controls from day one.</p></article>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold">FreightPop-to-NetSuite Normalization Pipeline</h2>
          <IntegrationDiagram sourceSystem="FreightPop" targetSystem="NetSuite" vertical="finance" fields={["Quotes", "Invoices", "Reconciliation"]} className="mx-auto w-full max-w-4xl" />
          <div className="grid gap-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 1: Shipment and Billing Ingestion</h3><p className="mt-3 text-slate-600">Extract shipment IDs, BOL/PRO references, service levels, estimated costs, and actual invoice details from FreightPop APIs or scheduled exports.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Inputs: shipments, quotes, invoices, POD</li><li>Formats: API JSON and CSV exports</li><li>Mode: event-based and scheduled processing</li></ul></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 2: Carrier and Service Normalization</h3><p className="mt-3 text-slate-600">Standardize carrier identities, service classes, and accessorial taxonomy so charges remain comparable across lanes and providers.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>SCAC and carrier-name normalization</li><li>Service-level translation to internal categories</li><li>Accessorial code mapping rules</li></ul></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 3: Cost Allocation and Accounting Logic</h3><p className="mt-3 text-slate-600">Apply GL mapping, cost-center assignment, and optional landed-cost capitalization based on shipment intent and accounting policy.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Inbound vs outbound account routing</li><li>Fuel and handling split logic</li><li>Customer bill-back support for reimbursable freight</li></ul></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 4: NetSuite Transaction Creation</h3><p className="mt-3 text-slate-600">Generate vendor bills, item receipt landed-cost lines, and adjustment journals with shipment references attached for traceability.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>REST/SOAP posting compatibility</li><li>Vendor and item internal ID resolution</li><li>Custom field support for BOL and shipment IDs</li></ul></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 5: Quote-to-Actual Reconciliation</h3><p className="mt-3 text-slate-600">Match quotes and final invoices with tolerance thresholds, produce variance alerts, and feed close-ready accrual adjustment reports.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Threshold model by value and percent</li><li>Auto-approve in-tolerance invoices</li><li>Exception queue for disputes and re-rating</li></ul></article>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Field Mapping Tables</h2>
          <h3 className="text-xl font-semibold">FreightPop Source Fields</h3>
          <div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">Path</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Use</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Shipment ID</td><td className="px-4 py-3">shipment.id</td><td className="px-4 py-3">SHIP_12345</td><td className="px-4 py-3">Primary transport key</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">BOL Number</td><td className="px-4 py-3">shipment.bol_number</td><td className="px-4 py-3">123456789</td><td className="px-4 py-3">Operational reference</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Quoted Cost</td><td className="px-4 py-3">quote.total</td><td className="px-4 py-3">245.00</td><td className="px-4 py-3">Accrual baseline</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Actual Cost</td><td className="px-4 py-3">invoice.total</td><td className="px-4 py-3">287.50</td><td className="px-4 py-3">Final bill value</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Carrier SCAC</td><td className="px-4 py-3">shipment.carrier.scac</td><td className="px-4 py-3">ODFL</td><td className="px-4 py-3">Vendor mapping key</td></tr></tbody></table></div>

          <h3 className="text-xl font-semibold">NetSuite Vendor Bill Fields</h3>
          <div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">NetSuite ID</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Normalization Rule</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Vendor</td><td className="px-4 py-3">entity</td><td className="px-4 py-3">Old Dominion Freight</td><td className="px-4 py-3">Carrier-to-vendor crosswalk</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Invoice Number</td><td className="px-4 py-3">tranid</td><td className="px-4 py-3">ODFL-123456</td><td className="px-4 py-3">Deduplicated by vendor/date hash</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Expense Account</td><td className="px-4 py-3">expenseaccount</td><td className="px-4 py-3">6100 Freight-LTL</td><td className="px-4 py-3">Lane and shipment-type routing</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Amount</td><td className="px-4 py-3">expenseamount</td><td className="px-4 py-3">287.50</td><td className="px-4 py-3">Signed numeric validation</td></tr></tbody></table></div>

          <h3 className="text-xl font-semibold">Cost Breakdown Mapping</h3>
          <div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Component</th><th className="px-4 py-3">Source Field</th><th className="px-4 py-3">NetSuite Account</th><th className="px-4 py-3">Typical Share</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Line Haul</td><td className="px-4 py-3">costs.freight</td><td className="px-4 py-3">6100 Freight</td><td className="px-4 py-3">70-80%</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Fuel</td><td className="px-4 py-3">costs.fuel</td><td className="px-4 py-3">6100 Fuel</td><td className="px-4 py-3">15-20%</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Accessorials</td><td className="px-4 py-3">costs.accessorials</td><td className="px-4 py-3">6100 Handling</td><td className="px-4 py-3">5-10%</td></tr></tbody></table></div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Carrier Coverage, SLA, and Operational Guarantees</h2>
          <p className="text-slate-600">Coverage supports major LTL and parcel providers used in FreightPop workflows, with configurable ingest pipelines for PDF, EDI, and structured feed variants. Processing targets include near-real-time invoice-to-QuickBooks posting and nightly reconciliation for accrual cleanup. Quality controls enforce vendor matching, reference integrity, and account mapping validation before final posting.</p>
          <div className="grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Timing Targets</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>Invoice receipt to NetSuite: ~15 minutes</li><li>Structured EDI invoice handling: ~5 minutes</li><li>Daily reconciliation: overnight</li></ul></div><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Quality Targets</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>Invoice matching target: 95%+ auto-match</li><li>Data extraction target: 98%+ on clean documents</li><li>Rule-based allocation validation before post</li></ul></div></div>
        </section>
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

