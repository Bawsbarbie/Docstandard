# Cursor Prompt: Stripe Checkout Integration

## Goal
Wire up Stripe Checkout so users pay $799 BEFORE files are processed. Currently, batches are created but no payment is collected.

## Current State
- Batch creation works (`lib/actions/upload.ts` → `createBatch`)
- Batch is created with `price_cents: 79900` and `status: 'created'`
- User uploads files → batch status becomes `'uploaded'`
- **NO PAYMENT IS COLLECTED**

## Required Changes

### 1. Create Stripe Checkout Session
**File:** `lib/actions/stripe.ts` (create if doesn't exist)

Create a server action that:
- Creates a Stripe Checkout session for $799.00
- Stores `stripe_session_id` in the batch record
- Returns the checkout URL

```typescript
"use server"

import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function createCheckoutSession(batchId: string): Promise<{ url: string | null; error: string | null }> {
  const supabase = await createClient()
  
  // Verify user owns this batch
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return { url: null, error: "Not authenticated" }
  
  const { data: batch } = await supabase
    .from("batches")
    .select("*, profiles(email)")
    .eq("id", batchId)
    .single()
  
  if (!batch || batch.user_id !== userData.user.id) {
    return { url: null, error: "Unauthorized" }
  }
  
  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    customer_email: userData.user.email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "DocStandard Standard Batch",
            description: "Document standardization and data extraction",
          },
          unit_amount: 79900, // $799.00
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?payment=success&batch_id=${batchId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?payment=cancelled&batch_id=${batchId}`,
    metadata: {
      batch_id: batchId,
      user_id: userData.user.id,
    },
  })
  
  // Store session ID in batch
  await supabase
    .from("batches")
    .update({ stripe_session_id: session.id })
    .eq("id", batchId)
  
  return { url: session.url, error: null }
}
```

### 2. Modify Upload Flow
**File:** `components/upload/FileUploader.tsx`

Change the flow from:
```
Upload Files → Complete Batch → Done
```

To:
```
Upload Files → Complete Batch → Redirect to Stripe → Payment Success → Processing
```

In the `startUpload` function, after `completeBatchUpload`, call `createCheckoutSession` and redirect:

```typescript
const startUpload = async () => {
  // ... existing upload code ...
  
  // After all files uploaded
  if (successCount > 0) {
    await completeBatchUpload(batch.id)
    
    // NEW: Create checkout session and redirect
    const { url, error } = await createCheckoutSession(batch.id)
    if (url) {
      window.location.href = url
      return
    }
    
    setUploadError(error || "Failed to create checkout session")
  }
}
```

### 3. Handle Success/Cancel Callbacks
**File:** `app/(app)/dashboard/page.tsx`

Add useEffect to check for payment query params:

```typescript
useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  const payment = params.get("payment")
  const batchId = params.get("batch_id")
  
  if (payment === "success" && batchId) {
    // Show success toast, refresh batches
    // Optionally: Clear query params
  } else if (payment === "cancelled" && batchId) {
    // Show "Payment cancelled" message
    // Batch stays in 'uploaded' state, user can retry
  }
}, [])
```

### 4. Webhook to Update Batch Status (Optional for MVP)
For validation with 5-10 users, you can manually verify payments in Stripe Dashboard and update batch status.

For production, add a webhook:
**File:** `app/api/webhooks/stripe/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" })
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const signature = req.headers.get("stripe-signature")!
  
  let event: Stripe.Event
  
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
  
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const batchId = session.metadata?.batch_id
    
    if (batchId) {
      const supabase = await createClient()
      await supabase
        .from("batches")
        .update({ 
          status: "queued", 
          paid_at: new Date().toISOString(),
          stripe_payment_intent_id: session.payment_intent as string
        })
        .eq("id", batchId)
    }
  }
  
  return NextResponse.json({ received: true })
}
```

## Environment Variables Needed
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (optional for MVP)
NEXT_PUBLIC_URL=http://localhost:3000 (or production URL)
```

## Testing Steps
1. Upload files in dashboard
2. Should redirect to Stripe Checkout
3. Pay with test card (4242 4242 4242 4242)
4. Should redirect back with `?payment=success`
5. Batch status should update to "queued" (manually for MVP, via webhook for production)

## Files to Create/Modify
- Create: `lib/actions/stripe.ts`
- Modify: `components/upload/FileUploader.tsx` (add checkout redirect)
- Modify: `app/(app)/dashboard/page.tsx` (handle success/cancel)
- Create (optional): `app/api/webhooks/stripe/route.ts`
