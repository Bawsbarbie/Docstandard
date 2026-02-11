import type { Metadata } from "next"
import Link from "next/link"
import { IntegrationDiagram } from "@/components/diagrams/IntegrationDiagram"

export const metadata: Metadata = {
  title: "RoseRocket to QuickBooks Bridge | TMS Data Integration | DocStandard",
  description:
    "Bridge RoseRocket shipment operations to QuickBooks invoices and bills with automated margin and settlement reconciliation.",
}

export default function RoseRocketToQuickBooksBridgePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Integration Deep Dive</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">RoseRocket to QuickBooks Bridge | TMS Data Integration | DocStandard</h1>
          <p className="max-w-3xl text-lg text-white/80">Automate the brokerage accounting loop from RoseRocket load execution to QuickBooks billing and settlement. DocStandard removes manual re-keying, accelerates invoice creation, and preserves shipment-level profitability visibility.</p>
          <div className="mt-8 flex flex-wrap gap-4"><Link href="/login" className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100">Start RoseRocket-to-QuickBooks</Link><Link href="/integration" className="inline-flex items-center text-white/90 hover:underline">View all integrations</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-14 px-6 py-14">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Why Broker Data Breaks Down in QuickBooks</h2>
          <p className="text-lg text-slate-600">RoseRocket operations teams manage loads, carriers, and status events in real time. QuickBooks users need invoice and bill records with correct references and account coding. Without a normalization bridge, cash application and carrier settlements lag behind delivery events.</p>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Rate Confirmation Lag</h3><p className="text-slate-600">Loads can be delivered while customer invoices remain queued. Delayed billing extends DSO and obscures true daily margin.</p></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Carrier Settlement Matching</h3><p className="text-slate-600">Carrier invoice references differ from brokerage load identifiers. Matching billable events manually slows AP and dispute handling.</p></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Accessorial Variance</h3><p className="text-slate-600">Detention, layover, and reweigh adjustments create post-delivery variance. Teams need controlled amendment logic for both receivables and payables.</p></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Multi-office Reporting</h3><p className="text-slate-600">Broker networks often segment teams by branch or agent. Transactions must carry dimensions so consolidated reporting remains accurate.</p></article>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold">RoseRocket-to-QuickBooks Pipeline</h2>
          <IntegrationDiagram sourceSystem="RoseRocket" targetSystem="QuickBooks" vertical="finance" fields={["Loads", "Invoices", "Bills"]} className="mx-auto w-full max-w-4xl" />
          <div className="grid gap-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 1: Load and Financial Extraction</h3><p className="mt-3 text-slate-600">Extract load identifiers, customer rate, carrier pay, status milestones, and accessorial events from RoseRocket APIs.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Coverage: loads, carriers, customers, settlements</li><li>Update mode: webhooks and polling</li><li>Reference integrity checks per load</li></ul></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 2: Revenue Preparation</h3><p className="mt-3 text-slate-600">Generate customer billing records from delivered loads with terms, tax, and service-item mapping applied.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>CustomerRef mapping and invoice numbering</li><li>Line-level accessorial itemization</li><li>Delivered-to-bill and bill-on-ship options</li></ul></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 3: Cost and Settlement Preparation</h3><p className="mt-3 text-slate-600">Create carrier payable lines with settlement references, deductions, and payment-term logic.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>VendorRef mapping for carriers</li><li>QuickPay and standard settlement support</li><li>1099-eligible payment tagging</li></ul></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 4: QuickBooks Posting</h3><p className="mt-3 text-slate-600">Post invoices, bills, credit memos, and optional journals to QuickBooks Online or Desktop integration channels.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>QBO API and QBD connector paths</li><li>Document and memo reference preservation</li><li>Retry and duplicate prevention controls</li></ul></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 5: Margin and Reconciliation</h3><p className="mt-3 text-slate-600">Compute shipment-level gross margin and track payment status across A/R and A/P records.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Profit by load, lane, carrier, and customer</li><li>Aging and settlement status reporting</li><li>Commission and agent split support</li></ul></article>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Field Mapping Tables</h2>
          <h3 className="text-xl font-semibold">RoseRocket Source</h3>
          <div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">Path</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Purpose</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Load ID</td><td className="px-4 py-3">load.id</td><td className="px-4 py-3">LD_12345</td><td className="px-4 py-3">Primary brokerage key</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Customer Rate</td><td className="px-4 py-3">financials.customer_rate</td><td className="px-4 py-3">1200.00</td><td className="px-4 py-3">Revenue basis</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Carrier Rate</td><td className="px-4 py-3">financials.carrier_rate</td><td className="px-4 py-3">950.00</td><td className="px-4 py-3">Cost basis</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Delivery Date</td><td className="px-4 py-3">dates.delivered_at</td><td className="px-4 py-3">2026-02-11</td><td className="px-4 py-3">Invoice trigger date</td></tr></tbody></table></div>

          <h3 className="text-xl font-semibold">QuickBooks Invoice Fields</h3>
          <div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">QBO Path</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Rule</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">CustomerRef</td><td className="px-4 py-3">CustomerRef.value</td><td className="px-4 py-3">61</td><td className="px-4 py-3">Customer ID crosswalk</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Line Amount</td><td className="px-4 py-3">Line[].Amount</td><td className="px-4 py-3">1200.00</td><td className="px-4 py-3">Rate + accessorial aggregation</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Doc Number</td><td className="px-4 py-3">DocNumber</td><td className="px-4 py-3">1001</td><td className="px-4 py-3">Unique invoice strategy</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Private Note</td><td className="px-4 py-3">PrivateNote</td><td className="px-4 py-3">BOL 123456789</td><td className="px-4 py-3">Shipment context retention</td></tr></tbody></table></div>

          <h3 className="text-xl font-semibold">QuickBooks Bill Fields</h3>
          <div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">QBO Path</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Rule</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">VendorRef</td><td className="px-4 py-3">VendorRef.value</td><td className="px-4 py-3">45</td><td className="px-4 py-3">Carrier vendor mapping</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Amount</td><td className="px-4 py-3">Line[].Amount</td><td className="px-4 py-3">950.00</td><td className="px-4 py-3">Settlement amount normalization</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">AccountRef</td><td className="px-4 py-3">Line[].AccountRef</td><td className="px-4 py-3">75</td><td className="px-4 py-3">Expense account routing</td></tr></tbody></table></div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Brokerage Workflow and SLA</h2>
          <p className="text-slate-600">Operationally, the bridge supports a delivered-load trigger that produces invoice and bill drafts within minutes, followed by scheduled reconciliation for payment status and margin analytics. Both QuickBooks Online and Desktop modes are supported through their appropriate connectivity patterns and authentication requirements.</p>
          <div className="grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Timing</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>Invoice creation: within minutes after delivery event</li><li>Bill creation: on delivery or invoice receipt</li><li>Payment sync: daily scheduled alignment</li></ul></div><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Quality</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>Customer and vendor match validation</li><li>Rate integrity based on RoseRocket source values</li><li>Duplicate and exception safeguards</li></ul></div></div>
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

