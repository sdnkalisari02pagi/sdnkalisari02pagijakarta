

# Change Admin Lists from Cards to Tables

## Overview
Replace the card grid layout in AdminPegawai, AdminKegiatan, and AdminEkskul with table layouts similar to AdminDokumen.

## Changes

### 1. `src/pages/admin/AdminPegawai.tsx`
- Remove card grid, replace with `<Table>` component
- Columns: Foto (small thumbnail), Nama, Jabatan, Aksi (edit/delete buttons aligned right)
- Keep search and filter functionality as-is

### 2. `src/pages/admin/AdminKegiatan.tsx`
- Remove card grid, replace with `<Table>`
- Columns: Foto (small thumbnail), Judul, Tanggal, Aksi

### 3. `src/pages/admin/AdminEkskul.tsx`
- Remove card grid, replace with `<Table>`
- Columns: Foto (small thumbnail), Nama, Aksi

Each table will show the photo as a small rounded thumbnail (e.g. 40x40px) in the first column, keeping the layout compact and consistent with the Dokumen page style.

