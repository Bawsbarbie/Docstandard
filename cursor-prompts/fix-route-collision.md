# Cursor Prompt: Fix Route Collision Risk

## Problem
The GSC audit flagged a potential route collision between `[vertical]/page.tsx` and a hypothetical `[city]/page.tsx`. 

Currently, `[vertical]/page.tsx` is a catch-all that handles:
- `/shipping` (vertical hub)
- `/antwerp-cargowise-sap-bridge` (city-system integration page)
- Any future `/[city]` slug

If we ever create a dedicated `[city]/page.tsx` route, Next.js won't know which handler to use for single-segment URLs like `/antwerp` or `/rotterdam`.

## Current State
**File:** `app/(pseo)/[vertical]/page.tsx`

The route already has a regex pattern for city-system pages:
```typescript
const CITY_SYSTEM_SLUG_REGEX = new RegExp(
  `^[a-z0-9-]+-(?:${SYSTEM_PATTERN})-(?:${SYSTEM_PATTERN})-[a-z0-9-]+$`,
  "i"
)
```

This matches slugs like `antwerp-cargowise-sap-bridge` but NOT standalone city names like `antwerp` or `rotterdam`.

## Solution
Keep `[vertical]` as the catch-all route, but add city detection logic inside the component to handle standalone city slugs differently.

### Step 1: Create a city slug list
Add a list of valid city slugs that should be treated as city landing pages:
```typescript
const CITY_SLUGS = [
  "antwerp", "rotterdam", "hamburg", "bremerhaven", 
  // ... add all 73+ city slugs from the city-vertical pages
] as const

const CITY_SLUG_SET = new Set(CITY_SLUGS)
```

### Step 2: Add detection logic in generateMetadata
Check if the vertical param is a standalone city slug:
```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Check if this is a standalone city slug
  if (CITY_SLUG_SET.has(params.vertical.toLowerCase())) {
    return {
      title: `${params.vertical.charAt(0).toUpperCase() + params.vertical.slice(1)} Logistics Data Services | DocStandard`,
      description: `Professional document standardization and data processing services in ${params.vertical}.`,
    }
  }
  
  // ... rest of existing logic
}
```

### Step 3: Add detection logic in the component
```typescript
export default async function VerticalHubPage({ params }: PageProps) {
  const slug = params.vertical.toLowerCase()
  
  // Handle standalone city pages
  if (CITY_SLUG_SET.has(slug)) {
    // Option A: Redirect to the city's primary vertical (e.g., /antwerp -> /antwerp/shipping)
    // redirect(`/${slug}/shipping`)
    
    // Option B: Render a city hub page
    return <CityHub city={slug} />
  }
  
  // ... rest of existing logic
}
```

## Decision Needed
**Choose ONE approach:**

1. **Redirect approach** (recommended): `/antwerp` → `/antwerp/shipping`
   - Pros: Single canonical URL, no duplicate content
   - Cons: Extra redirect hop

2. **City hub page**: Render a dedicated city landing page at `/antwerp`
   - Pros: Clean URL, city-specific content
   - Cons: Need to create CityHub component, manage canonical tags

## Files to Modify
- `app/(pseo)/[vertical]/page.tsx` — Add city detection logic
- (Optional) Create `app/(pseo)/[vertical]/CityHub.tsx` — If going with option 2

## Testing
After changes, verify these URLs work correctly:
- `/shipping` → Should show shipping vertical hub
- `/antwerp-cargowise-sap-bridge` → Should show city-system integration page
- `/antwerp` → Should either redirect or show city hub (based on chosen approach)

## Priority
Medium — Not causing issues yet, but will become critical as city pages roll out.
