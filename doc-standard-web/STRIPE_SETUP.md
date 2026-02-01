# Stripe Setup Guide

Quick guide to set up Stripe payment integration for DocStandard.co.

## Step 1: Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for free account
3. Complete business verification (optional for test mode)

## Step 2: Get API Keys

### In Stripe Dashboard:

1. Go to **Developers** → **API keys**
2. Copy your **Secret key** (starts with `sk_test_` for test mode)
3. Copy your **Publishable key** (starts with `pk_test_`)

### Add to `.env.local`:

```env
STRIPE_SECRET_KEY=sk_test_51ABC...xyz
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC...xyz
```

## Step 3: Set Up Webhook

### For Local Development (Stripe CLI):

1. **Install Stripe CLI**:
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe

# Or download from: https://stripe.com/docs/stripe-cli
```

2. **Login**:
```bash
stripe login
```

3. **Forward webhooks**:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This outputs: `whsec_...` ← Your webhook secret

4. **Add to `.env.local`**:
```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

### For Production:

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
5. Copy **Signing secret** (starts with `whsec_`)
6. Add to production environment variables

## Step 4: Run Database Migration

```sql
-- Run in Supabase SQL Editor
ALTER TABLE orders ADD COLUMN paid_at TIMESTAMPTZ;
```

Or apply migration:
```bash
supabase db push
```

## Step 5: Test Payment Flow

### Test Cards:

**Successful Payment**:
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any (e.g., 12345)

**Declined Card**:
- Card: `4000 0000 0000 0002`

**Requires Authentication (3D Secure)**:
- Card: `4000 0027 6000 3184`

**More test cards**: [stripe.com/docs/testing](https://stripe.com/docs/testing)

### Testing Steps:

1. **Start dev server**:
```bash
npm run dev
```

2. **Start webhook forwarding** (separate terminal):
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

3. **Upload files**:
   - Go to `http://localhost:3000/upload`
   - Upload test PDF
   - Click "Upload"

4. **Checkout**:
   - Redirected to `/checkout/{orderId}`
   - Review order summary
   - Click "Pay $799.00"

5. **Stripe Checkout**:
   - Enter test card: `4242 4242 4242 4242`
   - Enter expiry, CVC, ZIP
   - Click "Pay"

6. **Success**:
   - Redirected to `/success`
   - See confirmation message
   - Watch Stripe CLI terminal for webhook event

7. **Verify in database**:
```sql
SELECT id, status, paid_at, stripe_session_id 
FROM orders 
ORDER BY created_at DESC 
LIMIT 1;
```

Should show:
- `status`: 'queued'
- `paid_at`: timestamp
- `stripe_session_id`: ses_...

## Step 6: Monitor Payments

### In Stripe Dashboard:

**View Payments**:
- Payments → All payments
- See all successful/failed payments

**View Sessions**:
- Payments → Checkout
- See all checkout sessions

**View Webhooks**:
- Developers → Webhooks → Events
- See all webhook deliveries
- Retry failed webhooks

**View Logs**:
- Developers → Logs
- See all API requests

## Environment Variables Checklist

```env
# Required for payments to work:
✅ NEXT_PUBLIC_APP_URL=http://localhost:3000
✅ STRIPE_SECRET_KEY=sk_test_...
✅ STRIPE_WEBHOOK_SECRET=whsec_...

# Optional (for future Stripe Elements):
⚪ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Going Live

### When ready for production:

1. **Switch to live mode** in Stripe Dashboard
2. **Get live API keys**:
   - Secret key: `sk_live_...`
   - Publishable key: `pk_live_...`

3. **Create production webhook**:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Get live webhook secret: `whsec_...`

4. **Update production env vars**:
```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

5. **Complete Stripe verification**:
   - Business details
   - Bank account
   - Tax information

6. **Test with real card** (small amount first!)

## Troubleshooting

### Webhook not receiving events:

**Check**:
- Stripe CLI running: `stripe listen`
- Webhook secret correct in `.env.local`
- Dev server running: `npm run dev`
- Check Stripe Dashboard → Webhooks → Events

**Solution**:
```bash
# Restart Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy new webhook secret to .env.local
# Restart dev server
```

### Payment succeeds but order not updated:

**Check**:
1. Webhook received? (Stripe Dashboard → Webhooks)
2. Signature valid? (check server logs)
3. Order ID in metadata? (check session)
4. Database updated? (query orders table)

**Debug**:
```bash
# Check server logs for webhook processing
# Look for: "Processing checkout.session.completed"
```

### Checkout redirect fails:

**Check**:
- Stripe API key valid
- Order exists and user owns it
- Network connectivity

**Solution**:
- Check browser console
- Check Stripe Dashboard → Logs
- Verify API key in `.env.local`

## Quick Commands

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks (keep running)
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test webhook manually
stripe trigger checkout.session.completed

# View recent events
stripe events list

# View recent payments
stripe payments list
```

## Security Notes

⚠️ **Never commit**:
- `.env.local` file
- API keys in code
- Webhook secrets

✅ **Always**:
- Use environment variables
- Verify webhook signatures
- Check order ownership
- Use HTTPS in production

## Support

**Stripe Documentation**:
- [Checkout](https://stripe.com/docs/payments/checkout)
- [Webhooks](https://stripe.com/docs/webhooks)
- [Testing](https://stripe.com/docs/testing)

**Stripe Support**:
- Dashboard → Help
- Live chat available
- Email: support@stripe.com

---

**Setup Time**: ~15 minutes
**Difficulty**: Easy

Ready to accept payments! 💳
