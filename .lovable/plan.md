

# Add Per-Item "Terakhir Diubah" Timestamps

## Overview
Instead of one timestamp per section, track last-modified per individual item (each pegawai, kegiatan, ekskul, dokumen). For single-object sections (profil, sambutan, kontak, logo), the existing section-level timestamp is already sufficient.

## Changes

### 1. `src/contexts/SchoolContext.tsx` — Add `lastModified` field to item interfaces
- Add optional `lastModified?: string` to `Pegawai`, `Kegiatan`, `Ekstrakurikuler`, and `Dokumen` interfaces
- In each update function, keep the existing section-level timestamp (no change needed there)

### 2. `src/pages/admin/AdminPegawai.tsx` — Set timestamp on save
- When saving (add or edit), set `lastModified: new Date().toISOString()` on the individual pegawai item
- Display the timestamp in the table as a small muted text in each row (new column or below the name)

### 3. `src/pages/admin/AdminKegiatan.tsx` — Set timestamp on save
- Same pattern: stamp each kegiatan item on save
- Show per-row timestamp in the table

### 4. `src/pages/admin/AdminEkskul.tsx` — Set timestamp on save
- Same pattern for each ekstrakurikuler item

### 5. `src/pages/admin/AdminDokumen.tsx` — Set timestamp on save
- Same pattern for each dokumen item

### Display format
Each table row shows a small `text-xs text-muted-foreground` line with the formatted date below the item name, e.g. "Diubah: 9 April 2026, 14:30". Only shown if the item has been modified.

### Pages with single content (no change needed)
AdminProfil, AdminSambutan, AdminKontak, AdminLogo already show section-level timestamps which is sufficient since they are single-content pages.

