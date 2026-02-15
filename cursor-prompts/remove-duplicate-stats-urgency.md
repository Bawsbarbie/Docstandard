# Cursor Prompt: Remove Duplicate Stats Bar from Urgency Pages

## Problem
The urgency pages show the same stats twice:
1. **ROI Section** (dark background) — "2-4 hours", "99.5%", "24/7", "100%"
2. **Stats Bar** (white background below hero) — Same stats again

This is duplicate content that doesn't add value.

## Solution
Remove the white stats bar section that appears right after the hero.

## File to Modify
`app/(pseo)/[vertical]/[intent-slug]/[urgency]/[document]/[action]/page.tsx`

## Section to Remove

Find and DELETE this entire section (appears shortly after the hero, around line 175-200):

```tsx
{/* URGENCY STATS */}
<section className="bg-white border-y border-slate-200 py-12 px-6">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className="text-center">
        <div className="text-4xl font-bold text-slate-900 mb-2">{urgency.timeframe}</div>
        <p className="text-slate-600">Guaranteed Turnaround</p>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-slate-900 mb-2">99.5%</div>
        <p className="text-slate-600">Accuracy Rate</p>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-slate-900 mb-2">24/7</div>
        <p className="text-slate-600">{cityName} Support</p>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-slate-900 mb-2">100%</div>
        <p className="text-slate-600">Deadline Guarantee</p>
      </div>
    </div>
  </div>
</section>
```

## Keep This Section (ROI Section with Dark Background)

DON'T remove this one — it's the better-designed version:

```tsx
{/* ROI SECTION - 4 Cards */}
<section className="py-20 px-6 bg-slate-900">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {urgency.label} Processing Impact for {cityName}
      </h2>
      ...
    </div>
    ...
  </div>
</section>
```

## Why Keep the ROI Section?

- Dark background looks more professional
- "Urgent Processing Impact for [City]" headline adds context
- Shows comparison: "4-6 hrs standard" vs "2-4 hrs urgent"
- Better visual hierarchy with icons

## Testing

After removal, verify these URLs still work but without the white stats bar:
- `/logistics/antwerp/urgent/bill-of-lading/processing`
- `/customs/rotterdam/same-day/customs-declaration/preparation`
- `/compliance/singapore/emergency/certificate-of-origin/processing`

The page flow should be:
1. Hero (with CTA)
2. Cost of Delay (dark section)
3. How It Works
4. City Context
5. ... (rest of content)
6. ROI Section (dark, with stats)
7. Benefits
8. FAQ
9. Testimonials
10. Related Services (interlinking)
11. CTA

## Checklist

- [ ] White stats bar section removed
- [ ] ROI section (dark background) still present
- [ ] Page flows correctly without duplicate stats
- [ ] No broken styling or layout issues
- [ ] Build passes
