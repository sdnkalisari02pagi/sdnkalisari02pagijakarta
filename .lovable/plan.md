

# Hubungkan Logo Admin ke Login & Footer

## Masalah
- **Navbar**: ✅ Sudah terhubung ke `data.logo`
- **Footer**: ❌ Masih hardcoded ikon GraduationCap
- **Login**: ❌ Masih hardcoded ikon GraduationCap

## Perubahan

### 1. `src/components/Footer.tsx`
- Ganti `<GraduationCap>` di baris 11-13 dengan conditional: jika `data.logo` ada, tampilkan `<img>`, jika tidak fallback ke ikon GraduationCap

### 2. `src/pages/Login.tsx`
- Import `useSchool` dari SchoolContext
- Ambil `data.logo` via `useSchool()`
- Ganti `<GraduationCap>` di baris 31-33 dengan conditional: jika `data.logo` ada, tampilkan `<img>`, jika tidak fallback ke ikon GraduationCap

Setelah ini, logo yang diupload di Admin Logo akan otomatis muncul di navbar, footer, dan halaman login.

