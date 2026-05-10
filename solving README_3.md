# Mobile Bug Fix — Azan Coaching Center

Fixes two mobile-specific bugs in the `azan-coaching` Next.js project.

---

## Project Info

| Field | Value |
|-------|-------|
| Project | Sir Azan Coaching Center |
| Stack | Next.js 16, React 19, Supabase, Tailwind CSS v4 |
| Bugs Fixed | 2 |
| Files Modified | 3 |

---

## Bugs & Fixes

### Bug 1 — Admin Login Doesn't Work on Mobile

**Symptoms**
- Tapping "Sign In" on mobile either freezes the button permanently, or navigates to the dashboard and immediately redirects back to the login page.

**Root Causes**

| # | File | Problem |
|---|------|---------|
| A | `src/app/(admin)/admin/login/page.tsx` | `setLoading(false)` is never called on successful login. On slow mobile connections, `router.push()` takes time — the button stays disabled and appears broken. |
| B | `src/app/(admin)/layout.tsx` | Race condition: when `router.push('/admin/dashboard')` fires after login, `isLoginPage` flips to `false` and the `useEffect` auth guard triggers before the component has fully hydrated, calling `isAuthenticated()` too early and sending the user back to `/admin/login`. |

**Fixes**
- Added `setLoading(false)` before `router.push()` on successful login.
- Added a `mounted` state in `AdminLayout` so the auth check only runs after the component has fully hydrated on the client.
- Added `if (!mounted && !isLoginPage) return null` to prevent a flash of dashboard content before auth is confirmed.

---

### Bug 2 — Admission Form Stuck on Step 1 on Mobile

**Symptoms**
- Tapping "Next" on step 1 of the admission form does nothing. The form never advances to step 2.

**Root Causes**

| # | File | Problem |
|---|------|---------|
| A | `src/app/(admission)/page.tsx` | iOS and Android autocomplete fills the phone field in international format `+923XXXXXXXXX`. After stripping non-digits this becomes `923XXXXXXXXX` (12 digits). The validation regex `^03\d{9}$` only accepts `03XXXXXXXXX` (11 digits) — so validation always fails silently when autocomplete is used. |
| B | `src/app/(admission)/page.tsx` | When validation fails, error messages appear above the fold. The user has already scrolled down to the button so the errors are invisible — they tap "Next" repeatedly thinking it is broken. |

**Fixes**
- Updated `normalizePhone` to detect and convert `+923XXXXXXXXX` and `923XXXXXXXXX` international format to `03XXXXXXXXX` before running the regex.
- Updated `handleNext` to scroll to the first validation error on failure using a `data-error` attribute.
- Added `data-error="true"` on the `<input>` element inside the `Input` component to enable error-targeted scrolling.

---

## Files Modified

```
src/
├── app/
│   ├── (admin)/
│   │   ├── layout.tsx                   ← Bug 1B: mounted guard
│   │   └── admin/login/page.tsx         ← Bug 1A: setLoading fix
│   └── (admission)/
│       └── page.tsx                     ← Bug 2A + 2B: phone + scroll fix
```

---

## Why Mobile Only

Both bugs are invisible on desktop because:

- `router.push()` is near-instant on desktop so the missing `setLoading(false)` is never noticeable
- React hydration is faster on desktop so the auth guard race condition never surfaces
- Desktop browsers do not autocomplete phone fields in international format the same way mobile does
- Desktop viewports are large enough that validation errors are always visible without scrolling

These bugs only appear on real mobile devices or slow network connections and would not be caught during normal local development.

---

## Verification

After applying the fixes run:

```bash
npm run build
```

Then test on a real mobile device or browser DevTools mobile emulation:

- Go to `/admin/login`, enter password `123456`, tap Sign In — should land on dashboard
- Go to `/admission`, fill the form using phone autocomplete, tap Next — should advance to step 2
