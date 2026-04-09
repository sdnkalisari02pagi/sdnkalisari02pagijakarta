

# Replace URL Photo Inputs with File Upload in Admin Dashboard

## Overview
Replace all "URL Foto" text inputs across admin pages with a file upload button. Since there's no backend/storage service connected, uploaded images will be converted to base64 data URLs and stored in localStorage via the existing SchoolContext.

## What Changes

### 1. Create a reusable `ImageUpload` component
- `src/components/ImageUpload.tsx`
- Accepts `value` (current image URL/base64), `onChange` callback, and optional `placeholder`
- Shows a file input styled as a button ("Unggah Foto") with an Upload icon
- Shows image preview if a value exists, with a remove/clear button
- Accepts image files only (jpg, png, webp)
- Converts selected file to base64 data URL via `FileReader`
- Limits file size (e.g. 2MB) with a toast warning if exceeded

### 2. Update 5 admin pages to use `ImageUpload` instead of URL Input

| Page | Field replaced |
|------|---------------|
| `AdminPegawai.tsx` | "URL Foto" for staff photo |
| `AdminKegiatan.tsx` | "URL Foto" for activity photo |
| `AdminEkskul.tsx` | "URL Foto" for extracurricular photo |
| `AdminSambutan.tsx` | "URL Foto" for headmaster photo |
| `AdminProfil.tsx` | "URL Foto" for school photo |

Each page: replace the `<Label>URL Foto</Label><Input .../>` block with `<ImageUpload value={form.foto} onChange={url => setForm(f => ({...f, foto: url}))} />`.

## Technical Notes
- Base64 storage in localStorage is fine for this scale (small number of images)
- Existing fallback URLs (ui-avatars, placehold.co) remain as defaults when no image is uploaded
- No backend or external storage needed

