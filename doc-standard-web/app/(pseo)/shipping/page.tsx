import Image from "next/image"
import Link from "next/link"
import { IntegrationDiagram } from "@/components/diagrams/IntegrationDiagram"
import { generateMetadataForVertical } from "@/components/pseo/VerticalHub"

export async function generateMetadata() {
  return generateMetadataForVertical("shipping")
}

export default async function ShippingHubPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/shipping.webp"
            alt="Shipping operations background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Shipping Hub</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Shipping Document Processing | Ocean and Air Freight | DocStandard
          </h1>
          <p className="max-w-3xl text-lg text-white/80">
            Shipping operations run on documents. Bills of lading for ocean freight. Air waybills for
            air cargo. Manifests, arrival notices, release orders, and proof-of-delivery records all
            carry operational data that needs to enter your freight systems accurately and quickly.
            DocStandard extracts, validates, and normalizes shipping data into system-ready JSON,
            XML, CSV, EDI, or direct API payloads so your team can stop rekeying and start working
            from trusted records. Ocean and air workflows are processed separately to reflect their
            distinct legal structures, validation standards, and customs timelines.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Process Shipping Documents -&gt;
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-14 px-6 py-14">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Why Shipping Documents Are Hard to Process</h2>
          <p className="text-lg text-slate-600">
            Ocean carriers issue more than 100 million bills of lading every year. Each BOL is both
            a transport contract and a legal document of title, while still acting as the source for
            dozens of fields required by planning, customs, and finance systems. Air freight has a
            different challenge: faster transit windows, stricter data cutoffs, and IATA format
            requirements that punish even minor errors. The result is a document landscape where
            teams are expected to be both fast and perfect under high operational pressure.
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Master and House BOL Hierarchies</h3>
              <p className="text-slate-600">
                A consolidated shipment can carry one master BOL between carrier and NVOCC plus
                multiple house BOLs between consolidator and underlying shippers. Container details
                may appear at master level while product-level cargo details exist only at house
                level. If those records are not reconciled correctly, customs entry and cost
                allocation become unreliable.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Ocean and Air Data Models Differ</h3>
              <p className="text-slate-600">
                Ocean documents emphasize vessel, voyage, and container controls. Air documents are
                built around AWB references, routing by airport codes, and chargeable-weight billing
                logic. A generic parser cannot handle both modes accurately because field naming,
                structure, and business rules are fundamentally different.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">ISF and AMS Filing Deadlines</h3>
              <p className="text-slate-600">
                For U.S.-bound ocean cargo, ISF (10+2) requires key data elements before loading at
                origin. Missing or incorrect fields can trigger penalties, manual holds, and delayed
                release at destination. Document extraction delays directly reduce the time available
                for correction before filing cutoffs.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Manifest and Contract Mismatch</h3>
              <p className="text-slate-600">
                Carrier manifests, house bills, and shipper paperwork often disagree on names,
                package counts, gross weights, or charges. Teams then spend hours reconciling
                conflicting values under deadline pressure. Late reconciliation creates downstream
                customs amendments, payment disputes, and avoidable exception handling.
              </p>
            </div>
          </div>

          <blockquote className="border-l-4 border-slate-300 bg-slate-50 px-6 py-4 text-slate-700 italic">
            &quot;30% of customs delays are caused by document errors or missing data.&quot; - World Customs
            Organization
          </blockquote>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Ocean Bill of Lading Processing</h2>
          <p className="text-lg text-slate-600">
            Ocean freight moves most global trade volume, and every containerized movement is tied to
            a document chain that must stay consistent from origin to destination. DocStandard
            processes the full ocean stack: bookings, BOLs, manifests, release orders, arrival
            notices, and POD records. We preserve legal distinctions such as straight BOL vs order
            BOL, support telex-release and sea-waybill scenarios, and maintain master/house lineage
            so downstream systems can match charge, cargo, and routing data with confidence.
          </p>

          <IntegrationDiagram
            sourceSystem="Carrier Bill of Lading"
            targetSystem="Your TMS"
            vertical="shipping"
            fields={["Container", "Cargo", "Charges"]}
            className="mx-auto w-full max-w-4xl"
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Ocean Document Types We Process</h3>
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>Straight BOL, order BOL, surrendered BOL (telex release), and sea waybill.</li>
              <li>Container manifest, cargo manifest, and house manifest for LCL consolidations.</li>
              <li>Booking confirmations, delivery orders, arrival notices, and release instructions.</li>
              <li>Container release orders and proof-of-delivery documents from destination handoff.</li>
            </ul>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Field Category</th>
                  <th className="px-4 py-3">Key Extracted Fields</th>
                  <th className="px-4 py-3">Operational Purpose</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Shipment IDs</td>
                  <td className="px-4 py-3">bol_number, booking_reference, forwarder_reference</td>
                  <td className="px-4 py-3">Cross-system matching and status tracking</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Parties</td>
                  <td className="px-4 py-3">shipper, consignee, notify_party, nvocc</td>
                  <td className="px-4 py-3">Routing notifications and billing responsibility</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Vessel and Voyage</td>
                  <td className="px-4 py-3">vessel_name, voyage_number, service_string</td>
                  <td className="px-4 py-3">ETA modeling and transit event correlation</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Routing</td>
                  <td className="px-4 py-3">pol, pod, final_destination, transshipment_ports</td>
                  <td className="px-4 py-3">Customs planning and inland handoff coordination</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Equipment and Security</td>
                  <td className="px-4 py-3">containers[].number, containers[].type, seal_number</td>
                  <td className="px-4 py-3">Gate release, yard planning, and tamper checks</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Measurements and Charges</td>
                  <td className="px-4 py-3">gross_weight, volume_cbm, freight_terms, charge_lines</td>
                  <td className="px-4 py-3">Freight audit, accruals, and dispute prevention</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">ISO 6346 Container Number Validation</h3>
              <p className="text-slate-600">
                Container numbers are validated against the ISO 6346 structure (owner code, equipment
                category, serial number, check digit). Invalid check digits are flagged before export
                so bad references do not pollute TMS milestones or customs filings.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Seal Number and Multi-Currency Capture</h3>
              <p className="text-slate-600">
                Seal numbers are extracted and matched across BOL and delivery records for chain of
                custody checks. Ocean charge lines are captured with native currency and standardized
                currency codes to support accurate AP coding, re-rating, and exception reporting.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Air Waybill and Air Cargo Processing</h2>
          <p className="text-lg text-slate-600">
            Air freight introduces tighter clocks and strict format controls. MAWB and HAWB records
            must stay synchronized while flight updates, handling codes, and chargeable weight values
            move rapidly across systems. DocStandard extracts air-cargo fields using IATA-aware rules,
            validates AWB structures, normalizes airport routing data, and delivers cleaned records to
            your operations stack in near real time.
          </p>

          <IntegrationDiagram
            sourceSystem="Air Waybill"
            targetSystem="Your TMS"
            vertical="shipping"
            fields={["Flight", "Cargo", "Charges"]}
            className="mx-auto w-full max-w-4xl"
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Air Document Types We Process</h3>
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>Master AWB (MAWB), House AWB (HAWB), and neutral AWB variants.</li>
              <li>Flight manifests, booking confirmations, and arrival release instructions.</li>
              <li>Delivery orders and proof-of-delivery handoff records.</li>
              <li>Airline charge documents and supplementary handling instructions.</li>
            </ul>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Field Category</th>
                  <th className="px-4 py-3">Key Extracted Fields</th>
                  <th className="px-4 py-3">Operational Purpose</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Shipment IDs</td>
                  <td className="px-4 py-3">awb_number, hawb_reference, booking_reference</td>
                  <td className="px-4 py-3">IATA-aligned shipment traceability</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Flight and Route</td>
                  <td className="px-4 py-3">flight_number, flight_date, origin, destination, via</td>
                  <td className="px-4 py-3">ETA forecasting and disruption response</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Cargo Details</td>
                  <td className="px-4 py-3">pieces, dimensions, commodity_code, handling_code</td>
                  <td className="px-4 py-3">Capacity planning and special handling control</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Weight and Rating</td>
                  <td className="px-4 py-3">gross_weight, volumetric_weight, chargeable_weight</td>
                  <td className="px-4 py-3">Airline rate verification and cost reconciliation</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Charges</td>
                  <td className="px-4 py-3">weight_charge, valuation_charge, other_charges</td>
                  <td className="px-4 py-3">AP coding and invoice dispute prevention</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">AWB Format and Check-Digit Validation</h3>
              <p className="text-slate-600">
                AWB numbers are validated against the 11-digit structure: 3-digit airline prefix,
                7-digit serial, and 1-digit mod-7 check digit. Prefixes are verified against airline
                code references so incorrect or mistyped numbers are blocked early.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Chargeable-Weight Verification</h3>
              <p className="text-slate-600">
                Air charges are based on whichever is greater: actual gross weight or volumetric
                weight. We extract dimensions and declared factors, then calculate chargeable weight
                for each line so finance and operations can validate airline billing outcomes.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Shipping Integrations, ISF, and AES Support</h2>
          <p className="text-lg text-slate-600">
            Clean document data only matters when it reaches the systems your team already relies on.
            DocStandard integrates with major freight platforms and supports regulatory data
            preparation for U.S. import/export workflows.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Freight Platforms</h3>
              <ul className="space-y-2 text-slate-600">
                <li>CargoWise eHub and shipment interfaces</li>
                <li>SAP TM via API, BAPI, or file exchange</li>
                <li>Oracle OTM web services and event updates</li>
                <li>Magaya, NetFreight, and ProFreight adapters</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Carrier and Industry Connections</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Ocean carriers including Maersk, MSC, and CMA CGM</li>
                <li>Airline feeds aligned with IATA ONE Record direction</li>
                <li>Cargospot and cargo community system compatibility</li>
                <li>Webhook and scheduled SFTP delivery options</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Delivery Formats</h3>
              <ul className="space-y-2 text-slate-600">
                <li>JSON with nested hierarchy</li>
                <li>XML and mode-specific schemas</li>
                <li>CSV for legacy imports</li>
                <li>EDI X12 and EDIFACT message support</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">ISF (10+2) Data Preparation</h3>
              <p className="mb-3 text-slate-600">
                We pre-populate the importer data elements required for ISF workflows, including:
              </p>
              <ol className="list-decimal space-y-1 pl-5 text-slate-600">
                <li>Manufacturer or supplier details</li>
                <li>Seller information</li>
                <li>Buyer information</li>
                <li>Ship-to party details</li>
                <li>Container stuffing location</li>
                <li>Consolidator details</li>
                <li>Importer of record number</li>
                <li>Consignee number</li>
                <li>Country of origin</li>
                <li>HTS commodity classification</li>
              </ol>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">AES Export Filing Readiness</h3>
              <p className="text-slate-600">
                For export workflows we prepare core AES inputs such as USPPI identity, ultimate
                consignee details, commodity references, and supporting values used for licensing or
                ECCN classification checks. This reduces manual prep effort and shortens export
                declaration lead times.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Shipping Document Processing Times and Quality</h2>
          <p className="text-lg text-slate-600">
            Shipping teams need predictable service levels that map to vessel cutoffs, flight windows,
            and customs filing deadlines. Our SLA model separates ocean, air, and high-volume
            manifest workloads so expectations stay clear.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Standard Processing</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Ocean BOL: 12-24 hours with container validation</li>
                <li>Air waybill: 6-12 hours for structured AWB formats</li>
                <li>Manifest sets: 24-48 hours based on quality</li>
                <li>Throughput: up to 500 shipping documents per business day</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Expedited Processing</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Turnaround: 4-8 hours for priority batches</li>
                <li>Availability: 24/7 for critical freight scenarios</li>
                <li>Pricing: 75% surcharge on baseline rates</li>
                <li>Dedicated queue for recurring urgent customers</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">Accuracy and Validation</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Typed shipping documents: 99.5% field-level accuracy</li>
                <li>Handwritten annotations: 95% target, review below 90%</li>
                <li>Container and AWB references: 99.9% with check digits</li>
                <li>Confidence scoring with human verification fallback</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 font-semibold">Output and Audit Controls</h3>
            <p className="text-slate-600">
              Delivery supports real-time webhook pushes, scheduled batch windows, and API pull
              retrieval for downstream systems. Every output includes extraction confidence,
              transformation traceability, and reprocessing support at no charge when a platform-side
              issue is not the cause.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Related Services</h2>
          <p className="text-lg text-slate-600">
            Shipping documents connect directly to logistics execution, customs entries, compliance
            controls, and freight finance. Use these pages to go deeper into adjacent workflows.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/logistics" className="font-semibold text-blue-600 hover:underline">
              Comprehensive logistics document processing across modes
            </Link>
            <Link href="/customs" className="font-semibold text-blue-600 hover:underline">
              Shipping documents form the basis of customs entries
            </Link>
            <Link href="/finance" className="font-semibold text-blue-600 hover:underline">
              Freight billing and shipping cost management
            </Link>
            <Link href="/compliance" className="font-semibold text-blue-600 hover:underline">
              Regulatory compliance for international shipping
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
