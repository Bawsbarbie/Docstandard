# Cursor Prompt: Fix Urgency Page Template - Hero Standards

## File to Modify
`app/(pseo)/[vertical]/[intent-slug]/[urgency]/[document]/[action]/page.tsx`

## Template Standard (ENFORCE THIS)
Every hero section MUST have these 3 elements:
1. **Text** (headline, description, badges)
2. **Visual** (image, SVG, or icon composition)
3. **CTA Button** (primary action)

This is a template requirement - all pSEO pages must follow this structure.

## Changes to Make

### 1. Update Hero Structure (REQUIRED)
Current: Only text, no visual, phone CTA
New: 2-column layout with text + visual + proper CTAs

```tsx
{/* URGENCY HERO - Template Standard: Text + Visual + Button */}
<section className="relative overflow-hidden py-20 px-6 bg-slate-50">
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-2xl" />
  </div>

  <div className="relative z-10 max-w-6xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
      {/* COLUMN 1: TEXT (Required) */}
      <div>
        <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <AlertTriangle className="w-4 h-4" />
          {urgency.badge} {urgency.label} Service — {urgency.timeframe} Turnaround
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          {displayTitle} in {cityName}
        </h1>
        
        <p className="text-lg text-slate-600 max-w-xl mb-8 leading-relaxed">
          When time is critical, {cityName} operations trust DocStandard for {urgency.timeframe.toLowerCase()} 
          {document.singular.toLowerCase()} {action.label.toLowerCase()}. Don't miss deadlines — get your documents 
          processed accurately and fast.
        </p>
        
        {/* COLUMN 3: BUTTON (Required) */}
        <div className="flex flex-wrap gap-4">
          <Link href="/login" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition">
            {action.cta} <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition cursor-pointer">
            <MessageCircle className="w-5 h-5" /> Chat with us
          </button>
        </div>
      </div>
      
      {/* COLUMN 2: VISUAL (Required - Never skip this) */}
      <div className="hidden lg:flex justify-center items-center">
        <div className="relative">
          {/* Main document icon */}
          <div className="w-72 h-72 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
            <FileText className="w-36 h-36 text-slate-700" strokeWidth={1} />
          </div>
          
          {/* Floating urgency icon */}
          <div className="absolute -top-2 -right-2 w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
            <Clock className="w-10 h-10 text-white" />
          </div>
          
          {/* Floating zap icon */}
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Zap className="w-8 h-8 text-white" />
          </div>
          
          {/* Small arrow accent */}
          <div className="absolute top-1/2 -right-4 w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>
```

### 2. Remove Problem Elements

**Remove this phone button completely:**
```tsx
<!-- DELETE THIS -->
<a href="tel:+18001234567" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
  <Phone className="w-5 h-5" /> Call for Rush Orders
</a>
```

**Remove dark red background:**
```tsx
<!-- CHANGE FROM -->
<section className="relative overflow-hidden py-20 px-6 bg-red-950">

<!-- CHANGE TO -->
<section className="relative overflow-hidden py-20 px-6 bg-slate-50">
```

### 3. Update Stats Section

```tsx
<!-- CHANGE FROM red background -->
<section className="bg-red-900 py-12 px-6">

<!-- CHANGE TO white with border -->
<section className="bg-white border-y border-slate-200 py-12 px-6">

<!-- And update text colors -->
<div className="text-4xl font-bold text-slate-900 mb-2">  <!-- was text-white -->
<p className="text-slate-600">  <!-- was text-red-200 -->
```

### 4. Update Bottom CTA Section

```tsx
<!-- CHANGE FROM -->
<section className="py-20 px-6 bg-red-600">

<!-- CHANGE TO -->
<section className="py-20 px-6 bg-slate-900">
```

### 5. Update Imports

```tsx
<!-- REMOVE: -->
import { Phone } from "lucide-react"

<!-- ADD: -->
import { MessageCircle, FileText, Clock, Zap } from "lucide-react"
```

## Template Documentation (Add as Comment)

Add this comment at the top of the file for future reference:

```tsx
/**
 * URGENCY PAGE TEMPLATE
 * 
 * Hero Section Requirements (ALL pages must have these 3 elements):
 * 1. TEXT: Headline, description, urgency badge
 * 2. VISUAL: Image, SVG, or icon composition (NEVER skip)
 * 3. BUTTON: Primary CTA + secondary action
 * 
 * This ensures design consistency across all pSEO pages.
 */
```

## Checklist Before Committing

- [ ] Hero has text (headline, description)
- [ ] Hero has visual (image/SVG/icons) - NEVER leave this out
- [ ] Hero has button (primary CTA)
- [ ] No phone number hardcoded anywhere
- [ ] Background is clean (not aggressive red)
- [ ] Stats section is readable
- [ ] Bottom CTA uses slate colors

## Test These URLs

Verify these pages render with the new template:
1. `/logistics/antwerp/urgent/bill-of-lading/processing`
2. `/customs/rotterdam/same-day/customs-declaration/preparation`
3. `/compliance/singapore/emergency/certificate-of-origin/processing`
4. `/shipping/hamburg/rush/freight-document/processing`

All should show: clean background + text + visual icons + proper CTAs
