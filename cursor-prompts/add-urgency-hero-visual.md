# Cursor Prompt: Add Hero Image/SVG to Urgency Pages

## File to Modify
`app/(pseo)/[vertical]/[intent-slug]/[urgency]/[document]/[action]/page.tsx`

## Current State
The urgency page hero only has text and buttons - no visual element. It looks empty compared to the first batch design.

## Add Hero Visual

### Option 1: Use Existing SVG/Image from First Batch
If you have an SVG or image used in the first batch pages, import and use it:

```tsx
// At top of file, add import
import HeroImage from "@/components/pseo/HeroImage" // or whatever the component is

// In the hero section, add:
<div className="relative z-10 max-w-5xl mx-auto">
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    {/* Left: Text content */}
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
        {document.singular.toLowerCase()} {action.label.toLowerCase()}. Don't miss deadlines.
      </p>
      
      <div className="flex flex-wrap gap-4">
        <Link href="/login" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition">
          {action.cta} <ArrowRight className="w-5 h-5" />
        </Link>
        <button className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition">
          <MessageCircle className="w-5 h-5" /> Chat with us
        </button>
      </div>
    </div>
    
    {/* Right: Hero Visual */}
    <div className="hidden lg:block">
      <HeroImage vertical={params.vertical} />
    </div>
  </div>
</div>
```

### Option 2: Create Simple SVG Illustration
If no existing hero component, create a simple urgency-themed SVG:

```tsx
// Add this inside the hero section, right side:
<div className="hidden lg:flex justify-center items-center">
  <div className="relative w-full max-w-md">
    {/* Document with clock icon */}
    <svg viewBox="0 0 400 300" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background card */}
      <rect x="50" y="30" width="300" height="240" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
      
      {/* Document icon */}
      <rect x="100" y="70" width="120" height="160" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2"/>
      <line x1="120" y1="100" x2="200" y2="100" stroke="#94A3B8" strokeWidth="3"/>
      <line x1="120" y1="120" x2="200" y2="120" stroke="#94A3B8" strokeWidth="3"/>
      <line x1="120" y1="140" x2="180" y2="140" stroke="#94A3B8" strokeWidth="3"/>
      <line x1="120" y1="160" x2="190" y2="160" stroke="#94A3B8" strokeWidth="3"/>
      <line x1="120" y1="180" x2="170" y2="180" stroke="#94A3B8" strokeWidth="3"/>
      
      {/* Clock/urgency icon */}
      <circle cx="280" cy="150" r="50" fill="#EF4444" opacity="0.1"/>
      <circle cx="280" cy="150" r="40" fill="white" stroke="#EF4444" strokeWidth="3"/>
      <line x1="280" y1="150" x2="280" y2="120" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
      <line x1="280" y1="150" x2="300" y2="150" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="280" cy="150" r="4" fill="#EF4444"/>
      
      {/* Lightning bolt */}
      <path d="M260 60 L275 60 L265 80 L280 80 L255 110 L265 85 L250 85 Z" fill="#F59E0B"/>
      
      {/* Speed lines */}
      <line x1="320" y1="100" x2="360" y2="100" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"/>
      <line x1="320" y1="130" x2="350" y2="130" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"/>
      <line x1="320" y1="160" x2="355" y2="160" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"/>
    </svg>
  </div>
</div>
```

### Option 3: Use Lucide Icons Composition
Create a visual using existing Lucide icons:

```tsx
// Add to imports:
import { FileText, Clock, Zap, ArrowRightCircle } from "lucide-react"

// In hero, right side:
<div className="hidden lg:flex justify-center items-center">
  <div className="relative">
    {/* Background circle */}
    <div className="w-64 h-64 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
      <FileText className="w-32 h-32 text-slate-700" strokeWidth={1} />
    </div>
    
    {/* Floating elements */}
    <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg">
      <Clock className="w-8 h-8 text-white" />
    </div>
    
    <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg">
      <Zap className="w-7 h-7 text-white" />
    </div>
    
    <div className="absolute top-1/2 -right-8 w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg">
      <ArrowRightCircle className="w-6 h-6 text-white" />
    </div>
  </div>
</div>
```

## Recommended Approach
**Use Option 3 (Lucide Icons)** - it's quickest and doesn't require new assets. It creates a visual similar to the first batch pages using existing components.

## Full Hero Section Structure

```tsx
{/* URGENCY HERO - Clean with Visual */}
<section className="relative overflow-hidden py-20 px-6 bg-slate-50">
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-2xl" />
  </div>

  <div className="relative z-10 max-w-6xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left: Content */}
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
        
        <div className="flex flex-wrap gap-4">
          <Link href="/login" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition">
            {action.cta} <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition">
            <MessageCircle className="w-5 h-5" /> Chat with us
          </button>
        </div>
      </div>
      
      {/* Right: Visual */}
      <div className="hidden lg:flex justify-center items-center">
        <div className="relative">
          {/* Main document icon */}
          <div className="w-72 h-72 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
            <FileText className="w-36 h-36 text-slate-700" strokeWidth={1} />
          </div>
          
          {/* Floating clock icon */}
          <div className="absolute -top-2 -right-2 w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
            <Clock className="w-10 h-10 text-white" />
          </div>
          
          {/* Floating zap icon */}
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Zap className="w-8 h-8 text-white" />
          </div>
          
          {/* Small arrow icon */}
          <div className="absolute top-1/2 -right-4 w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Test URLs
After changes, verify these render with the new hero visual:
- `/logistics/antwerp/urgent/bill-of-lading/processing`
- `/customs/rotterdam/same-day/customs-declaration/preparation`
- `/compliance/singapore/emergency/certificate-of-origin/processing`
