# Cursor Prompt: Fix Onboarding Email Pre-fill

## Goal
When a user signs up and enters the onboarding flow, their email should already be pre-filled from their auth session. Currently, they have to re-enter it.

## Current State
**File:** `app/(app)/dashboard/page.tsx` (or wherever onboarding component lives)

Looking at the code, the onboarding modal (`isOnboardingOpen`) has a form for custom quota request that asks for email again. The user just signed up with their email — they shouldn't have to type it again.

The issue is in the "Request Custom Quota" form (the `isQuotaModalOpen` section), but there might also be an onboarding flow that collects email.

## Required Changes

### 1. Pre-fill Email from Auth Session
**File:** `app/(app)/dashboard/page.tsx`

The dashboard already fetches the user from Supabase auth. Use that email in forms.

```typescript
// Add to state (around line 60, near other state declarations)
const [userEmail, setUserEmail] = useState<string>("")

// Set email when loading user data (in the useEffect that loads profile)
useEffect(() => {
  const run = async () => {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user
    
    if (user?.email) {
      setUserEmail(user.email)
    }
    
    // ... rest of existing loading code
  }
  run()
}, [])
```

### 2. Update Custom Quota Form
In the `isQuotaModalOpen` modal, pre-fill the email input:

```typescript
// Find this input in the quota modal form:
<input
  type="email"
  className="px-4 py-2 border border-slate-300 rounded-lg w-full"
  placeholder="Email Address"
  defaultValue={userEmail}  // ADD THIS
  required
/>
```

### 3. Check If There's a Separate Onboarding Flow
Looking at the code, there's `isOnboardingOpen` state. Check if that flow also asks for email. If so, pre-fill it there too.

The onboarding steps (1, 2, 3) don't seem to collect email — they just show intro content. But verify:

- Step 1: "Welcome to DocStandard" — no form
- Step 2: "The Process" — no form  
- Step 3: "Ready to Start" — no form

So the main issue is the Custom Quota form.

### 4. Also Pre-fill Other Known Fields
While you're at it, pre-fill other known data in the Custom Quota form:

```typescript
// Pre-fill company name if available
<input
  type="text"
  className="px-4 py-2 border border-slate-300 rounded-lg w-full"
  placeholder="Company Name"
  defaultValue={profile?.company || ""}  // Pre-fill if available
  required
/>

<input
  type="text"
  className="px-4 py-2 border border-slate-300 rounded-lg w-full"
  placeholder="Contact Name"
  defaultValue={profile?.full_name || ""}  // Pre-fill if available
  required
/>
```

### 5. Alternative: Use Controlled Inputs with State
If using `defaultValue` causes issues (React warnings), use controlled inputs:

```typescript
// Add state for form
const [quotaForm, setQuotaForm] = useState({
  companyName: profile?.company || "",
  contactName: profile?.full_name || "",
  email: userEmail || "",
  phone: "",
  pagesPerMonth: "",
  filesPerMonth: "",
  frequency: "",
  requirements: "",
})

// Update when profile/email loads
useEffect(() => {
  setQuotaForm(prev => ({
    ...prev,
    companyName: profile?.company || "",
    contactName: profile?.full_name || "",
    email: userEmail || "",
  }))
}, [profile, userEmail])

// Use in inputs
<input
  type="email"
  value={quotaForm.email}
  onChange={(e) => setQuotaForm(prev => ({ ...prev, email: e.target.value }))}
  className="px-4 py-2 border border-slate-300 rounded-lg w-full"
  required
/>
```

## Testing Steps
1. Sign up as new user with email
2. Complete onboarding flow
3. Click "Request Custom Quota" button (or any form that asks for email)
4. Email field should already be filled with the email you signed up with
5. Company and Contact Name should also be pre-filled if you entered them in profile

## Files to Modify
- Modify: `app/(app)/dashboard/page.tsx`

## Related
This complements the "Profile Save" prompt — once profile save works, the pre-filled company/name will actually be useful data.

## Quick Fix Summary
```typescript
// Add near other state (line ~60)
const [userEmail, setUserEmail] = useState("")

// In load useEffect (around line ~130)
if (user?.email) setUserEmail(user.email)

// In quota modal form (around line ~1690)
<input ... defaultValue={userEmail} />
```
