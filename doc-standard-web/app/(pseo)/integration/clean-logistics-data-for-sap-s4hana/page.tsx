import type { Metadata } from "next"
import Link from "next/link"
import { IntegrationDiagram } from "@/components/diagrams/IntegrationDiagram"

export const metadata: Metadata = {
  title: "Clean Logistics Data for SAP S/4HANA | Data Preparation Services | DocStandard",
  description:
    "Prepare and normalize logistics documents for SAP S/4HANA ingestion with strict validation, mapping, and audit controls.",
}

export default function CleanLogisticsDataForSapS4hanaPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden px-6 py-20"><div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" /><div className="relative z-10 mx-auto max-w-5xl"><p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Integration Deep Dive</p><h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Clean Logistics Data for SAP S/4HANA | Data Preparation Services | DocStandard</h1><p className="max-w-3xl text-lg text-white/80">Build a reliable digital core by normalizing messy logistics data before it reaches SAP S/4HANA. DocStandard aligns source documents, validates critical fields, and delivers S/4HANA-ready structures for operational and financial posting.</p><div className="mt-8 flex flex-wrap gap-4"><Link href="/login" className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100">Start S/4HANA Data Prep</Link><Link href="/integration" className="inline-flex items-center text-white/90 hover:underline">View all integrations</Link></div></div></section>

      <section className="mx-auto max-w-5xl space-y-14 px-6 py-14">
        <section className="space-y-6"><h2 className="text-3xl font-bold">Why Data Quality Determines S/4HANA Outcomes</h2><p className="text-lg text-slate-600">S/4HANA enforces tighter data discipline than legacy environments. Document inconsistency, weak code mappings, and duplicate transaction patterns can disrupt posting, analytics, and user confidence across MM, SD, LE, and FI workflows.</p><div className="grid gap-6 md:grid-cols-2"><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Migration Cleansing Burden</h3><p className="text-slate-600">Legacy logistics records often fail strict target validation, delaying migration waves and increasing cutover risk.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Universal Journal Sensitivity</h3><p className="text-slate-600">Poor source quality propagates into financial and inventory views simultaneously, magnifying downstream reconciliation effort.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Fiori Experience Degradation</h3><p className="text-slate-600">End users experience failed validations and incomplete records when source normalization is inconsistent.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Analytics Reliability Risk</h3><p className="text-slate-600">Embedded analytics can become misleading if core logistics dimensions are incomplete or misclassified.</p></article></div></section>

        <section className="space-y-8"><h2 className="text-3xl font-bold">DocStandard S/4HANA Preparation Pipeline</h2><IntegrationDiagram sourceSystem="Logistics Documents" targetSystem="SAP S/4HANA" vertical="compliance" fields={["Extract", "Validate", "Post"]} className="mx-auto w-full max-w-4xl" /><div className="grid gap-6"><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 1: Multi-source Ingestion</h3><p className="mt-3 text-slate-600">Ingest freight invoices, supplier docs, shipping records, EDI feeds, and legacy archives through secure intake channels.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>PDF, EDI, XML, JSON, CSV and image support</li><li>Batch and real-time handling profiles</li><li>Historical archive ingestion for migration</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 2: Extraction and Cleansing</h3><p className="mt-3 text-slate-600">Extract key fields and normalize formats, dates, UOMs, partner references, and monetary values while scoring confidence and flagging risks.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Field-level confidence and validation</li><li>Master-data lookup for materials and vendors</li><li>Duplicate and anomaly detection</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 3: S/4HANA Mapping</h3><p className="mt-3 text-slate-600">Translate normalized values into S/4HANA-ready structures for modules including MM, SD, IM, LE, and FI, with support for custom field extensions.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Code conversion to SAP master references</li><li>UOM and currency policy alignment</li><li>Tax and posting-date normalization</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 4: Controlled Integration</h3><p className="mt-3 text-slate-600">Deliver via APIs, IDoc, or approved file-based channels depending on S/4HANA deployment and workload profile.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Cloud and on-premise delivery paths</li><li>Retry and error-log controls</li><li>Lineage from source to SAP document</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 5: Data Quality Monitoring</h3><p className="mt-3 text-slate-600">Continuously monitor extraction accuracy, posting success, and exception patterns with scorecards for ongoing improvement.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Quality KPI dashboards</li><li>Alerting on failure thresholds</li><li>Feedback loops for rule refinement</li></ul></article></div></section>

        <section className="space-y-6"><h2 className="text-3xl font-bold">S/4HANA Module Coverage and Mapping Tables</h2><h3 className="text-xl font-semibold">Module and Process Coverage</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Module</th><th className="px-4 py-3">Typical Process</th><th className="px-4 py-3">Input Sources</th><th className="px-4 py-3">Output Target</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">MM</td><td className="px-4 py-3">Goods receipt and invoice verification</td><td className="px-4 py-3">Supplier docs, freight bills</td><td className="px-4 py-3">MIGO/MIRO-ready payloads</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">SD</td><td className="px-4 py-3">Order, delivery, billing support</td><td className="px-4 py-3">Customer orders, ASN records</td><td className="px-4 py-3">Sales and delivery posting data</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">IM/LE</td><td className="px-4 py-3">Movement and shipment events</td><td className="px-4 py-3">Warehouse and transport docs</td><td className="px-4 py-3">Movement-type and shipment records</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">FI</td><td className="px-4 py-3">Vendor invoices and accrual support</td><td className="px-4 py-3">Commercial and freight cost records</td><td className="px-4 py-3">GL-ready financial postings</td></tr></tbody></table></div><h3 className="text-xl font-semibold">Core Field Normalization Table</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Source Element</th><th className="px-4 py-3">S/4HANA Field Group</th><th className="px-4 py-3">Rule</th><th className="px-4 py-3">Failure Handling</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">Material/SKU</td><td className="px-4 py-3">Material master refs</td><td className="px-4 py-3">Must resolve to active SAP material</td><td className="px-4 py-3">Hold and route to master-data queue</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Vendor Identifier</td><td className="px-4 py-3">Vendor/business partner</td><td className="px-4 py-3">Valid and posting-enabled vendor</td><td className="px-4 py-3">Fallback mapping or reject</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Quantity/UOM</td><td className="px-4 py-3">Movement quantity fields</td><td className="px-4 py-3">UOM conversion must be defined</td><td className="px-4 py-3">Exception for manual conversion</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Amount/Currency</td><td className="px-4 py-3">Financial value fields</td><td className="px-4 py-3">Policy-aligned FX conversion</td><td className="px-4 py-3">Route to finance review queue</td></tr></tbody></table></div></section>

        <section className="space-y-6"><h2 className="text-3xl font-bold">Migration, Cutover, and SLA</h2><p className="text-slate-600">Support includes brownfield and greenfield data preparation with controlled cutover validation. Teams can run pre-cutover quality checks, day-one posting monitoring, and post-go-live reconciliation from the same control framework.</p><div className="grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Migration Support</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>Historical data cleansing and deduplication</li><li>Legacy-to-S/4HANA mapping and validation</li><li>Cutover-day readiness checks</li></ul></div><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Operational Targets</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>Structured sources processed in minutes</li><li>High-volume batch ingestion for migrations</li><li>Posting success and completeness monitoring</li></ul></div></div></section>
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

