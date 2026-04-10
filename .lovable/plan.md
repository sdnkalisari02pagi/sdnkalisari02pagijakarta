

# Floating Email Popup + Admin Sosial Media

## Overview
1. Convert the floating email button into a popup contact form with yellow background
2. Add a dedicated Admin Sosial Media page to manage Instagram, YouTube, and Email
3. Connect social media data from admin to all public-facing icons (Footer, Kontak page, FloatingEmail)

## Detailed Changes

### 1. Add `sosialMedia` to SchoolContext (`src/contexts/SchoolContext.tsx`)
- Add new interface `SosialMedia` with fields: `instagram`, `youtube`, `email`
- Add `sosialMedia` to `SchoolData` with defaults from current `kontak` values
- Add `updateSosialMedia` function
- Add `sosialMedia` to `LastModified`

### 2. Update FloatingEmail (`src/components/FloatingEmail.tsx`)
- Replace simple `<a>` with a button that toggles a Dialog popup
- Popup has **yellow background** (`bg-yellow-400` or similar)
- Form fields: Nama, Email Pengirim, Judul, Deskripsi (textarea)
- Send button creates a `mailto:` link with the fields pre-filled (subject = Judul, body = "Dari: Nama\nEmail: email\n\nDeskripsi")
- The target email comes from `data.sosialMedia.email` via `useSchool()`

### 3. Create Admin Sosial Media page (`src/pages/admin/AdminSosialMedia.tsx`)
- Simple form with 3 fields: Instagram URL, YouTube URL, Email
- Save button calls `updateSosialMedia()`
- Shows LastModifiedInfo

### 4. Register Admin Sosial Media route
- Add to `App.tsx`: `<Route path="sosial-media" element={<AdminSosialMedia />} />`
- Add to `AdminLayout.tsx` sidebar menu: `{ title: 'Sosial Media', url: '/admin/sosial-media', icon: Share2 }`

### 5. Update public components to use `sosialMedia`
- **Footer**: change `data.kontak.instagram` → `data.sosialMedia.instagram`, same for YouTube
- **Kontak page**: change social media links to use `data.sosialMedia`
- Optionally remove instagram/youtube/email from AdminKontak (since they now live in AdminSosialMedia)

### Technical Notes
- No backend needed; data stored in localStorage via existing SchoolContext pattern
- The mailto approach works without any email service — clicking Send opens the user's email client with pre-filled fields
- All social media icons across the site (Footer, Kontak, FloatingEmail) will dynamically reflect admin changes

