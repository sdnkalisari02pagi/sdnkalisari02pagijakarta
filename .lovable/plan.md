

# Add Gallery Management to Admin Ekskul

## Overview
The `Ekstrakurikuler` type already has a `galeri: string[]` field, and the detail page displays it. Add gallery editing to the admin ekskul dialog so admins can add/remove gallery photos.

## Changes

### `src/pages/admin/AdminEkskul.tsx`
- Add `galeri: string[]` to the form state (initialize from edit item or empty array)
- Below the Deskripsi field in the dialog, add a "Galeri" section:
  - Show existing gallery images as small thumbnails with a remove (X) button each
  - Add an `ImageUpload`-style file input button ("Tambah Foto Galeri") that appends new images to the array
  - Use `FileReader` to convert to base64, same as `ImageUpload`
- Pass `galeri` through when saving (both add and edit)

### `src/components/GaleriUpload.tsx` (new)
- Reusable component accepting `value: string[]` and `onChange: (urls: string[]) => void`
- Displays thumbnail grid of current images with remove buttons
- Has an "Tambah Foto" button to add more images (same 2MB limit, JPG/PNG)
- Shows helper text "Maksimal 2MB per foto, format JPG/PNG"

