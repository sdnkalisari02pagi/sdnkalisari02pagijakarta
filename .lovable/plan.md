

# Add Search/Filter to Admin Kegiatan and Ekstrakurikuler

## Changes

### 1. `src/pages/admin/AdminKegiatan.tsx`
- Add search state and filter bar (same style as AdminPegawai)
- Search by judul, filter results in table

### 2. `src/pages/admin/AdminEkskul.tsx`
- Add search state and filter bar
- Search by nama, filter results in table

Both will use the same layout pattern: a search input with `Search` icon, placed between the header and the table.

