

# Website SDN Kalisari 02 Pagi

## Overview
Website sekolah dasar modern, colorful, dan responsif dengan halaman publik dan dashboard admin. Data disimpan menggunakan React state dengan localStorage untuk persistensi (dapat di-upgrade ke Supabase nanti).

## Design System
- **Warna**: Kuning (#F59E0B), Biru (#2563EB), Putih — sebagai tema utama
- **Style**: Card modern dengan shadow, rounded corners, animasi hover
- **Responsive**: Mobile-first design

## Halaman Publik

### 1. Landing Page (Home)
- **Navbar**: Logo, nama sekolah, menu navigasi (Profil, Kegiatan, Ekstrakurikuler, Layanan, Kontak), tombol Login
- **Hero Section**: Background dengan overlay gelap, judul besar, jumlah pegawai dinamis
- **Sambutan Kepala Sekolah**: Foto placeholder berhijab, nama Ibu Nuroyanah M.Pd, paragraf sambutan
- **Kenapa Memilih Kami**: 4 poin keunggulan dengan icon
- **Kegiatan Terbaru**: 3-6 card kegiatan, tombol "Lihat Semua"
- **Footer**: Alamat, email, link Instagram & YouTube
- **Floating email button**: Icon email di pojok kanan bawah, klik → mailto:kalisari02pagi@gmail.com

### 2. Profil
- Sub-halaman: Sejarah (dengan foto), Visi Misi Tujuan, Daftar Pegawai
- Pegawai: Card grid (foto, nama, jabatan), search & filter jabatan

### 3. Kegiatan
- List kegiatan/berita dengan judul, tanggal, foto
- Search & filter tanggal

### 4. Ekstrakurikuler
- Grid 3 kolom: Pramuka, Pantomim, Tari, Qasidah, Marawis, Menggambar
- Card dengan foto & nama, klik → halaman detail (galeri + deskripsi)

### 5. Layanan
- List dokumen downloadable (nama file, tanggal)
- Search & filter tanggal

### 6. Kontak
- Google Maps embed, alamat, telepon, email, Instagram

### 7. Login
- Form username & password, link forgot password, redirect ke dashboard

## Dashboard Admin (setelah login)

### Layout
- Sidebar dengan menu: Dashboard, Pegawai, Kegiatan, Ekstrakurikuler, Dokumen, Profil Sekolah, Sambutan, Kontak, Logout

### Fitur CRUD
- **Dashboard**: Statistik ringkasan (jumlah pegawai, kegiatan, ekskul, dokumen)
- **Pegawai**: CRUD (foto, nama, jabatan) + search/filter
- **Kegiatan**: CRUD (judul, tanggal, foto, deskripsi)
- **Ekstrakurikuler**: CRUD (judul, foto, deskripsi)
- **Dokumen**: CRUD + search/filter
- **Profil**: Edit sejarah, visi misi
- **Sambutan**: Edit teks & foto kepala sekolah
- **Kontak**: Edit maps embed, alamat, email, sosmed

## Data
- Dummy data lengkap untuk semua section
- Data management via React Context + localStorage
- Login sederhana dengan hardcoded credentials (admin/admin123)

## Teknologi
- React + TypeScript + Tailwind CSS
- React Router untuk navigasi
- Lucide icons
- shadcn/ui components

