

# Pisahkan Admin Sosmed dari Halaman Kontak

## Masalah
Halaman Kontak di website utama saat ini mengambil data sosial media dari `data.sosialMedia` (admin sosmed), padahal seharusnya menggunakan data dari `data.kontak` (admin kontak) yang sudah punya field instagram dan youtube sendiri.

Selain itu, ada error runtime karena localStorage lama belum punya field `sosialMedia`.

## Perubahan

### 1. `src/pages/Kontak.tsx`
- Ubah `data.sosialMedia.instagram` → `data.kontak.instagram`
- Ubah `data.sosialMedia.youtube` → `data.kontak.youtube`
- Halaman Kontak sepenuhnya hanya pakai data dari Admin Kontak

### 2. `src/contexts/SchoolContext.tsx`
- Tambahkan fallback saat load dari localStorage: jika `sosialMedia` undefined, gunakan default agar tidak error

### 3. Tidak diubah
- **Footer** tetap pakai `data.sosialMedia` (terhubung ke admin sosmed) — sesuai permintaan
- **FloatingEmail** tetap pakai `data.sosialMedia.email` (terhubung ke admin sosmed)

## Ringkasan
- Admin Kontak → mengatur data di halaman Kontak (alamat, telepon, email, instagram, youtube, maps)
- Admin Sosial Media → mengatur icon di Footer & email di FloatingEmail

