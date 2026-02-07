# DocStandard Client Dashboard Blueprint
**Target Persona:** Logistics Manager / Controller / Customs Broker
**Goal:** High-trust, technical, and efficient "One-Click" file normalization.

---

## 1. The Dashboard Flow (User Journey)
1. **Empty State:** User lands on a clean, professional "Command Center" view.
2. **The Batch Initiation:** User clicks "New Standard Batch" ($799).
3. **Secure Upload:** A drag-and-drop zone that handles multi-file batches (PDF/XML/CSV).
4. **Vertical Selection:** A quick toggle to tell us the context (Logistics, Finance, or Customs).
5. **Processing State:** A technical "Status Bar" showing the extraction/normalization progress.
6. **The Handover:** A secure download area for the cleaned data (JSON/CSV) + the Original Source files for audit.

---

## 2. Core Components & Technical Labels

### A. The "Command Center" (Main Grid)
*   **Active Batches:** Show current progress with technical status tags.
*   **System Integrity:** A "Trust Badge" indicating the 30-day auto-delete policy is active.
*   **Quick Stats:** "Files Normalized," "Lines Audited," "Audit Readiness Score."

### B. The "Normalization Engine" (Upload Component)
*   **Component Title:** `Batch Data Ingestion`
*   **Vertical Toggle:** `Normalization Context` (Options: Freight Audit, Customs Entry, TMS-ERP Bridge).
*   **Drop Zone Text:** "Securely ingest raw .pdf, .xml, or .csv documents for normalization."

---

## 3. Professional Copy (Dashboard UI)

| Component | UI Label / Copy | Purpose |
| :--- | :--- | :--- |
| **Header** | `DocStandard Operations Console` | Establishes authority immediately. |
| **Upload Button** | `Initialize Standard Batch ($799)` | Clear, flat-fee pricing transparently displayed. |
| **Status Tag 1** | `Awaiting Ingestion` | File uploaded but processing not started. |
| **Status Tag 2** | `Normalizing Fields` | The engine is currently mapping the data. |
| **Status Tag 3** | `Audit Validated` | Data is clean and ready for download. |
| **Security Footer** | `AES-256 Encryption Active. All source files are purged 30 days post-normalization.` | High-trust security signal. |
| **History Label** | `Operational Batch History` | Replaces the generic "My Files". |
| **Custom Quote** | `Request Complex Batch Analysis` | Button appearing when batch exceeds 1,000 docs / 2,000 pages. |

---

## 4. The "Welcome to Console" (Security-First Onboarding)
**Headline:** `Data Integrity: Verified.`
**Copy:** 
"Welcome to the DocStandard Operations Console. Your session is protected by AES-256 end-to-end encryption. Every batch you upload is treated as a high-integrity asset, governed by our strict 30-day autonomous purge policy. You are here to normalize data; we are here to protect it."

---

## 4. Cursor Implementation Instruction
**Copy and paste this for the Cursor Build:**

```text
Build a responsive Client Dashboard in Next.js/Tailwind using the following specs:

1. Layout: A professional 'Operations Console' with a sidebar for 'Batches', 'Billing', and 'Profile'.
2. Batch List: A table showing Batch ID, Date, Vertical (Customs/Finance/Logistics), and a Status Badge (Ingestion, Normalizing, Validated).
3. Upload Flow:
   - Create a 'New Batch' modal with a Drag-and-Drop file uploader.
   - Include a select-field for 'Normalization Context' (mapping to our 3 core verticals).
   - Display a flat-fee confirmation ($799) before upload.
4. Data Persistence:
   - Integrate with the Supabase 'batches' and 'uploads' tables.
   - Show 'Upload History' by querying authenticated user's batches.
5. Tone: Use 'Engineering Veteran' labels from DocStandard Blueprint (e.g., 'Awaiting Ingestion' instead of 'Pending').
```
