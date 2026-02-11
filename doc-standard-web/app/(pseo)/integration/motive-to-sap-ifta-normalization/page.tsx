import type { Metadata } from "next"
import Link from "next/link"
import { IntegrationDiagram } from "@/components/diagrams/IntegrationDiagram"

export const metadata: Metadata = {
  title: "Motive to SAP IFTA Normalization | Fleet Data Bridge | DocStandard",
  description:
    "Transform Motive fleet telematics into SAP-compliant IFTA records with jurisdiction mapping, fuel matching, and audit-ready quarterly outputs.",
}

export default function MotiveToSapIftaPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Integration Deep Dive</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Motive to SAP IFTA Normalization | Fleet Data Bridge | DocStandard
          </h1>
          <p className="max-w-3xl text-lg text-white/80">
            Transform Motive fleet telematics data into SAP-compliant IFTA fuel tax records. Fleet
            operators using Motive for ELD and SAP for ERP need quarterly outputs that stand up to
            audit scrutiny. DocStandard bridges raw GPS and fuel signals into structured,
            jurisdiction-level tax records with reconciled miles, gallons, and posting references.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Start IFTA Normalization
            </Link>
            <Link href="/integration" className="inline-flex items-center text-white/90 hover:underline">
              View all integrations
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-14 px-6 py-14">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Why IFTA Data Integration Fails</h2>
          <p className="text-lg text-slate-600">
            IFTA compliance is not a simple export problem. Motive captures GPS-driven activity,
            driver status transitions, and odometer signals. SAP requires reporting-period tax
            records grouped by jurisdiction with clean calculation lineage. The break between those
            two systems creates most compliance risk.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Jurisdiction Boundary Ambiguity</h3>
              <p className="text-slate-600">
                GPS points do not automatically become tax jurisdiction miles. Border corridors,
                short detours, and toll-road crossings can shift allocation between states and
                provinces. Manual boundary interpretation creates underpayment or overpayment risk.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Fuel Purchase Timing Mismatches</h3>
              <p className="text-slate-600">
                Fuel card authorization, settlement timestamp, and ELD location traces can disagree.
                Without time-window matching and location tolerance, gallons are assigned to the
                wrong vehicle or period and quarter-end returns fail validation.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Distance Categorization Gaps</h3>
              <p className="text-slate-600">
                IFTA taxable miles are not identical to total GPS miles. Yard moves, personal
                conveyance, and exception events need separate treatment. If these categories are
                blended, taxable-mile and MPG calculations become unreliable.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Quarterly Reporting Crunch</h3>
              <p className="text-slate-600">
                Most teams compress several weeks of matching and spreadsheet cleanup into the final
                days before filing windows. That creates rushed overrides and weak audit narratives
                when regulators ask for source-level evidence.
              </p>
            </article>
          </div>
          <blockquote className="border-l-4 border-slate-300 bg-slate-50 px-6 py-4 italic text-slate-700">
            &quot;30% of fleet IFTA audits reveal discrepancies in distance or fuel records.&quot; - FleetOwner
            Industry Report
          </blockquote>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Motive-to-SAP IFTA Processing Pipeline</h2>
          <p className="text-lg text-slate-600">
            The pipeline below converts telematics events into SAP-ready tax posting data while
            preserving field-level traceability.
          </p>

          <IntegrationDiagram
            sourceSystem="Motive ELD"
            targetSystem="SAP FI/AA"
            vertical="compliance"
            fields={["Miles", "Gallons", "Jurisdiction"]}
            className="mx-auto w-full max-w-4xl"
          />

          <div className="grid gap-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 1: Motive Data Ingestion</h3>
              <p className="mt-3 text-slate-600">
                Data is collected through Motive API export or controlled batch file delivery. Inputs
                include GPS history, VIN and unit references, driver assignment events, odometer
                values, and geofence entry/exit data.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>API target: Motive Fleet API v1</li>
                <li>Authentication: OAuth 2.0 delegated fleet credentials</li>
                <li>Formats: JSON API, CSV bulk exports, driver-log PDF support</li>
                <li>Retention window: up to six months of historical telemetry</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 2: Jurisdiction Mapping</h3>
              <p className="mt-3 text-slate-600">
                Coordinate points are resolved to IFTA jurisdictions using boundary datasets and
                routing logic. Border-zone edge cases are handled with deterministic tie-break rules
                to avoid random mile assignment behavior.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>Geocoding: reverse map to two-character jurisdiction codes</li>
                <li>Precision goal: plus/minus 50 meters</li>
                <li>Boundary refresh: quarterly, aligned to IFTA updates</li>
                <li>Exception rules: reservation/federal corridor handling where applicable</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 3: Fuel Purchase Matching</h3>
              <p className="mt-3 text-slate-600">
                Fuel card records are reconciled to nearby vehicle telemetry events. Matching uses
                timestamp windows, station proximity, and vehicle constraints before gallons are
                accepted as tax-period fuel input.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>Supported cards: WEX, FleetCor, Comdata, EFS, TCH</li>
                <li>Auto-match confidence threshold: 85%</li>
                <li>Time matching: default 15-minute tolerance</li>
                <li>Location matching: default one-mile station radius</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 4: Distance Calculation and Categorization</h3>
              <p className="mt-3 text-slate-600">
                Mileage is split by jurisdiction and categorized into taxable and exempt buckets.
                Odometer and GPS-derived totals are cross-validated, then normalized for period-based
                reporting outputs with stable rounding behavior.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>Distance standard: shortest practical route for IFTA treatment</li>
                <li>Rounding: 0.1-mile precision</li>
                <li>Validation: GPS vs engine odometer delta checks</li>
                <li>Computed metric: jurisdiction-level MPG and tax basis</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 5: SAP Delivery</h3>
              <p className="mt-3 text-slate-600">
                Normalized output is delivered as SAP-consumable records for FI and asset-linked
                reporting contexts. Posting payloads include period tags, jurisdiction references,
                and source pointers for audit re-trace.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                <li>Primary targets: SAP FI and Asset Accounting references</li>
                <li>Delivery methods: IDoc, RFC feed, controlled CSV fallback</li>
                <li>Batch options: real-time callback or scheduled period loads</li>
                <li>Audit trail: source event IDs preserved on output lines</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Motive-to-SAP IFTA Field Mapping</h2>
          <p className="text-lg text-slate-600">
            Field-level mappings below are the core controls that make quarterly returns consistent
            and defensible.
          </p>

          <h3 className="text-xl font-semibold">Motive Source Fields</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">JSON Path</th>
                  <th className="px-4 py-3">Example</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Vehicle ID</td><td className="px-4 py-3">vehicle.id</td><td className="px-4 py-3">VH_12345</td><td className="px-4 py-3">Motive vehicle identifier</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">VIN</td><td className="px-4 py-3">vehicle.vin</td><td className="px-4 py-3">1HGBH41JXMN109186</td><td className="px-4 py-3">Vehicle identification number</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Timestamp</td><td className="px-4 py-3">gps.timestamp</td><td className="px-4 py-3">2026-02-11T14:30:00Z</td><td className="px-4 py-3">UTC event time</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Coordinates</td><td className="px-4 py-3">gps.latitude / gps.longitude</td><td className="px-4 py-3">34.0522 / -118.2437</td><td className="px-4 py-3">Jurisdiction mapping inputs</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Odometer</td><td className="px-4 py-3">vehicle.odometer</td><td className="px-4 py-3">124567.3</td><td className="px-4 py-3">Engine odometer miles</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Duty Status</td><td className="px-4 py-3">driver.duty_status</td><td className="px-4 py-3">D</td><td className="px-4 py-3">Context for taxable/exempt rules</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">SAP Target Fields (IFTA)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">SAP Field</th>
                  <th className="px-4 py-3">Example</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Jurisdiction Code</td><td className="px-4 py-3">IFTA_JURIS</td><td className="px-4 py-3">CA</td><td className="px-4 py-3">IFTA jurisdiction tag</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Taxable Miles</td><td className="px-4 py-3">IFTA_MILES</td><td className="px-4 py-3">1250.5</td><td className="px-4 py-3">Distance by jurisdiction</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Fuel Gallons</td><td className="px-4 py-3">IFTA_GALLONS</td><td className="px-4 py-3">187.3</td><td className="px-4 py-3">Fuel basis for tax</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Tax Rate</td><td className="px-4 py-3">IFTA_RATE</td><td className="px-4 py-3">0.529</td><td className="px-4 py-3">Per-gallon jurisdiction rate</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Tax Due</td><td className="px-4 py-3">IFTA_TAX</td><td className="px-4 py-3">99.08</td><td className="px-4 py-3">Calculated liability</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Quarter</td><td className="px-4 py-3">IFTA_QUARTER</td><td className="px-4 py-3">2026Q1</td><td className="px-4 py-3">Reporting period key</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Fuel Card Match Fields</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Example</th>
                  <th className="px-4 py-3">Match Key</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Transaction ID</td><td className="px-4 py-3">Fuel card</td><td className="px-4 py-3">TXN_123456</td><td className="px-4 py-3">Primary key</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Fuel Date/Time</td><td className="px-4 py-3">Card settlement</td><td className="px-4 py-3">2026-02-11 14:35:00</td><td className="px-4 py-3">GPS time window</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Station Location</td><td className="px-4 py-3">Merchant data</td><td className="px-4 py-3">Phoenix, AZ</td><td className="px-4 py-3">Proximity check</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">Gallons</td><td className="px-4 py-3">Fuel card</td><td className="px-4 py-3">95.2</td><td className="px-4 py-3">IFTA gallon input</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">IFTA Jurisdiction and Compliance Coverage</h2>
          <p className="text-slate-600">
            Coverage includes all base IFTA jurisdictions in the contiguous United States and ten
            Canadian provinces, with special handling for weight-distance and related jurisdictional
            variants where required.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold">Core Coverage</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                <li>48 contiguous U.S. states in IFTA scope</li>
                <li>AB, BC, MB, NB, NL, NS, ON, PE, QC, SK</li>
                <li>Quarterly rate updates: Jan 1, Apr 1, Jul 1, Oct 1</li>
                <li>Historical source retention aligned to 4-year audit requirement</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold">Special Jurisdiction Logic</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-600">
                <li>Oregon weight-mile treatment paths</li>
                <li>Kentucky weight-distance handling</li>
                <li>New Mexico permit-related data support</li>
                <li>New York HUT supporting output references</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">SLA and Delivery</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Quarterly Standard</h3>
              <ul className="space-y-1 text-slate-600">
                <li>Processing window: 5-7 business days before due date</li>
                <li>Output: SAP-ready IFTA return package</li>
                <li>Due cadence: Jan 31, Apr 30, Jul 31, Oct 31</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Monthly Add-on</h3>
              <ul className="space-y-1 text-slate-600">
                <li>Provisional accrual reporting after month close</li>
                <li>Typical delivery within 2 business days</li>
                <li>Helps stabilize quarter-end adjustments</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Quality Guarantees</h3>
              <ul className="space-y-1 text-slate-600">
                <li>Jurisdiction assignment accuracy target: 99.5%</li>
                <li>Fuel auto-match rate target: 95%+</li>
                <li>Formula-validated tax calculations</li>
              </ul>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
