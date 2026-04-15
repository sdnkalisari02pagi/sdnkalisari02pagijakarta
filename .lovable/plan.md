

# Forgot Password — Options

Since the login system uses hardcoded credentials (`admin` / `admin123`) with no backend or database, a real "forgot password" flow isn't possible.

## Two options:

### Option A: Remove the link
Simply remove the "Forgot Password?" link since it serves no purpose with hardcoded credentials.

### Option B: Show a helpful message
When clicked, show a toast/dialog saying something like "Hubungi administrator untuk reset password" (Contact the administrator to reset your password).

## Recommendation
**Option B** — it's friendlier. When the link is clicked, show a toast notification with a message like "Silakan hubungi administrator untuk mereset password Anda."

### Changes
- **`src/pages/Login.tsx`**: Replace the `<a href="#">` with a button that triggers a toast notification using the existing `useToast` hook.

