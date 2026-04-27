# Auto-Thumbnail dari URL Video

Saat thumbnail tidak diisi admin, card di website utama akan otomatis menampilkan thumbnail yang diambil dari URL video.

## Strategi per Platform

| Platform | Thumbnail otomatis | Cara |
|---|---|---|
| **YouTube** | ✅ Bisa | `https://img.youtube.com/vi/{id}/hqdefault.jpg` |
| **Google Drive** | ✅ Bisa | `https://drive.google.com/thumbnail?id={id}&sz=w1200` |
| **TikTok** | ⚠️ Fallback | Tidak ada API thumbnail tanpa server. Pakai placeholder bertema TikTok + ikon play |
| **Instagram** | ⚠️ Fallback | Sama seperti TikTok — pakai placeholder + ikon play |

> Untuk TikTok & Instagram, mendapatkan thumbnail asli butuh oEmbed/scraping dari server. Karena project client-side only, kami pakai placeholder visual yang jelas (gradient + ikon play + label platform). Admin tetap bisa upload thumbnail manual jika ingin foto asli.

## Perubahan File

### 1. `src/lib/videoEmbed.ts`
Tambah fungsi baru:
```ts
export function getVideoThumbnail(url: string): string | null {
  // YouTube → img.youtube.com/vi/{id}/hqdefault.jpg
  // GDrive  → drive.google.com/thumbnail?id={id}&sz=w1200
  // lainnya → null
}
```

### 2. `src/components/ContentListPage.tsx` (atau tempat render card Berita/Prestasi)
Logika gambar card:
```ts
const cardImg = item.tipe === 'video'
  ? (item.thumbnail || getVideoThumbnail(item.videoUrl) || null)
  : item.fotoUtama;
```
- Jika ada `cardImg` → render `<img>`
- Jika null (TikTok/IG tanpa thumbnail manual) → render placeholder: gradient background + ikon Play besar di tengah + label platform ("TikTok" / "Instagram") di pojok

### 3. `src/components/ContentAdminTable.tsx`
- Update preview kecil di tabel admin pakai logika yang sama
- Tambah hint di bawah field Thumbnail: *"Kosongkan untuk auto-ambil dari URL (YouTube & GDrive). TikTok/Instagram akan pakai placeholder."*

## Catatan
- Tidak perlu network call — semua URL thumbnail dibangun langsung dari ID video
- Admin yang ingin tampilan custom tetap bisa upload thumbnail manual yang akan override auto-thumbnail
