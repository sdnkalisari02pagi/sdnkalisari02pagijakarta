

# Add Logo Upload to Admin Dashboard

## Overview
Currently the website logo is a hardcoded `GraduationCap` icon. Add a `logo` field to the school data and an admin section to upload/change it. The uploaded logo will appear in the Navbar and Admin Sidebar.

## Changes

### 1. `src/contexts/SchoolContext.tsx`
- Add `logo: string` to `SchoolData` interface (default: empty string)
- Add `updateLogo` function to context

### 2. New admin menu item in `AdminLayout.tsx`
- Add "Logo" menu item linking to `/admin/logo` with an `Image` icon

### 3. New page: `src/pages/admin/AdminLogo.tsx`
- Simple page with `ImageUpload` component to upload/change the logo
- Shows current logo preview
- Save button updates context

### 4. `src/App.tsx`
- Add route `/admin/logo` → `AdminLogo`

### 5. `src/components/Navbar.tsx`
- If `data.logo` exists, show `<img>` instead of `GraduationCap` icon

### 6. `src/components/AdminLayout.tsx`
- If `data.logo` exists, show `<img>` instead of `GraduationCap` icon in sidebar header

