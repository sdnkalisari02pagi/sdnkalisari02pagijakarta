

# Add "Terakhir Diubah" (Last Modified) Timestamps to Admin

## Overview
Track and display the last modified date/time for each content section in the admin panel, so it's clear when content was last changed.

## Changes

### 1. `src/contexts/SchoolContext.tsx` — Add timestamps to data model
- Add a `lastModified` object to `SchoolData`:
  ```ts
  lastModified: {
    logo?: string;
    pegawai?: string;
    kegiatan?: string;
    ekstrakurikuler?: string;
    dokumen?: string;
    profil?: string;
    sambutan?: string;
    kontak?: string;
  }
  ```
- Each update function (e.g. `updateKontak`, `updateProfil`, etc.) also sets the corresponding `lastModified` timestamp to `new Date().toISOString()`
- Default value: all fields undefined (no timestamp shown until first save)

### 2. All admin pages — Display timestamp
Add a small muted text below the page title or above the save button showing "Terakhir diubah: [formatted date/time]" when a timestamp exists. Pages affected:
- `AdminLogo.tsx` — shows `lastModified.logo`
- `AdminPegawai.tsx` — shows `lastModified.pegawai`
- `AdminKegiatan.tsx` — shows `lastModified.kegiatan`
- `AdminEkskul.tsx` — shows `lastModified.ekstrakurikuler`
- `AdminDokumen.tsx` — shows `lastModified.dokumen`
- `AdminProfil.tsx` — shows `lastModified.profil`
- `AdminSambutan.tsx` — shows `lastModified.sambutan`
- `AdminKontak.tsx` — shows `lastModified.kontak`

Format: Indonesian locale date+time, e.g. "9 April 2026, 14:30"

Display as a subtle line with a `Clock` icon: `🕐 Terakhir diubah: 9 April 2026, 14:30` below the `<h1>` title on each page.

