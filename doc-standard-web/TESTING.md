# Testing Guide - Phase 2

## Quick Test URLs

### ✅ Canonical Pages (Should Render Content)

**Top Priority Cities + Services:**

1. **New York + Customs Clearance**
   ```
   http://localhost:3000/us/ny/new-york/customs-clearance-services
   ```
   - Should render full page
   - H1: "Customs Clearance Services in New York"
   - Check: robots meta should be `index, follow` (priority 100 + priority 1)

2. **Los Angeles + Freight Forwarding**
   ```
   http://localhost:3000/us/ca/los-angeles/freight-forwarding-services
   ```
   - Should render full page
   - H1: "Freight Forwarding Services in Los Angeles"
   - Check: robots meta should be `index, follow` (priority 100 + priority 2)

3. **Chicago + Import Export Docs**
   ```
   http://localhost:3000/us/il/chicago/import-export-documentation
   ```
   - Should render full page
   - H1: "Import Export Documentation in Chicago"
   - Check: robots meta should be `index, follow` (priority 99 + priority 3)

4. **Houston + Commercial Invoice**
   ```
   http://localhost:3000/us/tx/houston/commercial-invoice-processing
   ```
   - Should render full page
   - Check: robots meta should be `index, follow` (priority 98 + priority 4)

5. **San Francisco + Bill of Lading**
   ```
   http://localhost:3000/us/ca/san-francisco/bill-of-lading-services
   ```
   - Should render full page
   - Check: robots meta should be `index, follow` (priority 95 + priority 5)

### 🔄 Alias Pages (Should 308 Redirect)

**Test Redirects:**

1. **New York (without state)**
   ```
   http://localhost:3000/us/new-york/customs-clearance-services
   ```
   - Should redirect to: `/us/ny/new-york/customs-clearance-services`
   - Check Network tab: Status 308

2. **Los Angeles (without state)**
   ```
   http://localhost:3000/us/los-angeles/freight-forwarding-services
   ```
   - Should redirect to: `/us/ca/los-angeles/freight-forwarding-services`
   - Check Network tab: Status 308

3. **Chicago (without state)**
   ```
   http://localhost:3000/us/chicago/import-export-documentation
   ```
   - Should redirect to: `/us/il/chicago/import-export-documentation`
   - Check Network tab: Status 308

### ❌ Pages That Should NOT Be Indexed

**Lower Priority Combinations:**

1. **Aurora, IL (priority 80) + Any Service**
   ```
   http://localhost:3000/us/il/aurora/customs-clearance-services
   ```
   - Should render content
   - But check: robots meta should be `noindex, nofollow`
   - Reason: City priority < 90

2. **New York + Long-tail Service (priority 20+)**
   ```
   http://localhost:3000/us/ny/new-york/warehouse-receipt-documentation
   ```
   - Should render content
   - But check: robots meta should be `noindex, nofollow`
   - Reason: Intent priority > 15

## Testing Checklist

### 1. Content Assembly ✅

- [ ] Page loads without errors
- [ ] All 5 sections render:
  - [ ] Intro section with H1
  - [ ] Pain section (gray background)
  - [ ] Benefits grid (6 items)
  - [ ] FAQ section (4-6 items)
  - [ ] CTA section (primary color)
- [ ] City name appears correctly in content
- [ ] Service name appears correctly in content
- [ ] No placeholder text like `{city}` or `{service}`

### 2. Metadata ✅

**View page source or inspect:**

- [ ] `<title>` tag is present and includes city + service
- [ ] `<meta name="description">` is present
- [ ] `<meta name="robots">` is correct:
  - High priority: `index, follow`
  - Low priority: `noindex, nofollow`
- [ ] `<link rel="canonical">` points to correct URL
- [ ] OpenGraph tags present (`og:title`, `og:description`, `og:type`)

### 3. Redirects ✅

**Test alias URLs:**

- [ ] Alias URL redirects to canonical
- [ ] Status code is 308 (check Network tab)
- [ ] Final URL in browser bar is canonical format
- [ ] Content renders correctly after redirect

### 4. Deterministic Content ✅

**Refresh test:**

1. Visit a canonical URL
2. Note which intro variant appears
3. Refresh the page 5 times
4. Verify: same intro appears every time

**Different URLs test:**

1. Visit: `/us/ca/los-angeles/customs-clearance-services`
2. Visit: `/us/ca/los-angeles/freight-forwarding-services`
3. Verify: different content (because hash is different)

### 5. Pool Resolution ✅

**Test different service types:**

1. **Customs service** (should use "customs" pool):
   ```
   http://localhost:3000/us/ny/new-york/customs-clearance-services
   ```

2. **Shipping service** (should use "shipping" pool):
   ```
   http://localhost:3000/us/ny/new-york/bill-of-lading-services
   ```

3. Check: FAQs might be different (based on pool configuration)

### 6. Error Handling ✅

**404 Tests:**

- [ ] Invalid city: `/us/ca/fakecity/customs-clearance-services`
  - Should show 404 page
- [ ] Invalid state: `/us/zz/new-york/customs-clearance-services`
  - Should show 404 page
- [ ] Invalid intent: `/us/ca/los-angeles/fake-service`
  - Should show 404 page
- [ ] Too few segments: `/us/ca`
  - Should show 404 page
- [ ] Too many segments: `/us/ca/los-angeles/customs/extra`
  - Should show 404 page

## Browser Testing

### Desktop
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari

### Mobile
- [ ] Chrome mobile
- [ ] Safari mobile
- [ ] Check responsive design (grid becomes 1 column)

## Performance Testing

### Load Times

1. **First Load** (cold start):
   - Open browser DevTools → Network tab
   - Visit: `/us/ca/los-angeles/customs-clearance-services`
   - Check: Total load time < 2s

2. **Cached Load** (hot):
   - Visit same URL again
   - Check: Total load time < 500ms

3. **Redirect** (alias):
   - Visit: `/us/los-angeles/customs-clearance-services`
   - Check: Redirect time < 100ms

### Console Errors

- [ ] Open browser console
- [ ] Visit multiple pages
- [ ] Verify: No console errors
- [ ] Verify: No React warnings

## Content Quality Testing

### Text Replacement

Check that all variables are replaced:

1. **Intro text**: Should contain actual city name, not `{city}`
2. **Pain text**: Should read naturally
3. **Benefits**: Should read naturally
4. **CTA**: Should contain "$799" and service name
5. **FAQ**: Questions and answers should be complete

### Grammar & Spelling

- [ ] No typos in templates
- [ ] Proper capitalization
- [ ] Correct punctuation

## Data Integrity Testing

### Verify Data Loading

Open browser console and test:

```javascript
// This should work if data is loading correctly
fetch('/us/ca/los-angeles/customs-clearance-services')
  .then(r => console.log('Status:', r.status))
```

Expected: Status 200

## SEO Testing

### Canonical URLs

1. Visit alias: `/us/los-angeles/customs-clearance-services`
2. After redirect, view source
3. Verify: `<link rel="canonical">` has full canonical URL

### Robots Meta

1. View source on high-priority page
2. Find: `<meta name="robots" content="index, follow">`
3. View source on low-priority page
4. Find: `<meta name="robots" content="noindex, nofollow">`

## Sample Test Scenarios

### Scenario 1: New User Searching "customs clearance los angeles"

1. They find: `/us/ca/los-angeles/customs-clearance-services`
2. Page should:
   - Load quickly
   - Show relevant H1
   - Display benefits
   - Include local context
   - Have clear CTA

### Scenario 2: User Shares Alias Link

1. They share: `/us/los-angeles/customs-clearance-services`
2. Recipient clicks link
3. Automatically redirects to canonical
4. Page renders correctly
5. URL updates in browser

### Scenario 3: Search Engine Crawler

1. Crawler finds alias link
2. Follows to canonical (308 redirect)
3. Reads robots meta tag
4. Indexes if high priority
5. Respects noindex for low priority

## Development Testing

### Hot Reload

1. Make change to `content-factory.ts`
2. Save file
3. Check: Dev server hot reloads
4. Check: Page updates automatically

### Build Test

```bash
npm run build
```

Expected output:
- ✓ Compiling successfully
- ✓ Generating static pages
- ✓ ~100 pages pre-rendered

## Troubleshooting

### Issue: Page shows 404

**Check:**
- City slug matches CSV data (kebab-case)
- State code is correct (e.g., "ca" not "CA")
- Intent slug matches intents.csv

### Issue: Content shows `{city}` or `{service}`

**Check:**
- Variable replacement is working
- Template syntax is correct
- State data is being passed to assemblePage()

### Issue: Same content on all pages

**Check:**
- Hash function is working
- Seed includes all URL params
- Block selection is using hash

### Issue: 308 redirect not working

**Check:**
- Alias route is being detected (3 segments)
- getStateFromCity() is returning state code
- redirect() is being called

### Issue: Wrong robots meta tag

**Check:**
- City priority in CSV
- Intent priority in CSV
- shouldIndexCity() logic in geo.ts

---

## All Tests Passing? ✅

If all tests pass, Phase 2 is complete and working correctly!

**Next**: Proceed to Phase 3 (Database & Upload Flow)
