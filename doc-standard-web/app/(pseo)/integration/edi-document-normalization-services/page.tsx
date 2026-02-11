import type { Metadata } from "next"
import Link from "next/link"
import { IntegrationDiagram } from "@/components/diagrams/IntegrationDiagram"

export const metadata: Metadata = {
  title: "EDI Document Normalization Services | Electronic Data Interchange | DocStandard",
  description:
    "Convert PDFs, emails, portal exports, and API payloads into standards-compliant X12, EDIFACT, and related EDI transaction formats.",
}

export default function EdiDocumentNormalizationServicesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden px-6 py-20"><div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" /><div className="relative z-10 mx-auto max-w-5xl"><p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Integration Deep Dive</p><h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">EDI Document Normalization Services | Electronic Data Interchange | DocStandard</h1><p className="max-w-3xl text-lg text-white/80">Normalize non-EDI documents into production-grade EDI transactions so teams can maintain one integration backbone while supporting diverse trading partner maturity levels. DocStandard bridges PDFs, emails, API payloads, and spreadsheets into validated X12 and EDIFACT outputs.</p><div className="mt-8 flex flex-wrap gap-4"><Link href="/login" className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100">Start EDI Normalization</Link><Link href="/integration" className="inline-flex items-center text-white/90 hover:underline">View all integrations</Link></div></div></section>

      <section className="mx-auto max-w-5xl space-y-14 px-6 py-14">
        <section className="space-y-6"><h2 className="text-3xl font-bold">Why EDI Workflows Break at Document Boundaries</h2><p className="text-lg text-slate-600">Enterprise systems may support EDI natively, but partner ecosystems are mixed. Some suppliers send PDFs, some portals expose CSV exports, and some carriers provide APIs with custom schemas. Without normalization, teams maintain parallel manual workflows that fragment control and increase error rates.</p><div className="grid gap-6 md:grid-cols-2"><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Partner Onboarding Friction</h3><p className="text-slate-600">Requiring full EDI capability from every partner slows onboarding and limits supplier flexibility.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Format Diversity</h3><p className="text-slate-600">Organizations often support enterprise EDI plus portal, email, and API channels simultaneously, creating duplicate process logic.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Carrier API Sprawl</h3><p className="text-slate-600">Carrier-specific authentication and schema variance makes one-off integrations expensive to build and maintain.</p></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-2 text-lg font-semibold">Legacy Document Persistence</h3><p className="text-slate-600">Paper scans and unstructured attachments remain common, especially in long-tail partner segments.</p></article></div></section>

        <section className="space-y-8"><h2 className="text-3xl font-bold">Document-to-EDI Normalization Pipeline</h2><IntegrationDiagram sourceSystem="Non-EDI Sources" targetSystem="EDI Backbone" vertical="compliance" fields={["Extract", "Validate", "Transform"]} className="mx-auto w-full max-w-4xl" /><div className="grid gap-6"><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 1: Multi-channel Ingestion</h3><p className="mt-3 text-slate-600">Accept source data from PDF, email, web portals, APIs, EDI-adjacent XML, and spreadsheet uploads through secure intake channels.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Attachment capture and metadata extraction</li><li>Polling and webhook modes</li><li>Batch and real-time ingestion profiles</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 2: Document Classification</h3><p className="mt-3 text-slate-600">Classify document type and trading partner context before transformation, using deterministic rules and machine-assisted patterns.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Invoice, PO, ASN, BOL, status notices</li><li>Partner-specific template routing</li><li>Exception handling for unknown layouts</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 3: Field Extraction and Validation</h3><p className="mt-3 text-slate-600">Extract identifiers, dates, line items, quantities, and value fields; validate against business rules and master references.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>Confidence scoring per field</li><li>Cross-reference checks against ERP/TMS IDs</li><li>Low-confidence review queue</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 4: EDI Generation</h3><p className="mt-3 text-slate-600">Transform validated fields into target EDI transactions, including X12 and EDIFACT envelope requirements and segment-level constraints.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>X12 transaction set support (204/210/214/810/850/856 and more)</li><li>EDIFACT message support (ORDERS, DESADV, INVOIC, IFTSTA)</li><li>Schema and syntax validation before delivery</li></ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">Stage 5: Delivery and Acknowledgment</h3><p className="mt-3 text-slate-600">Deliver through VAN, AS2, SFTP, or API endpoints and capture functional acknowledgments for operational monitoring.</p><ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600"><li>997/CONTRL acknowledgment tracking</li><li>Retry with backoff on failures</li><li>Audit trail and replay support</li></ul></article></div></section>

        <section className="space-y-6"><h2 className="text-3xl font-bold">Transaction Set and Field Mapping Coverage</h2><h3 className="text-xl font-semibold">X12 Transaction Sets</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Code</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Direction</th><th className="px-4 py-3">Use Case</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">204</td><td className="px-4 py-3">Load Tender</td><td className="px-4 py-3">Outbound</td><td className="px-4 py-3">Tender to carrier</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">210</td><td className="px-4 py-3">Freight Invoice</td><td className="px-4 py-3">Inbound</td><td className="px-4 py-3">Carrier billing</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">214</td><td className="px-4 py-3">Shipment Status</td><td className="px-4 py-3">Inbound</td><td className="px-4 py-3">Transit events</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">810</td><td className="px-4 py-3">Invoice</td><td className="px-4 py-3">Both</td><td className="px-4 py-3">Billing exchange</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">850</td><td className="px-4 py-3">Purchase Order</td><td className="px-4 py-3">Both</td><td className="px-4 py-3">Order placement</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">856</td><td className="px-4 py-3">ASN</td><td className="px-4 py-3">Outbound</td><td className="px-4 py-3">Ship notice</td></tr></tbody></table></div><h3 className="text-xl font-semibold">EDIFACT Messages</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Message</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Direction</th><th className="px-4 py-3">Use Case</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">ORDERS</td><td className="px-4 py-3">Purchase Order</td><td className="px-4 py-3">Both</td><td className="px-4 py-3">Order transmission</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">DESADV</td><td className="px-4 py-3">Dispatch Advice</td><td className="px-4 py-3">Outbound</td><td className="px-4 py-3">ASN equivalent</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">INVOIC</td><td className="px-4 py-3">Invoice</td><td className="px-4 py-3">Both</td><td className="px-4 py-3">Commercial billing</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">IFTSTA</td><td className="px-4 py-3">Status</td><td className="px-4 py-3">Inbound</td><td className="px-4 py-3">Transport status updates</td></tr></tbody></table></div><h3 className="text-xl font-semibold">Normalization Field Control Table</h3><div className="overflow-x-auto"><table className="w-full border border-slate-200 text-left"><thead className="bg-slate-50 text-sm text-slate-600"><tr><th className="px-4 py-3">Source Element</th><th className="px-4 py-3">Target EDI Segment</th><th className="px-4 py-3">Validation Rule</th><th className="px-4 py-3">Failure Action</th></tr></thead><tbody className="text-sm text-slate-700"><tr className="border-t border-slate-200"><td className="px-4 py-3">PO Number</td><td className="px-4 py-3">BEG03 / BGM</td><td className="px-4 py-3">Required non-empty</td><td className="px-4 py-3">Hold and notify</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Line Quantity</td><td className="px-4 py-3">PO1/QTY</td><td className="px-4 py-3">Positive numeric</td><td className="px-4 py-3">Reject line and queue</td></tr><tr className="border-t border-slate-200"><td className="px-4 py-3">Invoice Amount</td><td className="px-4 py-3">TDS/MOA</td><td className="px-4 py-3">Header-line sum consistency</td><td className="px-4 py-3">Variance exception</td></tr></tbody></table></div></section>

        <section className="space-y-6"><h2 className="text-3xl font-bold">Onboarding Model, SLA, and Monitoring</h2><p className="text-slate-600">Typical onboarding includes sample capture, mapping design, validation testing, and controlled go-live. Processing supports real-time API-to-EDI conversion and scheduled document batches with centralized dashboard visibility for success rates, exceptions, and acknowledgments.</p><div className="grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Timing Targets</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>API to EDI: minutes</li><li>Email/PDF to EDI: minutes to sub-hour</li><li>Partner onboarding: days to low weeks</li></ul></div><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-3 font-semibold">Quality Targets</h3><ul className="list-disc space-y-1 pl-5 text-slate-600"><li>Syntax-validated EDI outputs</li><li>High extraction accuracy on clean documents</li><li>End-to-end audit and replay trail</li></ul></div></div></section>
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

