import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import SVGDiagram from "@/components/diagrams/SVGDiagramGenerator"

export const metadata: Metadata = {
  title: "Logistics Document Processing Hub | DocStandard",
  description:
    "Transform logistics documents into clean, structured data for your TMS and ERP. Bills of lading, packing lists, delivery receipts, and PODs normalized fast.",
}

export default async function LogisticsHubPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/logistics.webp"
            alt="Logistics operations background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60 mb-4">Logistics Hub</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Logistics Document Processing Hub | DocStandard
          </h1>
          <p className="text-lg text-white/80 max-w-3xl">
            Transform messy logistics documents into clean, structured data your TMS and ERP can
            actually use. Logistics operators drown in paperwork: bills of lading, packing lists,
            delivery receipts, proof of delivery scans, and exception notes. DocStandard automates
            extraction and normalization across those formats, delivering JSON, CSV, or direct API
            feeds to the systems your team already runs. No custom integrations. No implementation
            projects. Just clean data, fast.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/integration"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
            >
              View System Integrations -&gt;
            </Link>
            <Link
              href="#pipeline"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 space-y-14">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Why Logistics Teams Struggle with Document Data</h2>
          <p className="text-lg text-slate-600">
            A single international shipment generates 8-12 distinct documents. Multiply that by
            hundreds of weekly movements, and your operations team is forced to process thousands of
            pages with different layouts, field names, and data structures. The result is a
            high-volume, high-variance workload that overwhelms internal teams, slows clearance, and
            cascades into billing disputes.
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Inconsistent Formats Across Carriers</h3>
              <p className="text-slate-600">
                Every freight forwarder, steamship line, and airline uses its own BOL template. Some
                list container numbers in the header, others bury them in line items. Some use
                &quot;Gross Weight,&quot; others use &quot;Total Weight&quot; or &quot;GW.&quot; Your extraction rules break every
                time a new carrier enters the mix.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Handwritten Amendments and Stamps</h3>
              <p className="text-slate-600">
                The clean PDF from an EDI feed rarely matches paper reality. Dock supervisors add
                handwritten corrections. Customs agents stamp approval codes. These annotations
                contain critical data like voyage changes, seal numbers, or inspection results that
                generic OCR misses.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Multi-Language Documents</h3>
              <p className="text-slate-600">
                A shipment from Shanghai to Rotterdam might include a Chinese packing list, English
                BOL, and Dutch customs declaration. Extracting consistent data across languages
                without losing field-mapping accuracy requires specialized handling.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Time Pressure vs. Accuracy</h3>
              <p className="text-slate-600">
                When a container hits port, you have hours--not days--to file customs entries, arrange
                drayage, and notify consignees. Rushing data entry introduces errors. Waiting for
                accuracy delays clearance. Most teams choose speed and spend weeks reconciling
                billing discrepancies.
              </p>
            </div>
          </div>

          <blockquote className="border-l-4 border-slate-300 bg-slate-50 px-6 py-4 text-slate-700 italic">
            &quot;Logistics teams spend 40% of administrative time on document processing and data
            entry.&quot; -- Transportation Research Board
          </blockquote>
        </div>

        <div id="pipeline" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">The DocStandard Logistics Pipeline</h2>
            <p className="text-lg text-slate-600">
              Our logistics document processing follows a proven five-stage pipeline designed for
              operational environments where accuracy and speed both matter. Each stage adds
              structure, validation, and audit visibility so data can flow directly into your
              TMS/ERP without manual cleanup.
            </p>
          </div>

          <SVGDiagram
            config={{
              type: "pipeline",
              colorScheme: "logistics",
              width: 800,
              height: 120,
              data: {
                steps: ["Ingest", "Classify", "Extract", "Normalize", "Deliver"],
              },
            }}
            className="w-full max-w-4xl mx-auto"
          />

          <div className="grid gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 1: Ingestion (Multi-Channel Capture)</h3>
              <p className="mt-3 text-slate-600">
                Upload via web portal, email dropbox, or API. We accept PDFs, scanned images (TIFF,
                PNG, JPEG), and even photos from mobile devices. Preprocessing deskews scans,
                enhances low-resolution images, and handles multi-page documents automatically.
              </p>
              <ul className="mt-4 list-disc list-inside text-slate-600">
                <li>Supported formats: PDF, TIFF, PNG, JPEG, BMP (up to 50MB per file)</li>
                <li>Batch upload: Up to 100 documents per batch</li>
                <li>Email ingestion: Dedicated address per customer account</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 2: Classification (Document Recognition)</h3>
              <p className="mt-3 text-slate-600">
                Before extraction, we identify what we are looking at. Is this a master BOL or a
                house BOL? A packing list or a delivery receipt? Our classification model was trained
                on 50,000+ logistics documents and recognizes 40+ document types across air, ocean,
                and ground transport.
              </p>
              <ul className="mt-4 list-disc list-inside text-slate-600">
                <li>Recognition accuracy: 97.3% for standard formats</li>
                <li>Supported types: BOL, AWB, CMR, packing list, POD, customs declaration</li>
                <li>Misclassified docs are flagged for human review</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 3: Extraction (Field-Level Capture)</h3>
              <p className="mt-3 text-slate-600">
                We extract 50+ standard fields: shipper/consignee details, cargo descriptions,
                weights and measures, container numbers, voyage references, incoterms, and charges.
                Table data is preserved with row relationships and nested structures.
              </p>
              <ul className="mt-4 list-disc list-inside text-slate-600">
                <li>Field confidence scoring: 0-100% per field</li>
                <li>Auto-acceptance threshold: 85% confidence</li>
                <li>Below threshold: Human verification queue</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 4: Normalization (Standardization)</h3>
              <p className="mt-3 text-slate-600">
                Raw data is messy. &quot;Gross Wt.&quot; becomes{" "}
                <span className="font-semibold">gross_weight_kg</span>. &quot;40&apos; HC&quot; becomes
                container_type: &quot;40ft_high_cube&quot;. Dates normalize to ISO 8601.
                Currencies convert to standard codes. Custom mappings align output to your TMS schema.
              </p>
              <ul className="mt-4 list-disc list-inside text-slate-600">
                <li>Unit standardization: kg/lbs, m/ft, CBM/cubic feet</li>
                <li>Date formats: Auto-detect and convert to ISO 8601</li>
                <li>Custom mappings: JSON schema definition supported</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Stage 5: Delivery (Integration)</h3>
              <p className="mt-3 text-slate-600">
                Normalized data delivers to your systems via webhook, API pull, SFTP drop, or email.
                We support real-time delivery or batch windows. Each delivery includes a manifest
                file linking document IDs to shipment references, plus confidence and audit logs.
              </p>
              <ul className="mt-4 list-disc list-inside text-slate-600">
                <li>Webhook retries: 3 attempts with exponential backoff</li>
                <li>SFTP with SSH key authentication</li>
                <li>REST + GraphQL delivery available</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Standard Logistics Field Mappings</h2>
          <p className="text-lg text-slate-600">
            Every logistics document type has a standard field extraction profile. Below are the
            core fields captured from Bills of Lading and Packing Lists--the two most common
            logistics documents we process.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Bill of Lading (BOL) Field Map</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-slate-200">
                  <thead className="bg-slate-50 text-slate-600 text-sm">
                    <tr>
                      <th className="px-4 py-3">Field</th>
                      <th className="px-4 py-3">JSON Key</th>
                      <th className="px-4 py-3">Example Value</th>
                      <th className="px-4 py-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-700">
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">BOL Number</td>
                      <td className="px-4 py-3">bol_number</td>
                      <td className="px-4 py-3">HLCUBU1234567</td>
                      <td className="px-4 py-3">Master or house BOL</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Shipper Name</td>
                      <td className="px-4 py-3">shipper.name</td>
                      <td className="px-4 py-3">ABC Manufacturing Ltd</td>
                      <td className="px-4 py-3">Parsed from address block</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Consignee Name</td>
                      <td className="px-4 py-3">consignee.name</td>
                      <td className="px-4 py-3">XYZ Distribution Inc</td>
                      <td className="px-4 py-3">Notify party if consignee is &quot;To Order&quot;</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Vessel Name</td>
                      <td className="px-4 py-3">vessel_name</td>
                      <td className="px-4 py-3">MSC GULSUN</td>
                      <td className="px-4 py-3">For ocean BOLs</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Voyage Number</td>
                      <td className="px-4 py-3">voyage_number</td>
                      <td className="px-4 py-3">123E</td>
                      <td className="px-4 py-3">Combined with vessel for tracking</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Ports</td>
                      <td className="px-4 py-3">pol / pod</td>
                      <td className="px-4 py-3">Shanghai -&gt; Rotterdam</td>
                      <td className="px-4 py-3">UN/LOCODE preferred</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Containers</td>
                      <td className="px-4 py-3">containers[].number</td>
                      <td className="px-4 py-3">MSCU1234567</td>
                      <td className="px-4 py-3">Full list with types</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Cargo Description</td>
                      <td className="px-4 py-3">cargo.description</td>
                      <td className="px-4 py-3">Electronic Components</td>
                      <td className="px-4 py-3">HS code extraction available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Packing List Field Map</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-slate-200">
                  <thead className="bg-slate-50 text-slate-600 text-sm">
                    <tr>
                      <th className="px-4 py-3">Field</th>
                      <th className="px-4 py-3">JSON Key</th>
                      <th className="px-4 py-3">Example Value</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-700">
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Invoice Reference</td>
                      <td className="px-4 py-3">invoice_reference</td>
                      <td className="px-4 py-3">INV-2026-001234</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Line Items</td>
                      <td className="px-4 py-3">items[]</td>
                      <td className="px-4 py-3">Array of objects</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Item SKU</td>
                      <td className="px-4 py-3">items[].sku</td>
                      <td className="px-4 py-3">PART-ABC-123</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Quantity</td>
                      <td className="px-4 py-3">items[].quantity</td>
                      <td className="px-4 py-3">100</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Net Weight</td>
                      <td className="px-4 py-3">items[].net_weight_kg</td>
                      <td className="px-4 py-3">2.5</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Dimensions</td>
                      <td className="px-4 py-3">items[].dimensions_cm</td>
                      <td className="px-4 py-3">30 x 20 x 15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="text-slate-600">
            Need fields not listed here? We can add custom extraction rules for document types
            specific to your operations--supplier-specific formats, internal routing codes, or
            customer reference numbers.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Logistics System Integrations</h2>
          <p className="text-lg text-slate-600">
            DocStandard delivers data to the logistics systems you already use. No rip-and-replace.
            No forced migrations. We integrate via APIs, file drops, or secure webhooks so your team
            can keep current workflows intact.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Transportation Management Systems</h3>
              <ul className="space-y-2 text-slate-600">
                <li>CargoWise</li>
                <li>SAP TM</li>
                <li>Oracle Transportation Management</li>
                <li>MercuryGate</li>
                <li>Blue Yonder (JDA)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Enterprise Resource Planning</h3>
              <ul className="space-y-2 text-slate-600">
                <li>SAP S/4HANA</li>
                <li>Oracle NetSuite</li>
                <li>Microsoft Dynamics 365</li>
                <li>Sage</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Warehouse Management Systems</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Blue Yonder WMS</li>
                <li>SAP EWM</li>
                <li>Manhattan Associates</li>
                <li>HighJump (Korber)</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Delivery Formats</h3>
            <p className="text-slate-600">
              JSON (nested hierarchy), XML (CARGO-XML or custom), CSV/Excel flat files, EDI (X12 and
              EDIFACT), and direct API/webhook delivery. We also support SFTP drops and on-demand
              pull endpoints.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Processing Times & Service Levels</h2>
          <p className="text-lg text-slate-600">
            Logistics teams need predictable timelines. We publish clear SLAs for standard,
            expedited, and large batch processing so you can plan customs filings and downstream
            workflows with confidence.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Standard Processing</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Turnaround: 12-24 hours (under 100 documents)</li>
                <li>Delivery: Next business day before 5 PM local time</li>
                <li>Confidence threshold: 85% for automated processing</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Expedited Processing</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Turnaround: 4-8 hours</li>
                <li>Availability: Business hours, Monday-Friday</li>
                <li>Surcharge: 50% of document batch fee</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Large Batch Processing</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Over 500 documents: 3-5 business days</li>
                <li>Over 2,000 documents: Custom timeline</li>
                <li>Dedicated queue for recurring batches</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Quality Guarantees</h3>
            <ul className="space-y-2 text-slate-600">
              <li>99.5% field-level accuracy for typed documents</li>
              <li>95%+ extraction coverage (flagged if below)</li>
              <li>Free reprocessing for errors on our end</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Popular System Integrations</h2>
          <p className="text-lg text-slate-600">
            Connect your logistics documents directly to the TMS and ERP systems your team already uses. 
            Explore our most-requested integration pathways below.
          </p>
          <div className="grid gap-4 lg:grid-cols-2">
            <Link href="/integration/cargowise-to-dynamics-bc-bridge" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold mb-2 group-hover:text-blue-600">CargoWise → Dynamics 365 BC</h3>
              <p className="text-slate-600 text-sm">Normalize freight data from CargoWise into clean Dynamics 365 Business Central imports.</p>
            </Link>
            <Link href="/integration/clean-logistics-data-for-sap-s4hana" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold mb-2 group-hover:text-blue-600">Logistics Data → SAP S/4HANA</h3>
              <p className="text-slate-600 text-sm">Extract and standardize logistics documents for direct SAP S/4HANA integration.</p>
            </Link>
            <Link href="/integration/edi-document-normalization-services" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold mb-2 group-hover:text-blue-600">EDI Document Normalization</h3>
              <p className="text-slate-600 text-sm">Convert EDI X12 and EDIFACT messages into structured data for any ERP system.</p>
            </Link>
            <Link href="/integration/manhattan-to-sap-normalization" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold mb-2 group-hover:text-blue-600">Manhattan WMS → SAP</h3>
              <p className="text-slate-600 text-sm">Bridge warehouse operations data between Manhattan and SAP systems.</p>
            </Link>
          </div>
          <div className="text-center">
            <Link href="/integration" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
              View All Integrations →
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Related Logistics Services</h2>
          <p className="text-lg text-slate-600">
            Connect logistics data directly to adjacent workflows. Freight bill auditing and finance
            depend on clean logistics inputs, while customs clearance relies on accurate BOL and
            packing list data. Explore the related services below.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/finance" className="text-blue-600 font-semibold hover:underline">
              Freight bill auditing and logistics finance
            </Link>
            <Link href="/customs" className="text-blue-600 font-semibold hover:underline">
              Customs clearance document preparation
            </Link>
            <Link href="/compliance" className="text-blue-600 font-semibold hover:underline">
              Logistics compliance documentation
            </Link>
            <Link href="/shipping" className="text-blue-600 font-semibold hover:underline">
              Ocean and air freight document processing
            </Link>
            <Link href="/comparison" className="text-blue-600 font-semibold hover:underline">
              Compare logistics platforms
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
