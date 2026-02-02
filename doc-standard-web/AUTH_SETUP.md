# Authentication Setup Guide

## ✅ What's Implemented

- **Email/Password Authentication** via Supabase Auth
- **Middleware** for session management and route protection
- **Protected Routes**: `/upload`, `/dashboard`, `/checkout`
- **Auth Callback** handler for email confirmations
- **Server Actions** for sign up, sign in, sign out

## 🔑 Environment Variables

Create a `.env.local` file in the project root with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ufmjsgwetwutyzayqtng.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_P2kZKXGb0h-1H6z9_XcG1A_SQ-W7QnV
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe (already configured)
STRIPE_SECRET_KEY=your-stripe-secret-key-here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key-here
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret-here
```

### Finding Your Service Role Key

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **API**
4. Scroll to **Project API keys**
5. Find the **`service_role`** key (labeled as "secret")
6. Click the eye icon to reveal it
7. Copy and paste into `.env.local`

⚠️ **Never commit this key to git!**

## 🌐 Supabase Dashboard Configuration

### 1. Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Save changes

### 2. Configure URL Settings

Go to **Authentication** → **URL Configuration**

#### For Development:
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: 
  - `http://localhost:3000/auth/callback`

#### For Production (when deployed):
- **Site URL**: `https://yourdomain.com` (e.g., `https://docstandard.co`)
- **Redirect URLs**:
  - `https://yourdomain.com/auth/callback`
  - `https://www.yourdomain.com/auth/callback`

### 3. Email Template Settings (Optional)

For easier testing, disable email confirmation:

1. Go to **Authentication** → **Email Templates**
2. Under **Confirm signup**, toggle off "Enable email confirmations"

⚠️ **For production**: Re-enable email confirmations for security!

## 🧪 Testing Authentication

### Test Sign Up

1. Start dev server: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Enter email and password (min. 6 characters)
4. Click **Register**
5. If email confirmation is enabled, check your email
6. Should redirect to `/dashboard`

### Test Sign In

1. Toggle to "Sign In" mode on login page
2. Enter credentials
3. Click **Sign In**
4. Should redirect to `/dashboard`

### Test Protected Routes

Try accessing these URLs without being logged in:
- `http://localhost:3000/upload` → Redirects to `/login`
- `http://localhost:3000/dashboard` → Redirects to `/login`
- `http://localhost:3000/checkout` → Redirects to `/login`

## 🛠️ How It Works

### Middleware (`middleware.ts`)
- Runs on every request
- Checks if user is authenticated
- Protects routes: `/upload`, `/dashboard`, `/checkout`
- Redirects unauthenticated users to `/login`
- Redirects authenticated users away from `/login` to `/dashboard`

### Auth Actions (`lib/actions/auth.ts`)
- `signUp(data)` - Creates new user with email/password
- `signIn(data)` - Signs in existing user
- `signOut()` - Logs out current user
- `getUser()` - Gets current authenticated user

### Auth Callback (`app/auth/callback/route.ts`)
- Handles OAuth redirects and email confirmations
- Exchanges auth code for session
- Redirects to dashboard or specified page

### Login Page (`app/(marketing)/login/page.tsx`)
- Toggle between Sign Up and Sign In modes
- Form validation and error handling
- Loading states
- Integrates with Supabase Auth via server actions

## 🔒 Security Features

✅ **Row Level Security (RLS)** - Already enabled on all tables  
✅ **Protected Routes** - Middleware blocks unauthenticated access  
✅ **Secure Sessions** - Cookie-based auth with `@supabase/ssr`  
✅ **HTTPS Only** - Cookies only sent over secure connections  
✅ **Service Role Isolation** - Admin key never exposed to client  

## 🚀 Next Steps

After authentication is working:

1. **Create Dashboard Page** (`app/(app)/dashboard/page.tsx`)
   - Show user's orders
   - Link to upload new documents
   - Display processing status

2. **Update Upload Page** (`app/(app)/upload/page.tsx`)
   - Already has auth checks via middleware
   - Uses `auth.uid()` for user association

3. **Add User Profile** (optional)
   - Display user email
   - Sign out button
   - Account settings

## 📚 Supabase Auth Documentation

- [Auth Helpers for Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Email Auth](https://supabase.com/docs/guides/auth/auth-email)
- [Server-Side Auth](https://supabase.com/docs/guides/auth/server-side)

## 🐛 Troubleshooting

### "Invalid login credentials"
- Check email/password are correct
- Verify user exists in **Authentication** → **Users** in dashboard
- Check if email confirmation is required

### "Failed to fetch"
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Restart dev server after changing `.env.local`

### Redirect not working
- Check **URL Configuration** in Supabase Dashboard
- Verify `NEXT_PUBLIC_SITE_URL` matches your domain
- Clear browser cookies and try again

### "User already registered"
- User exists in database
- Use "Sign In" instead of "Sign Up"
- Or create new user with different email

---

**Authentication is now ready to use!** 🎉

Test it thoroughly before deploying to production.
