

# Ubah Maksimal Size Dokumen ke 10MB

## Perubahan

### `src/pages/admin/AdminDokumen.tsx`
- Ubah `2 * 1024 * 1024` → `10 * 1024 * 1024` di validasi `processFile`
- Ubah teks error dari "2MB" → "10MB"
- Ubah teks petunjuk UI dari "maks 2MB" → "maks 10MB"

