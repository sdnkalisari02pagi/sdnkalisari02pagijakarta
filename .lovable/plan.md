

# Redesign Hero Section — Layout Split Kiri-Kanan

Terinspirasi dari gambar referensi, Hero akan diubah dari full-width carousel overlay menjadi layout dua kolom dengan background gradient lembut.

## Perubahan Utama

### `src/pages/Index.tsx` — Hero Section (baris 52-122)

Ganti seluruh section Hero menjadi layout baru:

**Layout:**
- Background: gradient lembut (dari primary/5 via secondary/5 ke accent/5) — bukan foto fullscreen lagi
- **Kolom kiri** (teks):
  - Badge kecil di atas: "Sekolah Unggulan Jakarta Timur" (pill/chip dengan ikon)
  - Nama sekolah: `data.profil` atau teks sederhana "SDN Kalisari 02 Pagi"
  - Heading besar dengan warna gradient (primary → secondary): `hero.judul`
  - Subtitle paragraph: `hero.subtitle`
  - 2 tombol CTA: "Kirim Masukan Anda" (link ke `/kontak`) dan "Lihat Guru & Staff" (link ke `/profil?tab=pegawai`)
  - 3 stat cards di bawah: Guru & Staff (`data.pegawai.length`), Ekstrakurikuler (`data.ekstrakurikuler.length`), dan Tahun Berdiri (statis)

- **Kolom kanan** (gambar):
  - Image carousel dengan rounded corners besar (`rounded-2xl`)
  - Shadow lembut
  - Dot indicators di bawah gambar (bukan di bawah section)
  - Tanpa arrow buttons — navigasi hanya via dots + auto-play

**Responsif:**
- Desktop: grid 2 kolom
- Mobile: stack vertikal (teks di atas, gambar di bawah)

### `src/pages/admin/AdminHero.tsx` — Tidak perlu diubah
Data model tetap sama (`images`, `judul`, `subtitle`), jadi admin panel tidak perlu berubah.

### `src/index.css` — Tambah gradient text utility (jika belum ada)
Tambah class `.text-gradient` untuk heading dengan gradient warna primary ke secondary.

