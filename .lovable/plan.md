

# Tambah Fitur Pilih Bahasa (Indonesia & Inggris)

## Pendekatan

Membuat Language Context dengan toggle ID/EN yang tersimpan di localStorage. Semua teks statis di website utama akan menggunakan translation dictionary. Konten dinamis dari admin (kegiatan, ekskul, sambutan, dll) tetap dalam Bahasa Indonesia karena dikelola admin.

## Yang Akan Dibuat/Diubah

### 1. Buat `src/contexts/LanguageContext.tsx`
- Context dengan state `lang: 'id' | 'en'`, fungsi `setLang`, dan helper `t(key)` untuk lookup terjemahan
- Persist pilihan bahasa ke localStorage

### 2. Buat `src/lib/translations.ts`
- Dictionary teks statis ID & EN untuk semua halaman publik:
  - Navbar: Profil, Sejarah, Visi & Misi, Pegawai, Kegiatan, Ekstrakurikuler, Layanan, Kontak, Login
  - Hero: button labels, stat labels
  - Section headings: Sambutan Kepala Sekolah, Kenapa Memilih Kami, Ekstrakurikuler, Kegiatan Terbaru, dll
  - Halaman Kontak: Alamat, Telepon, Email
  - Halaman Profil: tab labels, headings
  - Footer teks
  - Tombol-tombol: Lihat Semua, Kirim Masukan, dll

### 3. Tambah Language Switcher di Navbar (`src/components/Navbar.tsx`)
- Tombol kecil berupa flag/text toggle (ID | EN) di sebelah kiri tombol Login
- Di mobile menu juga ditampilkan

### 4. Wrap App dengan LanguageProvider (`src/App.tsx`)

### 5. Update semua halaman publik
- `Index.tsx` — heading, button text, stat labels
- `Navbar.tsx` — menu labels
- `Kontak.tsx` — headings, labels
- `Profil.tsx` — tab labels, headings
- `KegiatanPage.tsx` — heading
- `EkstrakurikulerPage.tsx` — heading
- `Layanan.tsx` — heading, labels
- `Footer.tsx` — teks statis
- `EkstrakurikulerDetail.tsx` — labels

Semua string hardcoded diganti dengan `t('key')`.

## Catatan
- Konten dinamis (deskripsi kegiatan, nama ekskul, sambutan, dll) tetap bahasa asli dari admin — hanya UI labels yang diterjemahkan
- Admin panel tidak terpengaruh, tetap Bahasa Indonesia

