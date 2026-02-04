# DocStandard Transactional Email Suite
**Tone:** Engineering Veteran / Operational Precision
**Goal:** Maintain trust through the entire batch lifecycle.

---

## 1. Order Received (The "Ingestion" Receipt)
**Subject:** [DocStandard] Batch Ingestion Initiated - ID: {batchId}
**Preheader:** Your documents have been securely received and queued for normalization.

**Body:**
Greetings,

This is a confirmation that your **Standard Batch** has been successfully ingested into the DocStandard Operations Console.

**Batch Summary:**
- **Ref ID:** {batchId}
- **Context:** {vertical} Normalization
- **Timestamp:** {timestamp}

**Next Steps:**
Our engine is currently mapping your raw {intentName} files to the requested schema. You will receive a second notification once the fields have been **Audit Validated** and are ready for system ingestion.

**Security Protocol:**
All source documents are stored in private, encrypted volumes and are scheduled for permanent deletion in 30 days.

---

## 2. Normalization Complete (The "Handover")
**Subject:** [DocStandard] Audit Validated: Batch {batchId} Ready for Download
**Preheader:** Your structured data bundle is now available in the Operations Console.

**Body:**
The normalization of **Batch {batchId}** is complete.

Our validation layer has verified the field mapping and structural integrity of the output. Your **Standardization Bundle** (containing JSON, CSV, and XML formats) is now available for download via the console.

**[Button: Download Data Bundle]**

**File Retention Note:**
This batch will remain available for download until {expiryDate}. After this date, all files (source and output) will be purged to maintain data hygiene and security.

---

## 3. Implementation Logic (For Cursor)
- **Trigger 1:** Fire "Order Received" on Stripe Checkout success webhook.
- **Trigger 2:** Fire "Normalization Complete" when the processing status in Supabase hits `status: 'validated'`.
- **Tools:** Use Resend or SendGrid templates with these blocks.
