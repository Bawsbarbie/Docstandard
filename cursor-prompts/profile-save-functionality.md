# Cursor Prompt: Profile Save Functionality

## Goal
Wire up the "Save Changes" button on the Profile page so it actually saves user data to the database. Currently, it's UI-only.

## Current State
**File:** `app/(app)/dashboard/page.tsx`

The Profile page has:
- Form inputs for Full Name, Email, Company
- State management: `profileForm` 
- "Save Changes" button that does nothing

```typescript
// Current (non-functional) code:
<button
  type="button"
  className="bg-[#2563eb] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1d4ed8]"
>
  Save Changes
</button>
```

## Required Changes

### 1. Create Server Action for Profile Update
**File:** `lib/actions/profile.ts` (create new)

```typescript
"use server"

import { createClient } from "@/lib/supabase/server"

export interface UpdateProfileInput {
  full_name?: string
  company?: string
  // Note: Email updates are handled separately via Supabase Auth
}

export async function updateProfile(input: UpdateProfileInput): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: userData, error: authError } = await supabase.auth.getUser()
    
    if (authError || !userData.user) {
      return { success: false, error: "Not authenticated" }
    }
    
    const userId = userData.user.id
    
    // Update profile in database
    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        full_name: input.full_name,
        company: input.company,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "id"
      })
    
    if (error) {
      console.error("Error updating profile:", error)
      return { success: false, error: error.message }
    }
    
    return { success: true, error: null }
  } catch (error) {
    console.error("Exception updating profile:", error)
    return { success: false, error: "Failed to update profile" }
  }
}

// Optional: Update email via Supabase Auth
export async function updateEmail(newEmail: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    })
    
    if (error) {
      return { success: false, error: error.message }
    }
    
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: "Failed to update email" }
  }
}
```

### 2. Wire Up Save Button in Dashboard
**File:** `app/(app)/dashboard/page.tsx`

Add state and handler:

```typescript
// Add to existing state
const [isSavingProfile, setIsSavingProfile] = useState(false)
const [profileSaveMessage, setProfileSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

// Add handler
const handleSaveProfile = async () => {
  setIsSavingProfile(true)
  setProfileSaveMessage(null)
  
  const { success, error } = await updateProfile({
    full_name: profileForm.fullName,
    company: profileForm.company,
    // Email is handled separately via Supabase Auth
  })
  
  if (success) {
    setProfileSaveMessage({ type: "success", text: "Profile saved successfully!" })
    // Update local profile state
    setProfile(prev => prev ? { ...prev, full_name: profileForm.fullName, company: profileForm.company } : null)
  } else {
    setProfileSaveMessage({ type: "error", text: error || "Failed to save profile" })
  }
  
  setIsSavingProfile(false)
  
  // Clear message after 3 seconds
  setTimeout(() => setProfileSaveMessage(null), 3000)
}

// Update the save button section
<div className="mt-6 flex justify-end items-center gap-4">
  {profileSaveMessage && (
    <span className={`text-sm ${profileSaveMessage.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
      {profileSaveMessage.text}
    </span>
  )}
  <button
    type="button"
    onClick={handleSaveProfile}
    disabled={isSavingProfile}
    className="bg-[#2563eb] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isSavingProfile ? "Saving..." : "Save Changes"}
  </button>
</div>
```

### 3. Considerations for Email Updates
Email is part of `profileForm` but updating it requires Supabase Auth, not just the profiles table. Options:

**Option A (Recommended for MVP):** Make email read-only in profile form
```typescript
<input
  type="email"
  value={profileForm.email}
  disabled
  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed"
/>
<p className="text-xs text-slate-500 mt-1">Contact support to change your email</p>
```

**Option B:** Add separate email update flow with verification
- Call `updateEmail()` server action
- Supabase sends verification email
- User clicks link to confirm

For 5-10 user validation, Option A is fine.

### 4. Verify Profiles Table Exists
Check that the `profiles` table exists with RLS. From your migrations, it should:

```sql
-- profiles table should exist with:
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company TEXT,
  tier TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
```

## Testing Steps
1. Go to Profile page
2. Change Full Name and Company
3. Click "Save Changes"
4. Should see "Profile saved successfully!" message
5. Refresh page — changes should persist
6. Check Supabase dashboard → profiles table → verify data saved

## Files to Create/Modify
- Create: `lib/actions/profile.ts`
- Modify: `app/(app)/dashboard/page.tsx` (add save handler and UI states)

## Edge Cases to Handle
- Empty form submission (allow it or show validation?)
- Very long names (database limit?)
- Special characters in company name
- User not authenticated (shouldn't happen, but handle gracefully)
