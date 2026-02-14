# Cursor Prompt: Fix Urgency Page Design

## File to Modify
`app/(pseo)/[vertical]/[intent-slug]/[urgency]/[document]/[action]/page.tsx`

## Changes Needed

### 1. Remove the "Call for Rush Orders" Button
**Current code (around line 165-167):**
```tsx
<a href="tel:+18001234567" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
  <Phone className="w-5 h-5" /> Call for Rush Orders
</a>
```

**Change to:**
```tsx
<button className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition cursor-pointer">
  <MessageCircle className="w-5 h-5" /> Chat with us
</button>
```

**Also:**
- Remove the import for `Phone` from lucide-react (if not used elsewhere)
- Add import for `MessageCircle` from lucide-react

### 2. Remove Big Red Background from Hero
**Current hero section (around line 125-140):**
```tsx
{/* URGENCY HERO - Red/Danger Theme */}
<section className="relative overflow-hidden py-20 px-6 bg-red-950">
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 via-red-950 to-slate-950" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
  </div>
```

**Change to cleaner design (like first batch):**
```tsx
{/* URGENCY HERO - Clean Design */}
<section className="relative overflow-hidden py-20 px-6 bg-slate-50">
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
  </div>
```

**Also update text colors:**
- Change `text-white` to `text-slate-900` (headings)
- Change `text-red-100` to `text-slate-600` (paragraphs)
- Keep the urgency badge styling but maybe tone down slightly

### 3. Update CTA Button Styling
**Current:**
```tsx
<Link href="/login" className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition shadow-lg shadow-red-900/50">
  {action.cta} <ArrowRight className="w-5 h-5" />
</Link>
```

**Change to cleaner style:**
```tsx
<Link href="/login" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition">
  {action.cta} <ArrowRight className="w-5 h-5" />
</Link>
```

### 4. Update Bottom CTA Section Too
**Current (around line 475):**
```tsx
<section className="py-20 px-6 bg-red-600">
```

**Change to:**
```tsx
<section className="py-20 px-6 bg-slate-900">
```

**And change the buttons:**
```tsx
<div className="flex flex-wrap justify-center gap-4">
  <Link href="/login" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition">
    {action.cta} <ArrowRight className="w-5 h-5" />
  </Link>
  <button className="inline-flex items-center gap-2 bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700 transition cursor-pointer">
    <MessageCircle className="w-5 h-5" /> Chat with us
  </button>
</div>
```

### 5. Remove Red Stats Bar or Make It Cleaner
**Current stats section (around line 175):**
```tsx
<section className="bg-red-900 py-12 px-6">
```

**Change to:**
```tsx
<section className="bg-white border-y border-slate-200 py-12 px-6">
```

**And update text colors:**
- Change `text-white` to `text-slate-900`
- Change `text-red-200` to `text-slate-600`

## Summary of Visual Changes

| Element | Before | After |
|---------|--------|-------|
| Hero background | Dark red (`bg-red-950`) | Clean light (`bg-slate-50`) |
| Hero text | White | Dark (`text-slate-900`) |
| Primary CTA | Red button | Slate/dark button |
| Secondary CTA | "Call for Rush Orders" | "Chat with us" |
| Stats bar | Red background | White with border |
| Bottom CTA | Red background | Slate background |

## Keep These Elements
- The urgency badge ("⚡ Urgent Service — 2-4 hours Turnaround") - keep it but maybe adjust colors
- The 4 stats (turnaround, accuracy, support, guarantee)
- All the content sections below the hero
- The red accent colors in the content sections (those are fine, just the hero should be cleaner)

## Test URLs to Verify
After changes, verify these still work:
- `/logistics/antwerp/urgent/bill-of-lading/processing`
- `/customs/rotterdam/same-day/customs-declaration/preparation`
- `/compliance/singapore/emergency/certificate-of-origin/processing`
