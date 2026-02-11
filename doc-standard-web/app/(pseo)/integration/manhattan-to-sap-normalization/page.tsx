import type { Metadata } from "next"
import Link from "next/link"
import { IntegrationDiagram } from "@/components/diagrams/IntegrationDiagram"

export const metadata: Metadata = {
  title: "Manhattan to SAP Normalization | WMS-to-ERP Data Bridge | DocStandard",
  description:
    "Normalize Manhattan WMS events into SAP-compatible IDoc and BAPI transactions with inventory, UOM, and traceability controls.",
}

export default function ManhattanToSapNormalizationPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden px-6 py-20"><div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" /><div className="relative z-10 mx-auto max-w-5xl"><p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Integration Deep Dive</p><h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Manhattan to SAP Normalization | WMS-to-ERP Data Bridge | DocStandard</h1><p className="max-w-3xl text-lg text-white/80">Bridge Manhattan WMS execution to SAP ERP posting with controlled normalization of movements, units, lot/serial traceability, and financial impacts. DocStandard handles volume and edge-case complexity without fragile custom middleware.</p><div className="mt-8 flex flex-wrap gap-4"><Link href="/login" className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100">Start Manhattan-to-SAP</Link><Link href="/integration" className="inline-flex items-center text-white/90 hover:underline">View all integrations</Link></div></div></section>

      <section className="mx-auto max-w-5xl space-y-14 px-6 py-14">
        <section className="space-y-6"><h2 className="text-3xl font-bold">Why WMS Data Creates ERP Instability</h2><p className="text-lg text-slate-600">High-frequency warehouse events must be reflected in SAP with correct movement types, timing, and quantity semantics. Without normalization, inventory states diverge, reconciliation grows, and downstream planning accuracy declines.</p><div className="grid gap-6 md:grid-cols-2"><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Event Volume Pressure</h3><p className="text-slate-600">Large facilities can emit tens of thousands of events per day. Batching too aggressively introduces staleness; posting too granularly can stress ERP throughput.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Inventory State Translation</h3><p className="text-slate-600">Manhattan location and status granularity often exceeds SAP posting granularity. Mapping must preserve control while fitting SAP structures.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">UOM Conversion Risk</h3><p className="text-slate-600">Warehouse eaches and ERP cases/pallets require material-specific conversion factors. Incorrect conversion changes valuation and available-to-promise behavior.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Lot and Serial Integrity</h3><p className="text-slate-600">Traceability failures can trigger compliance issues and rework. Every movement must preserve correct lot/serial references across systems.</p></article></div></section>

        <section className="space-y-8"><h2 className="text-3xl font-bold">Manhattan-to-SAP Pipeline</h2><IntegrationDiagram sourceSystem="Manhattan WMS" targetSystem="SAP" vertical="logistics" fields={["Events", "Movements", "Traceability"]} className="mx-auto w-full max-w-4xl" /><div className="grid gap-6"><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 1: Event Capture</h3><p className="mt-3 text-slate-600">Capture receipts, putaways, transfers, picks, shipments, and adjustments from Manhattan integration channels or data interfaces.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Sources: APIs, queues, controlled polling</li><li>Scale profile for high-throughput operations</li><li>Event ordering and idempotency controls</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 2: WMS Normalization</h3><p className="mt-3 text-slate-600">Normalize status codes, location hierarchies, and UOM values into SAP-compatible posting context while preserving detailed trace attributes.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Status and location mapping dictionaries</li><li>UOM conversion matrix by material</li><li>Lot/serial format and uniqueness checks</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 3: IDoc and BAPI Construction</h3><p className="mt-3 text-slate-600">Generate WMMBXY and related payloads, including BAPI calls for movement posting in scenarios requiring synchronous confirmation.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>IDoc types aligned to movement patterns</li><li>BAPI_GOODSMVT_CREATE for controlled posting</li><li>Error payload capture for reprocessing</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 4: SAP Integration Posting</h3><p className="mt-3 text-slate-600">Post transactions to SAP inventory and warehouse modules with movement-type controls and account determination consistency.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Movement type and posting key validation</li><li>Queue and status tracking via SAP monitoring</li><li>Controlled retries on transient failures</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 5: Reconciliation and Monitoring</h3><p className="mt-3 text-slate-600">Reconcile stock balances and movement histories daily, identify mismatch patterns, and provide actionable alerts for operations and IT.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Inventory comparison by material/location</li><li>Event-to-document lineage reports</li><li>Operational dashboards for failure trends</li></ul></article></div></section>

        <section className="space-y-6"><h2 className="text-3xl font-bold">Field Mapping Tables</h2><h3 className="text-xl font-semibold">Manhattan Source Fields</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">Table</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Purpose</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Facility</td><td className="px-4 py-3">Facility</td><td className="px-4 py-3">DC001</td><td className="px-4 py-3">Plant/location mapping</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Item</td><td className="px-4 py-3">Item</td><td className="px-4 py-3">SKU-12345</td><td className="px-4 py-3">Material mapping</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Quantity</td><td className="px-4 py-3">Qty</td><td className="px-4 py-3">100</td><td className="px-4 py-3">Movement quantity</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">UOM</td><td className="px-4 py-3">UOM</td><td className="px-4 py-3">EA</td><td className="px-4 py-3">Unit conversion context</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Lot/Serial</td><td className="px-4 py-3">Lot / SerialNbr</td><td className="px-4 py-3">LOT20260211A / SN123456789</td><td className="px-4 py-3">Traceability</td></tr></tbody></table></div><h3 className="text-xl font-semibold">SAP IDoc/BAPI Fields</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">Target Structure</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Rule</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Material</td><td className="px-4 py-3">E1BP2017_GM_ITEM_CREATE.MATERIAL</td><td className="px-4 py-3">SKU-12345</td><td className="px-4 py-3">Material master validation</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Plant</td><td className="px-4 py-3">PLANT</td><td className="px-4 py-3">1000</td><td className="px-4 py-3">Facility-to-plant map</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Storage Location</td><td className="px-4 py-3">STGE_LOC</td><td className="px-4 py-3">0001</td><td className="px-4 py-3">Location translation map</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Movement Type</td><td className="px-4 py-3">MOVE_TYPE</td><td className="px-4 py-3">101</td><td className="px-4 py-3">Activity-to-movement mapping</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Batch</td><td className="px-4 py-3">BATCH</td><td className="px-4 py-3">LOT20260211A</td><td className="px-4 py-3">Lot trace persistence</td></tr></tbody></table></div><h3 className="text-xl font-semibold">Movement Type Crosswalk</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Manhattan Activity</th><th className="px-4 py-3">SAP Movement Type</th><th className="px-4 py-3">Meaning</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Receipt</td><td className="px-4 py-3">101</td><td className="px-4 py-3">Goods receipt</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Transfer</td><td className="px-4 py-3">311</td><td className="px-4 py-3">Storage transfer</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Pick/Ship</td><td className="px-4 py-3">601</td><td className="px-4 py-3">Goods issue for delivery</td></tr></tbody></table></div></section>

        <section className="space-y-6"><h2 className="text-3xl font-bold">SAP Setup and SLA</h2><p className="text-slate-600">Recommended baseline includes MM, IM, and relevant WM/EWM capabilities with IDoc partner profiles and queue monitoring configured. Operational performance targets depend on workload profile, but near-real-time posting and frequent reconciliation cycles are standard for high-volume networks.</p><div className="grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Performance Targets</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>Event-to-IDoc generation in minutes</li><li>Queue-aware posting with retry support</li><li>Hourly and daily reconciliation modes</li></ul></div><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Quality Targets</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>High event-capture reliability</li><li>IDoc/BAPI validation before commit</li><li>Stock-accuracy controls through reconciliation</li></ul></div></div></section>
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

