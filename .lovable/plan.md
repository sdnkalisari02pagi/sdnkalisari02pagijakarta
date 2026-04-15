

# Hapus Section Sosial Media di Admin

## Perubahan

### 1. Hapus file `src/pages/admin/AdminSosialMedia.tsx`

### 2. `src/App.tsx`
- Hapus import `AdminSosialMedia`
- Hapus route `<Route path="sosial-media" ... />`

### 3. `src/components/AdminLayout.tsx`
- Hapus menu item `{ title: 'Sosial Media', url: '/admin/sosial-media', icon: Share2 }` dari sidebar
- Hapus import `Share2` jika tidak dipakai lagi

### 4. `src/contexts/SchoolContext.tsx`
- Hapus `updateSosialMedia` function dan dari Provider value
- Data `sosialMedia` tetap ada sebagai data default (masih dipakai oleh Footer dan FloatingEmail)

### Yang tidak berubah
- **Footer** tetap menampilkan icon sosial media dari data default
- **FloatingEmail** tetap menggunakan email default

