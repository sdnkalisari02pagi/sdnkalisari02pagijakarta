

# Tambah Field Copyright di Admin Footer

## Perubahan

### 1. `src/contexts/SchoolContext.tsx`
- Tambah field `copyright` (string) di interface `FooterData`
- Default value: `"© {tahun} SDN Kalisari 02 Pagi. All rights reserved."`

### 2. `src/pages/admin/AdminFooter.tsx`
- Tambah input field "Teks Copyright" di form

### 3. `src/components/Footer.tsx`
- Ganti baris copyright hardcoded dengan `data.footer.copyright`
- Jika kosong, fallback ke format lama `© {tahun} {namaSekolah}. All rights reserved.`

