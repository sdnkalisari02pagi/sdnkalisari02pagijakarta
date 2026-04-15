

# Admin Floating Email + Admin Footer

## Overview
Buat 2 admin page baru:
1. **Admin Floating Email** — untuk mengatur email tujuan floating email (default: kalisari02pagi@gmail.com)
2. **Admin Footer** — untuk mengatur konten footer (nama sekolah, deskripsi, link Instagram, link YouTube)

## Perubahan

### 1. SchoolContext — tambah data & update functions
- Tambah interface `FooterData` dengan field: `namaSekolah`, `deskripsi`, `instagram`, `youtube`
- Tambah field `floatingEmail` (string) dan `footer` (FooterData) di `SchoolData`
- Tambah default values
- Tambah `updateFloatingEmail` dan `updateFooter` functions
- Tambah `floatingEmail` dan `footer` di `LastModified`

### 2. Buat `src/pages/admin/AdminFloatingEmail.tsx`
- Form sederhana dengan 1 input field: Email Sekolah
- Tombol Simpan yang memanggil `updateFloatingEmail`
- Tampilkan LastModifiedInfo

### 3. Buat `src/pages/admin/AdminFooter.tsx`
- Form dengan field: Nama Sekolah, Deskripsi, Link Instagram, Link YouTube
- Tombol Simpan yang memanggil `updateFooter`
- Tampilkan LastModifiedInfo

### 4. Update `FloatingEmail.tsx`
- Ganti `data.sosialMedia.email` → `data.floatingEmail`

### 5. Update `Footer.tsx`
- Ganti hardcoded "SDN Kalisari 02 Pagi" → `data.footer.namaSekolah`
- Ganti hardcoded deskripsi → `data.footer.deskripsi`
- Ganti `data.sosialMedia.instagram/youtube` → `data.footer.instagram/youtube`

### 6. Update `AdminLayout.tsx`
- Tambah 2 menu item: "Floating Email" dan "Footer" di sidebar

### 7. Update `App.tsx`
- Tambah 2 route: `/admin/floating-email` dan `/admin/footer`

