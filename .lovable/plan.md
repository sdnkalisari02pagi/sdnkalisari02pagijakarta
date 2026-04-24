

# Restrukturisasi Besar: Navigasi, Berita/Prestasi, Pelatih, Filter & Pagination

Total 14 perubahan terkait. Saya kelompokkan agar mudah ditinjau.

## A. Restrukturisasi Navigasi & Konten (Item 6, 7, 8)

**Navbar baru:**
- **Profil** (dropdown): Sejarah, Visi & Misi, Pegawai, **Siswa** (baru)
- **Berita** (baru, ex-Kegiatan)
- **Kegiatan** (dropdown saja): Ekstrakurikuler, **Prestasi** (baru)
- **Dokumen** (rename dari Layanan)
- **Kontak**

**Admin sidebar:**
- `Kegiatan` → rename **Berita** (route `/admin/berita`)
- Tambah **Prestasi** (`/admin/prestasi`) — struktur sama persis seperti Berita
- Halaman publik baru: `/berita`, `/berita/:id`, `/prestasi`, `/prestasi/:id`, `/profil/siswa` (atau `?tab=siswa`)

## B. Berita & Prestasi — Foto/Video + Galeri + Detail Page (Item 9, 13)

**Skema data baru** (`SchoolContext`):
```ts
interface Berita {
  id, judul: Bilingual, tanggal, deskripsi: Bilingual,
  tipe: 'foto' | 'video',
  fotoUtama: string,        // wajib utk tipe foto (card)
  thumbnail: string,        // wajib utk tipe video (card)
  videoUrl: string,         // YouTube/TikTok/Instagram/GDrive
  galeri: string[],         // bilingual-friendly, opsional
  lastModified
}
// Prestasi: identik
```

**Admin form Berita/Prestasi:**
- Pilih tipe (Foto/Video) → form berubah sesuai
- Foto: upload `fotoUtama` + galeri multi
- Video: input `videoUrl` (auto-detect platform) + upload `thumbnail` + galeri
- Bilingual untuk judul & deskripsi

**Detail page (`/berita/:id`, `/prestasi/:id`):**
- Tombol "Kembali"
- Foto utama atau **embed video** (YouTube `/embed/`, TikTok blockquote, Instagram embed, GDrive `/preview`)
- Deskripsi
- Section Galeri: grid 3 kolom, klik → lightbox dialog

**Card di list page:** tombol "Selengkapnya" → navigate ke detail.

**Filter publik:** dropdown "Semua / Foto / Video" di samping search.

## C. Filter Sticky Sidebar + Pagination (Item 1, 8)

Komponen reusable baru:
- `FilterSidebar` (sticky kiri, lg:w-64, di mobile collapse jadi sheet/drawer)
- `PaginationBar` — prop: `total, perPage, onPerPageChange, options=[10,20,30,'all']`

**Layout halaman list** (Pegawai, Berita, Prestasi, Ekstrakurikuler, Dokumen, Siswa):
```text
+-------------------+--------------------------+
| Filter (sticky)   |  Grid items              |
| - search          |                          |
| - kategori        |                          |
| - perPage select  |  Pagination bottom       |
+-------------------+--------------------------+
```
Default per-page: Pegawai 30 · Berita/Prestasi/Ekskul/Dokumen 10 · Siswa 20.

## D. Ekstrakurikuler — Pelatih + Foto Utama + Galeri Lightbox (Item 2, 3, 10)

**Skema ekskul (tambahan):**
```ts
fotoUtama: string;  // wajib (card image)
pelatih: { nama: Bilingual; foto: string }[]; // max 3
```

**Admin:**
- Field "Foto Utama" (required, ada di atas)
- Section Pelatih: list dengan tombol "Tambah Pelatih" (disabled di 3), tiap item: nama bilingual + upload foto

**Public card:** menampilkan `fotoUtama`, di bawah nama → `Pelatih: A, B, C` (max 3 nama).

**Detail page:**
- `fotoUtama` di antara judul & deskripsi
- Section Pelatih (row, di antara deskripsi & galeri): foto bulat + nama, klik foto → dialog popup foto besar + nama
- Galeri: klik foto → lightbox dialog (sudah ada untuk galeri lain, dipakai ulang)

## E. Admin Lainnya (Item 3, 4, 5, 11)

- **AdminLogo:** tambahkan tombol **Simpan** eksplisit (saat ini auto-save) + toast.
- **AdminPegawai > Kelola Jabatan:** ubah `jabatanList: string[]` → `jabatanList: Bilingual[]`; semua input pakai `BilingualInput`. Migrasi data lama via `toBilingual()`.
- **AdminSiswa:** sorting via drag-and-drop (pakai `@dnd-kit/core` + `@dnd-kit/sortable`). Pegang urutan pada `data.siswa`.
- **Required image fields + hint pixel size** pada `ImageUpload`:
  - Tambah prop `required?: boolean` & `recommendedSize?: string` (mis. "1200×600 px").
  - Validasi sebelum simpan; tampilkan asterisk merah & label "Disarankan: 1200×600 px".
  - Field wajib: logo, hero, foto sejarah, foto sambutan, ekskul fotoUtama, pegawai foto, berita fotoUtama, prestasi fotoUtama, dokumen file.

## F. Auto-link URL di Deskripsi (Item 12)

Helper `src/lib/linkify.tsx`:
- Regex `https?://...` → `<a href target=_blank class="text-primary underline">`
- Dipakai di semua tempat menampilkan deskripsi user-input (Berita, Prestasi, Ekskul, Sambutan, Profil, Keunggulan).

## G. Hapus Halaman/Route Lama

- `/kegiatan`, `/admin/kegiatan` → diganti `/berita`, `/admin/berita` (file di-rename, isi disesuaikan).
- `KegiatanPage.tsx` → `BeritaPage.tsx` (+ `BeritaDetail.tsx` baru).
- `EkstrakurikulerPage.tsx` & `Layanan.tsx` direstrukturisasi pakai layout filter sidebar.

## H. Translations

Tambah keys: `nav_berita`, `nav_prestasi`, `nav_dokumen`, `nav_siswa`, `selengkapnya`, `kembali`, `galeri`, `pelatih`, `tipe_foto`, `tipe_video`, `tampilkan`, `semua`, `per_halaman`, hint pixel size, dll.

## I. Detail Teknis

- **Drag-and-drop:** `@dnd-kit/core`, `@dnd-kit/sortable` (paket baru).
- **Video embed util** (`src/lib/videoEmbed.ts`): deteksi platform dari URL, return `{ type, embedUrl }`.
- **Migration localStorage:** saat load, jika data lama (`kegiatan` ada tapi `berita` tidak) → copy `kegiatan` ke `berita` dengan `tipe='foto'`, `fotoUtama=foto`. Item `pelatih` default `[]`. `jabatanList` string → bilingual.
- **Pagination:** state lokal per halaman; reset page ke 1 saat filter berubah.
- **Filter sidebar mobile:** tombol "Filter" buka `Sheet` dari kiri.
- **Lightbox:** komponen reusable `<ImageLightbox images currentIndex onClose />` pakai `Dialog`.

## J. Item 14 — Testing

Setelah implementasi, saya akan jalankan smoke check ringan (build + page load via preview) lalu serahkan checklist E2E manual berisi 14 langkah uji ke Anda — full E2E otomatis (Playwright untuk semua 14 alur) di luar scope satu turn ini, tapi struktur file `playwright-fixture.ts` sudah ada bila diperlukan kemudian.

## Catatan Penting

- **Scope sangat besar** (~25-30 file diubah, 8-10 file baru, 2 paket npm baru). Akan saya kerjakan sequential dalam satu eksekusi panjang.
- Konten lama `kegiatan` akan otomatis termigrasi menjadi `berita` tipe foto — tidak hilang.
- Semua perubahan tetap **client-side** (localStorage), sesuai arsitektur saat ini.

