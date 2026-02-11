import type { Metadata } from "next"
import Link from "next/link"
import { IntegrationDiagram } from "@/components/diagrams/IntegrationDiagram"

export const metadata: Metadata = {
  title: "Kuebix to QuickBooks Bridge | TMS Expense Integration | DocStandard",
  description:
    "Convert Kuebix shipment and carrier invoice data into QuickBooks bills, GL-coded expense lines, and freight spend reconciliation outputs.",
}

export default function KuebixToQuickBooksBridgePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden px-6 py-20"><div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" /><div className="relative z-10 mx-auto max-w-5xl"><p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Integration Deep Dive</p><h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Kuebix to QuickBooks Bridge | TMS Expense Integration | DocStandard</h1><p className="max-w-3xl text-lg text-white/80">Automate transportation spend accounting by normalizing Kuebix procurement and shipment data into QuickBooks payable transactions. DocStandard handles invoice matching, rate verification, and account coding for shipper finance teams.</p><div className="mt-8 flex flex-wrap gap-4"><Link href="/login" className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100">Start Kuebix-to-QuickBooks</Link><Link href="/integration" className="inline-flex items-center text-white/90 hover:underline">View all integrations</Link></div></div></section>

      <section className="mx-auto max-w-5xl space-y-14 px-6 py-14">
        <section className="space-y-6"><h2 className="text-3xl font-bold">Why Transportation Spend Data Breaks in QuickBooks</h2><p className="text-lg text-slate-600">Kuebix centralizes rate procurement and shipment management, but accounting still depends on accurate carrier bill ingestion and coding. Manual matching from PDF invoices to TMS records leads to delays and leakage.</p><div className="grid gap-6 md:grid-cols-2"><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Invoice-to-Shipment Reference Drift</h3><p className="text-slate-600">Carrier documents may prioritize PRO numbers while TMS users track BOL or customer references, reducing match confidence in manual workflows.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Rate Verification at Scale</h3><p className="text-slate-600">Expected contract rates and fuel formulas need automated checks against invoice lines. Spreadsheet review does not scale for high-volume lanes.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">GL Coding Inconsistency</h3><p className="text-slate-600">Inbound, outbound, intercompany, and return freight require different accounting treatment. Manual coding produces inconsistent reporting.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Accrual Reversal Overhead</h3><p className="text-slate-600">When invoice timing trails shipment completion, teams create estimates and reverse later. Weak linkages make accrual cleanup slow and error-prone.</p></article></div></section>

        <section className="space-y-8"><h2 className="text-3xl font-bold">Kuebix-to-QuickBooks Pipeline</h2><IntegrationDiagram sourceSystem="Kuebix" targetSystem="QuickBooks" vertical="finance" fields={["Shipments", "Carrier Bills", "Variance"]} className="mx-auto w-full max-w-4xl" /><div className="grid gap-6"><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 1: Kuebix Data Extraction</h3><p className="mt-3 text-slate-600">Collect shipment attributes, carrier assignment, estimated costs, and event dates from Kuebix APIs and exports.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Paths: shipments, rates, invoices</li><li>Modes: API and scheduled file exchange</li><li>Reference capture: BOL, PRO, PO</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 2: Carrier Invoice Matching</h3><p className="mt-3 text-slate-600">Match carrier invoices to shipment records with primary and fallback key logic, then score confidence for auto-approval or exception routing.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Primary keys: PRO, BOL, reference</li><li>Fallback keys: amount, date, lane similarity</li><li>Tolerance checks against contract expectations</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 3: Cost and Account Allocation</h3><p className="mt-3 text-slate-600">Break charges into line-haul, fuel, accessorial, and special fee components; route each line to configured QuickBooks accounts and dimensions.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Lane- and mode-specific account rules</li><li>Facility or business-unit allocation dimensions</li><li>Tax handling for jurisdictional freight rules</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 4: QuickBooks Bill Creation</h3><p className="mt-3 text-slate-600">Create bills and optional supporting entries in QuickBooks with document metadata and attachment references preserved.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>QBO API posting and QBD connector support</li><li>Vendor auto-resolution and duplicate protection</li><li>Structured memo fields for traceability</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 5: Spend Analytics and Reconciliation</h3><p className="mt-3 text-slate-600">Produce variance, aging, and freight-spend analysis by lane and carrier while reconciling estimate-to-actual movement over period close.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Budget and threshold alerts</li><li>Accrual accuracy tracking</li><li>Carrier performance analytics</li></ul></article></div></section>

        <section className="space-y-6"><h2 className="text-3xl font-bold">Field Mapping Tables</h2><h3 className="text-xl font-semibold">Kuebix Source Fields</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">Path</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Purpose</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Shipment ID</td><td className="px-4 py-3">shipment.id</td><td className="px-4 py-3">SHIP_12345</td><td className="px-4 py-3">Primary shipment link</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">BOL</td><td className="px-4 py-3">shipment.bol</td><td className="px-4 py-3">123456789</td><td className="px-4 py-3">Freight document link</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">PRO Number</td><td className="px-4 py-3">shipment.pro_number</td><td className="px-4 py-3">PRO987654</td><td className="px-4 py-3">Carrier match key</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Estimated Cost</td><td className="px-4 py-3">costs.estimated</td><td className="px-4 py-3">450.00</td><td className="px-4 py-3">Accrual baseline</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Actual Cost</td><td className="px-4 py-3">costs.actual</td><td className="px-4 py-3">475.50</td><td className="px-4 py-3">Final payable amount</td></tr></tbody></table></div><h3 className="text-xl font-semibold">QuickBooks Bill Fields</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">QBO Path</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Rule</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">VendorRef</td><td className="px-4 py-3">VendorRef.value</td><td className="px-4 py-3">35</td><td className="px-4 py-3">Carrier vendor mapping</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">DocNumber</td><td className="px-4 py-3">DocNumber</td><td className="px-4 py-3">FDXF-2026-001234</td><td className="px-4 py-3">Invoice identifier with duplicate checks</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Line Amount</td><td className="px-4 py-3">Line[].Amount</td><td className="px-4 py-3">475.50</td><td className="px-4 py-3">Charge-line aggregation</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">AccountRef</td><td className="px-4 py-3">Line[].AccountRef</td><td className="px-4 py-3">61</td><td className="px-4 py-3">GL routing by scenario</td></tr></tbody></table></div><h3 className="text-xl font-semibold">Account Mapping Patterns</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Shipment Type</th><th className="px-4 py-3">Kuebix Context</th><th className="px-4 py-3">QuickBooks Account</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Inbound Raw</td><td className="px-4 py-3">Supplier to Plant</td><td className="px-4 py-3">5100 Freight-In</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Outbound Finished</td><td className="px-4 py-3">Plant to Customer</td><td className="px-4 py-3">6100 Freight-Out</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Inter-facility</td><td className="px-4 py-3">Plant to DC</td><td className="px-4 py-3">6200 Intercompany Freight</td></tr></tbody></table></div></section>

        <section className="space-y-6"><h2 className="text-3xl font-bold">Carrier Format Coverage and SLA</h2><p className="text-slate-600">The bridge supports common LTL, truckload, and parcel invoice formats with parsing controls for PDF, EDI 210, and structured feed variants. Operational targets focus on fast posting and robust exception management rather than rigid one-size-fits-all timing.</p><div className="grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Processing Targets</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>PDF invoice to bill: about 15 minutes</li><li>Structured EDI processing: about 5 minutes</li><li>Nightly reconciliation and exception digest</li></ul></div><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Quality Targets</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>High auto-match confidence on recurring lanes</li><li>Rate verification against Kuebix baseline</li><li>Audit-friendly reference retention per transaction</li></ul></div></div></section>
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

