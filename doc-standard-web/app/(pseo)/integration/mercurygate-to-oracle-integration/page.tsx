import type { Metadata } from "next"
import Link from "next/link"
import { IntegrationDiagram } from "@/components/diagrams/IntegrationDiagram"

export const metadata: Metadata = {
  title: "MercuryGate to Oracle Integration | TMS-to-ERP Data Bridge | DocStandard",
  description:
    "Automate shipment cost flow from MercuryGate into Oracle AP/GL with normalization, accrual logic, and reconciliation controls.",
}

export default function MercuryGateToOracleIntegrationPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Integration Deep Dive</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            MercuryGate to Oracle Integration | TMS-to-ERP Data Bridge | DocStandard
          </h1>
          <p className="max-w-3xl text-lg text-white/80">
            Move shipment planning and freight audit data from MercuryGate into Oracle financial
            modules without spreadsheet reconciliation loops. DocStandard normalizes costs,
            allocations, and references into Oracle-compatible posting formats for AP, GL, and
            accrual operations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Start MercuryGate-to-Oracle Setup
            </Link>
            <Link href="/integration" className="inline-flex items-center text-white/90 hover:underline">
              View all integrations
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-14 px-6 py-14">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Why MercuryGate and Oracle Handoffs Break</h2>
          <p className="text-lg text-slate-600">
            MercuryGate is optimized for transportation execution. Oracle is optimized for financial
            governance and close controls. The operating data model and the accounting model do not
            align out of the box.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Shipment Cost Fragmentation</h3>
              <p className="text-slate-600">
                Base freight, fuel, detention, and other accessorials can appear as separate line
                items in MercuryGate but require specific distribution behavior in Oracle AP/GL.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Accrual Timing Misalignment</h3>
              <p className="text-slate-600">
                Delivery completion can happen days before carrier billing. Oracle period close still
                needs accruals posted on time with traceable shipment references.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Planned vs Actual Invoice Gaps</h3>
              <p className="text-slate-600">
                Planned transportation cost in TMS often differs from billed cost. Without automated
                match rules, finance teams work variances manually at month end.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Multi-leg and Multi-currency Complexity</h3>
              <p className="text-slate-600">
                International and intermodal moves require leg-level allocations, FX handling, and
                entity-specific mapping that generic file exports do not solve.
              </p>
            </article>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold">MercuryGate-to-Oracle Bridge Pipeline</h2>
          <IntegrationDiagram
            sourceSystem="MercuryGate"
            targetSystem="Oracle"
            vertical="finance"
            fields={["Shipment", "Charges", "Accruals"]}
            className="mx-auto w-full max-w-4xl"
          />

          <div className="grid gap-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 1: MercuryGate Extraction</h3>
              <p className="mt-3 text-slate-600">
                Pull shipment headers, stop events, carrier data, planned and actual charge lines,
                POD events, and reference identifiers from MercuryGate API or scheduled exports.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>API: MercuryGate REST v2</li>
                <li>Formats: XML native, JSON API, CSV scheduled outputs</li>
                <li>Coverage: shipments, costs, stops, appointments, POD</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 2: Cost Normalization</h3>
              <p className="mt-3 text-slate-600">
                Convert TMS charge taxonomy into finance-ready components with currency and tax logic
                preserved for controlled posting.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>Split base, fuel, detention, and accessorial categories</li>
                <li>Apply corporate FX policy and ledger currency conversion</li>
                <li>Bind charge categories to GL distributions and cost centers</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 3: Oracle Mapping</h3>
              <p className="mt-3 text-slate-600">
                Create posting-ready payloads for Oracle EBS or Oracle Fusion, including AP invoice
                lines, GL distributions, and shipment reference attributes.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>Oracle EBS: interface table and FBDI-compatible outputs</li>
                <li>Oracle Fusion: REST payload mapping for payables posting</li>
                <li>Chart-of-accounts segment validation before submit</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 4: Match and Reconciliation</h3>
              <p className="mt-3 text-slate-600">
                Planned-vs-actual controls compare MercuryGate cost expectations against carrier
                invoice lines and received delivery context.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>Three-way match logic: planned, billed, delivered</li>
                <li>Tolerance rules: percentage and absolute-value thresholds</li>
                <li>Exception queue for disputes and analyst review</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 5: Financial Posting</h3>
              <p className="mt-3 text-slate-600">
                Deliver validated data in near real-time or batch schedules with audit-ready lineage
                from MercuryGate identifiers to Oracle transaction IDs.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>Posting formats: FBDI CSV, REST JSON, BI Publisher XML</li>
                <li>Reliability: retry controls with backoff and error logging</li>
                <li>Traceability: shipment, load, and invoice references retained</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">MercuryGate-to-Oracle Field Mapping</h2>
          <h3 className="text-xl font-semibold">MercuryGate Source Fields</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">API Path</th>
                  <th className="px-4 py-3">Example</th>
                  <th className="px-4 py-3">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Shipment ID</td><td className="px-4 py-3">shipment.id</td><td className="px-4 py-3">SH_123456</td><td className="px-4 py-3">Primary shipment reference</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Carrier SCAC</td><td className="px-4 py-3">carrier.scac</td><td className="px-4 py-3">UPSN</td><td className="px-4 py-3">Carrier identity normalization</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Base Freight</td><td className="px-4 py-3">costs.base</td><td className="px-4 py-3">980.00</td><td className="px-4 py-3">Core line-haul charge</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Fuel Surcharge</td><td className="px-4 py-3">costs.fuel</td><td className="px-4 py-3">150.00</td><td className="px-4 py-3">Fuel cost component</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Accessorials</td><td className="px-4 py-3">costs.accessorials[]</td><td className="px-4 py-3">LIFT:120</td><td className="px-4 py-3">Additional service charges</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Delivery Date</td><td className="px-4 py-3">stops[-1].actual_arrival</td><td className="px-4 py-3">2026-02-11</td><td className="px-4 py-3">Accrual timing anchor</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Oracle Target Fields (AP/GL)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">Oracle Target</th>
                  <th className="px-4 py-3">Example</th>
                  <th className="px-4 py-3">Mapping Logic</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Invoice Number</td><td className="px-4 py-3">AP_INVOICES_INTERFACE.INVOICE_NUM</td><td className="px-4 py-3">CRR-UPS-123456</td><td className="px-4 py-3">Carrier invoice uniqueness controls</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Invoice Amount</td><td className="px-4 py-3">AP_INVOICES_INTERFACE.INVOICE_AMOUNT</td><td className="px-4 py-3">1250.00</td><td className="px-4 py-3">Header sum validation against lines</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Distribution Account</td><td className="px-4 py-3">DIST_CODE_CONCATENATED</td><td className="px-4 py-3">01-6100-1000-0000</td><td className="px-4 py-3">GL segment resolution by rule set</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Shipment Reference</td><td className="px-4 py-3">ATTRIBUTE1 / flexfield</td><td className="px-4 py-3">SH_123456</td><td className="px-4 py-3">Lineage back to TMS shipment</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Accrual Flag</td><td className="px-4 py-3">AP accrual indicator</td><td className="px-4 py-3">Y</td><td className="px-4 py-3">Estimated vs actual differentiation</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Allocation Scenarios</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Scenario</th>
                  <th className="px-4 py-3">MercuryGate Input</th>
                  <th className="px-4 py-3">Oracle Output</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Standard LTL</td><td className="px-4 py-3">Total 1,250.00</td><td className="px-4 py-3">6100 Freight 1,250.00</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Multi-leg</td><td className="px-4 py-3">Ground 500 + Air 2,000</td><td className="px-4 py-3">6100 Ground 500, 6100 Air 2,000</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Accessorial split</td><td className="px-4 py-3">Base 980 + Lift 120 + Fuel 150</td><td className="px-4 py-3">Freight 980, Handling 120, Fuel 150</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Oracle Module Coverage and SLA</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Supported Modules</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                <li>Oracle EBS AP, GL, CE, and Cost Management</li>
                <li>Oracle Fusion Payables and General Ledger</li>
                <li>Integration paths via FBDI, REST API, and XML outputs</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Processing Targets</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                <li>Shipment status to Oracle: around 15 minutes</li>
                <li>Accrual processing: hourly configurable batches</li>
                <li>Invoice matching: daily reconciliation cycle</li>
                <li>Field accuracy target: 99.5% for structured records</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Technical Control Matrix for Finance Teams</h2>
          <p className="text-slate-600">
            Most failures in TMS-to-ERP integrations happen after mapping, not before. The
            following control matrix defines how posting integrity is preserved when source data is
            incomplete, delayed, duplicated, or outside configured tolerance levels.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Control Area</th>
                  <th className="px-4 py-3">Validation Rule</th>
                  <th className="px-4 py-3">Failure Action</th>
                  <th className="px-4 py-3">Business Impact</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Invoice Uniqueness</td><td className="px-4 py-3">Carrier + invoice number + date hash must be unique</td><td className="px-4 py-3">Hold record, raise duplicate alert</td><td className="px-4 py-3">Prevents duplicate AP payment risk</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Period Governance</td><td className="px-4 py-3">Posting date must be inside open Oracle accounting period</td><td className="px-4 py-3">Queue for period override approval</td><td className="px-4 py-3">Protects month-end close integrity</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">GL Segment Validation</td><td className="px-4 py-3">Company, department, and account segments must resolve</td><td className="px-4 py-3">Route to mapping exception queue</td><td className="px-4 py-3">Prevents journal rejection in Oracle</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Tolerance Match</td><td className="px-4 py-3">Actual vs planned delta within configured threshold</td><td className="px-4 py-3">Auto-approve or open dispute case</td><td className="px-4 py-3">Cuts manual variance review time</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Currency Conversion</td><td className="px-4 py-3">FX source and rate timestamp must exist</td><td className="px-4 py-3">Fallback to treasury-approved rate set</td><td className="px-4 py-3">Stabilizes multi-entity reporting</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600">
            These controls are applied before final Oracle submission and preserved in audit logs so
            teams can explain why a line posted, why a line held, and which transformation rule
            produced the final output. This is the difference between a technical integration and a
            finance-grade integration that survives close cycles.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Implementation Checklist and Timeline</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Week 1: Discovery</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                <li>Identify shipment and cost objects in MercuryGate</li>
                <li>Confirm Oracle target modules and posting paths</li>
                <li>Define GL and cost-center allocation rules</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Week 2: Mapping and Test</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                <li>Build field crosswalk and transformation logic</li>
                <li>Run backfill on historical shipment sample</li>
                <li>Validate tolerance, exception, and retry behavior</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Week 3: Cutover</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                <li>Enable controlled production posting window</li>
                <li>Monitor first-cycle reconciliation metrics</li>
                <li>Finalize exception handling ownership model</li>
              </ul>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
