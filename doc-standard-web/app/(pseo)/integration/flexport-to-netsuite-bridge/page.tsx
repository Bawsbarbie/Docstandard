import type { Metadata } from "next"
import Link from "next/link"
import { IntegrationDiagram } from "@/components/diagrams/IntegrationDiagram"

export const metadata: Metadata = {
  title: "Flexport to NetSuite Bridge | Freight Data Integration | DocStandard",
  description:
    "Connect Flexport shipment and document data to NetSuite item receipts, landed costs, and AP workflows with normalized mappings.",
}

export default function FlexportToNetSuiteBridgePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Integration Deep Dive</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Flexport to NetSuite Bridge | Freight Data Integration | DocStandard
          </h1>
          <p className="max-w-3xl text-lg text-white/80">
            Flexport provides rich, API-first freight data. NetSuite requires precise record
            structures for receipts, bills, and landed cost accounting. DocStandard bridges those
            models so shipment events, commercial documents, and charge data flow into NetSuite
            without manual CSV rework.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Start Flexport-to-NetSuite Bridge
            </Link>
            <Link href="/integration" className="inline-flex items-center text-white/90 hover:underline">
              View all integrations
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-14 px-6 py-14">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Why Modern Freight Data Stalls in ERP</h2>
          <p className="text-lg text-slate-600">
            Even when both platforms expose APIs, the record design and business semantics still need
            transformation. Flexport ships nested JSON entities, while NetSuite posting flows demand
            record-level controls, internal IDs, and accounting dimensions.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">JSON-to-Record Transformation</h3>
              <p className="text-slate-600">
                Flexport shipment payloads carry nested containers, legs, costs, and documents.
                NetSuite expects bounded record schemas for item receipts and bills with exact field
                IDs and relationship constraints.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Landed Cost Allocation</h3>
              <p className="text-slate-600">
                Freight, duties, insurance, and handling must be assigned to correct landed cost
                categories. Weak allocations distort inventory valuation and downstream COGS.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Document-to-Data Gap</h3>
              <p className="text-slate-600">
                Digital document links are useful, but NetSuite still needs structured line-level
                fields to create records. Manual keying creates mismatch risk on SKU quantities and
                declared values.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Real-time vs Batch Tension</h3>
              <p className="text-slate-600">
                Flexport emits event updates continuously, while finance posting often follows hourly
                or daily controls. Integration needs both low-latency event capture and governed
                posting windows.
              </p>
            </article>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Flexport-to-NetSuite Data Bridge Pipeline</h2>
          <IntegrationDiagram
            sourceSystem="Flexport"
            targetSystem="NetSuite"
            vertical="finance"
            fields={["Shipments", "Landed Costs", "Invoices"]}
            className="mx-auto w-full max-w-4xl"
          />

          <div className="grid gap-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 1: Flexport API Ingestion</h3>
              <p className="mt-3 text-slate-600">
                Collect shipments, invoice data, tracking milestones, and document references through
                Flexport API and webhook channels.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>API family: Flexport REST v2</li>
                <li>Endpoints: shipments, invoices, documents, tracking</li>
                <li>Auth: OAuth 2.0 client credentials and token rotation</li>
                <li>Rate management: request throttling and retry backoff</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 2: Document Processing</h3>
              <p className="mt-3 text-slate-600">
                Parse commercial invoices, packing lists, and BOL records into structured fields with
                confidence scoring and review controls for low-certainty items.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>Extract supplier, SKU, quantity, amount, and currency fields</li>
                <li>Preserve source document links for review and audit context</li>
                <li>Route uncertain fields to human verification queue</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 3: Landed Cost Calculation</h3>
              <p className="mt-3 text-slate-600">
                Normalize charges into landed cost components aligned to NetSuite cost categories and
                allocation policies.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>Allocation strategies: value, weight, volume, or quantity</li>
                <li>Multi-currency support: with policy-based FX conversion</li>
                <li>Duty and tariff treatment for inventory valuation accuracy</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 4: NetSuite Mapping</h3>
              <p className="mt-3 text-slate-600">
                Create item receipts, vendor bills, and journal-ready payloads with correct internal
                IDs, subsidiaries, and accounting dimensions.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>AP bills for supplier payment workflows</li>
                <li>Item receipts with landed cost sublist population</li>
                <li>Custom records for shipment milestone traceability</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 5: Reconciliation and Matching</h3>
              <p className="mt-3 text-slate-600">
                Run three-way match logic between PO, receipt, and invoice while calculating variance
                postings where estimated and final costs diverge.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>Tolerance control by percent and absolute amount</li>
                <li>Variance journal generation for approved exceptions</li>
                <li>Exception routing to logistics and finance stakeholders</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Flexport-to-NetSuite Field Mapping</h2>
          <h3 className="text-xl font-semibold">Flexport Source Fields</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">API Path</th>
                  <th className="px-4 py-3">Example</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Shipment ID</td><td className="px-4 py-3">id</td><td className="px-4 py-3">shipment_12345</td><td className="px-4 py-3">Primary shipment key</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Mode</td><td className="px-4 py-3">transportation_mode</td><td className="px-4 py-3">ocean</td><td className="px-4 py-3">Route and cost logic driver</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Container Number</td><td className="px-4 py-3">containers[].number</td><td className="px-4 py-3">MSCU1234567</td><td className="px-4 py-3">Receiving and traceability link</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Total Cost</td><td className="px-4 py-3">total_costs.amount</td><td className="px-4 py-3">4500.00</td><td className="px-4 py-3">Header cost signal</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Cargo Value</td><td className="px-4 py-3">cargos[].value.amount</td><td className="px-4 py-3">25000.00</td><td className="px-4 py-3">Landed cost allocation basis</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">HS Code</td><td className="px-4 py-3">cargos[].hs_code</td><td className="px-4 py-3">8471.30.01</td><td className="px-4 py-3">Trade and duty context</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">NetSuite Item Receipt Fields</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">NetSuite ID</th>
                  <th className="px-4 py-3">Example</th>
                  <th className="px-4 py-3">Mapping Logic</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200"><td className="px-4 py-3">External ID</td><td className="px-4 py-3">externalid</td><td className="px-4 py-3">flexport_shipment_12345</td><td className="px-4 py-3">Direct link to upstream shipment</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Created From</td><td className="px-4 py-3">createdfrom</td><td className="px-4 py-3">PO #1234</td><td className="px-4 py-3">PO linkage for three-way match</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Item</td><td className="px-4 py-3">itemreceiptitem.item</td><td className="px-4 py-3">SKU-ABC-123</td><td className="px-4 py-3">Internal ID resolution by SKU map</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Quantity</td><td className="px-4 py-3">itemreceiptitem.quantity</td><td className="px-4 py-3">100</td><td className="px-4 py-3">Validated against open PO quantity</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Amount</td><td className="px-4 py-3">itemreceiptitem.amount</td><td className="px-4 py-3">2500.00</td><td className="px-4 py-3">Extended cost value</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">NetSuite Landed Cost and Bill Fields</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">Target</th>
                  <th className="px-4 py-3">Example</th>
                  <th className="px-4 py-3">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Landed Cost Category</td><td className="px-4 py-3">landedcostcategory</td><td className="px-4 py-3">Freight</td><td className="px-4 py-3">Cost classification</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Landed Cost Amount</td><td className="px-4 py-3">landedcostamount</td><td className="px-4 py-3">1200.00</td><td className="px-4 py-3">Inventory valuation component</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Vendor Bill Number</td><td className="px-4 py-3">tranid</td><td className="px-4 py-3">INV-2026-001234</td><td className="px-4 py-3">AP settlement identifier</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Expense Account</td><td className="px-4 py-3">expenseaccount</td><td className="px-4 py-3">6100 Freight Expense</td><td className="px-4 py-3">GL routing for charges</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Department/Class</td><td className="px-4 py-3">department / class</td><td className="px-4 py-3">Logistics / Ocean Freight</td><td className="px-4 py-3">Management reporting dimensions</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">NetSuite Configuration and SLA</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Setup Requirements</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                <li>Landed Cost and inventory features enabled</li>
                <li>Token-based auth or OAuth for API integration</li>
                <li>Optional custom fields for shipment and invoice IDs</li>
                <li>Saved searches for unmatched or in-transit exceptions</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Processing Targets</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                <li>Webhook update ingestion: 2-5 minutes</li>
                <li>Document extraction: 5-10 minutes per batch</li>
                <li>Hourly sync option and daily reconciliation run</li>
                <li>API success target: 99%+ with retry controls</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Landed Cost Control Framework</h2>
          <p className="text-slate-600">
            Accurate landed cost requires more than moving charge lines. It requires consistent
            allocation behavior by shipment profile, item type, and accounting policy so inventory
            valuation remains stable across periods.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Cost Component</th>
                  <th className="px-4 py-3">Flexport Source</th>
                  <th className="px-4 py-3">NetSuite Category</th>
                  <th className="px-4 py-3">Allocation Rule</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Ocean or Air Freight</td><td className="px-4 py-3">Shipment charges</td><td className="px-4 py-3">Freight-in</td><td className="px-4 py-3">Allocate by item value or weight</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Duties and Tariffs</td><td className="px-4 py-3">Customs invoice lines</td><td className="px-4 py-3">Duty</td><td className="px-4 py-3">Allocate by customs value basis</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Cargo Insurance</td><td className="px-4 py-3">Insurance premiums</td><td className="px-4 py-3">Insurance</td><td className="px-4 py-3">Allocate by insured shipment value</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Handling and Drayage</td><td className="px-4 py-3">Accessorial line items</td><td className="px-4 py-3">Handling</td><td className="px-4 py-3">Allocate by receiving location and quantity</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Documentation Fees</td><td className="px-4 py-3">Broker and processing fees</td><td className="px-4 py-3">Operations expense</td><td className="px-4 py-3">Route to expense accounts by policy</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Reconciliation Rules and Exception Handling</h2>
          <p className="text-slate-600">
            The bridge supports event-driven updates and scheduled reconciliation cycles so finance
            teams can close books without sacrificing operational visibility. Exceptions are not only
            flagged but categorized by root cause to speed resolution.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Primary Match Rules</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                <li>PO line must exist for each received item line</li>
                <li>SKU internal ID resolution required before post</li>
                <li>Invoice totals must match summed mapped charge lines</li>
                <li>Currency and FX source must be present and valid</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Exception Categories</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                <li>Reference mismatch: missing PO, item, or vendor mappings</li>
                <li>Valuation mismatch: landed cost variance above threshold</li>
                <li>Timing mismatch: event order conflicts between platforms</li>
                <li>Schema mismatch: required NetSuite fields not provided</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-600">
            Every exception retains a payload snapshot and transformation log so analysts can replay
            the exact decision path and correct the minimum required field. This reduces rework and
            prevents repeated manual interventions on recurring scenarios.
          </p>
        </section>
      </section>
    </main>
  )
}
