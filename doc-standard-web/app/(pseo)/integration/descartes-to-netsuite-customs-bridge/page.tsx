import type { Metadata } from "next"
import Link from "next/link"
import { IntegrationDiagram } from "@/components/diagrams/IntegrationDiagram"

export const metadata: Metadata = {
  title: "Descartes to NetSuite Customs Bridge | Customs Data Integration | DocStandard",
  description:
    "Normalize Descartes customs entries, duties, and fees into NetSuite landed-cost and accounting records with full audit traceability.",
}

export default function DescartesToNetSuiteCustomsBridgePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Integration Deep Dive</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Descartes to NetSuite Customs Bridge | Customs Data Integration | DocStandard
          </h1>
          <p className="max-w-3xl text-lg text-white/80">
            Flow customs entries, duties, and compliance data from Descartes into NetSuite without
            manual landed-cost cleanup. DocStandard turns customs event data, broker charges, and
            CBP fee details into structured financial records that align with inventory valuation,
            AP workflows, and audit documentation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/login" className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100">Start Descartes-to-NetSuite Bridge</Link>
            <Link href="/integration" className="inline-flex items-center text-white/90 hover:underline">View all integrations</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-14 px-6 py-14">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Why Customs Data Breaks Down in ERP</h2>
          <p className="text-lg text-slate-600">
            Customs systems and ERP systems operate on different timelines. Descartes contains entry
            detail, duty logic, and broker-level adjustments in near real time. NetSuite often only
            sees the accounting side when invoices or statements arrive later. That timing gap
            creates valuation drift and close-cycle pressure.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Delayed Cost Visibility</h3><p className="text-slate-600">Entries can clear before corresponding broker invoices are posted. Inventory lands first while costs arrive later, forcing provisional accruals and manual true-up activity.</p></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Landed Cost Fragmentation</h3><p className="text-slate-600">Duty, MPF, HMF, and broker services require different accounting treatment. Collapsing all costs into one bucket breaks margin quality and product-level analytics.</p></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Entry-to-Receipt Matching</h3><p className="text-slate-600">Customs entry references and PO receipt references rarely align one-to-one. Without deterministic keys and fallback match logic, analysts reconcile manually.</p></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Audit Preparation Overhead</h3><p className="text-slate-600">During audit windows, teams need source calculations and document trails. If customs and ERP are disconnected, collecting evidence becomes a separate project.</p></article>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Descartes-to-NetSuite Customs Pipeline</h2>
          <IntegrationDiagram sourceSystem="Descartes GLM" targetSystem="NetSuite" vertical="compliance" fields={["Entry", "Duty", "Landed Cost"]} className="mx-auto w-full max-w-4xl" />
          <div className="grid gap-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 1: Descartes Extraction</h3><p className="mt-3 text-slate-600">Capture entry headers, HTS lines, duty values, fee schedules, and broker charges from Descartes APIs or controlled exports. Source documents such as 7501 forms and commercial invoice references are retained.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Formats: XML, JSON, EDI variants</li><li>Auth: API key or secure file transport credentials</li><li>Update modes: event-driven and scheduled</li></ul></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 2: Entry Normalization</h3><p className="mt-3 text-slate-600">Normalize HTS codes, fee components, valuation basis, and jurisdiction context. Apply deterministic calculations for MPF and HMF treatment and preserve source-level references for compliance review.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>HTS and code validation checks</li><li>Duty and fee component splitting</li><li>Currency and rounding policy controls</li></ul></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 3: Landed Cost Allocation</h3><p className="mt-3 text-slate-600">Allocate customs costs across receipt lines using value, quantity, or weight basis. Maintain separate accounting channels for inventory-capitalized costs and service-expense components.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Duty to inventory categories</li><li>Broker fees to AP expense categories</li><li>Variance reporting for estimate vs final</li></ul></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 4: NetSuite Posting</h3><p className="mt-3 text-slate-600">Create item receipt landed cost entries, vendor bills, and supporting custom records. Keep entry numbers and broker references on records for easy drill-down.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>REST or SOAP integration options</li><li>Document attachments to file cabinet</li><li>Subsidiary-aware posting rules</li></ul></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 5: Reconciliation and Liquidation Tracking</h3><p className="mt-3 text-slate-600">Run daily matching between customs entries and ERP transactions. Track liquidation updates and route post-entry adjustments for controlled reprocessing.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Match keys: entry, container, invoice, PO</li><li>Status checks for liquidation events</li><li>Exception workflows for unresolved entries</li></ul></article>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Field Mapping Reference</h2>
          <h3 className="text-xl font-semibold">Descartes Source Fields</h3>
          <div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">Path</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Purpose</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Entry Number</td><td className="px-4 py-3">entry.number</td><td className="px-4 py-3">123-4567890-1</td><td className="px-4 py-3">Primary customs identifier</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">HTS Code</td><td className="px-4 py-3">lines[].hts</td><td className="px-4 py-3">8471.30.0100</td><td className="px-4 py-3">Tariff and duty logic</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Entered Value</td><td className="px-4 py-3">lines[].value</td><td className="px-4 py-3">25000.00</td><td className="px-4 py-3">Allocation basis</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Duty Amount</td><td className="px-4 py-3">lines[].duty_amount</td><td className="px-4 py-3">0.00</td><td className="px-4 py-3">Duty posting value</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">MPF/HMF</td><td className="px-4 py-3">lines[].mpf / lines[].hmf</td><td className="px-4 py-3">152.50 / 31.25</td><td className="px-4 py-3">Fee-specific postings</td></tr></tbody></table></div>

          <h3 className="text-xl font-semibold">NetSuite Target Fields</h3>
          <div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">NetSuite ID</th><th className="px-4 py-3">Example</th><th className="px-4 py-3">Mapping</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">External ID</td><td className="px-4 py-3">externalid</td><td className="px-4 py-3">descartes_123-4567890-1</td><td className="px-4 py-3">Entry linkage</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Landed Cost Category</td><td className="px-4 py-3">landedcostcategory</td><td className="px-4 py-3">Customs Duties</td><td className="px-4 py-3">Cost classification</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Landed Cost Amount</td><td className="px-4 py-3">landedcostamount</td><td className="px-4 py-3">183.75</td><td className="px-4 py-3">Allocated entry fees</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Vendor Bill Ref</td><td className="px-4 py-3">tranid</td><td className="px-4 py-3">INV-2026-1234</td><td className="px-4 py-3">Broker invoice reference</td></tr></tbody></table></div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">CBP Fee and Compliance Controls</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Fee Model Support</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>MPF and HMF calculation treatment</li><li>Formal and informal entry patterns</li><li>Duty type treatment and exceptions</li><li>Policy-driven capitalization choices</li></ul></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">SLA and Quality</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>Entry-to-NetSuite target: ~15 minutes</li><li>Document attachment target: ~5 minutes</li><li>Daily reconciliation and liquidation checks</li><li>Duty math and syntax validations before post</li></ul></div>
          </div>
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

