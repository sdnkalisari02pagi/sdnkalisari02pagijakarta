

# Drag-and-Drop Upload — Current Status & Remaining Work

## Already Done
The `ImageUpload` and `GaleriUpload` components were already updated with drag-and-drop support. This means the following admin pages **already have drag-and-drop**:
- **Logo** — uses `ImageUpload` ✅
- **Pegawai** — uses `ImageUpload` ✅
- **Kegiatan** — uses `ImageUpload` ✅
- **Ekstrakurikuler** — uses `ImageUpload` + `GaleriUpload` ✅
- **Sambutan** — uses `ImageUpload` ✅
- **Profil Sekolah** — uses `ImageUpload` ✅

## Remaining: AdminDokumen
The Dokumen page currently only has a plain text input for "URL File" — no file upload at all. We need to replace it with a proper file upload component.

### Changes

#### `src/pages/admin/AdminDokumen.tsx`
- Replace the "URL File" text input with a new drag-and-drop file upload zone
- Add a drop zone with dashed border, `Upload` icon, and text "Seret file ke sini atau klik untuk unggah"
- Accept document files (PDF, DOC, DOCX, XLS, XLSX) in addition to images
- On file drop/select, convert to base64 data URL and store in `form.url`
- Show the uploaded file name after upload
- Max file size: 2MB
- Visual feedback on drag-over (highlighted border)

