

# Add Jabatan (Position) Management to Admin Pegawai

## Overview
Add a jabatan management feature so admins can maintain a list of positions, then select from that list when adding/editing pegawai (instead of free-text input).

## Changes

### 1. `src/contexts/SchoolContext.tsx`
- Add `jabatanList: string[]` to `SchoolData` interface with default values extracted from existing pegawai data (e.g. "Kepala Sekolah", "Guru Kelas 1", etc.)
- Add `updateJabatanList` function to context
- Add `lastModified.jabatan` tracking

### 2. `src/pages/admin/AdminPegawai.tsx`
- Add a "Kelola Jabatan" button (next to "Tambah" button) that opens a Dialog
- In the dialog: show list of all jabatan with delete button on each, plus an input + "Tambah" button to add new jabatan
- Prevent deleting a jabatan that is currently used by a pegawai (show warning)
- Change the jabatan field in the add/edit pegawai form from free-text `Input` to a `Select` dropdown populated from `data.jabatanList`

## Technical Details
- Jabatan list stored in `SchoolData.jabatanList` and persisted via localStorage (same as other data)
- Default jabatan list: unique values from existing default pegawai data
- The filter dropdown in the pegawai table will also use `data.jabatanList` instead of deriving from current pegawai

