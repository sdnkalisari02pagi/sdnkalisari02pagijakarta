
# Tambah Dropdown Menu pada "Profil" di Navbar

## Perubahan

### `src/components/Navbar.tsx`
- Import `ChevronDown` dari lucide-react
- Import `NavigationMenu`, `NavigationMenuContent`, `NavigationMenuItem`, `NavigationMenuLink`, `NavigationMenuList`, `NavigationMenuTrigger` dari `@/components/ui/navigation-menu`
- Ubah item "Profil" dari `<Link>` biasa menjadi dropdown menggunakan NavigationMenu dengan 3 sub-menu:
  - **Sejarah** → `/profil?tab=sejarah`
  - **Visi & Misi** → `/profil?tab=visimisi`
  - **Pegawai** → `/profil?tab=pegawai`
- Menu item lainnya (Kegiatan, Ekstrakurikuler, dll) tetap `<Link>` biasa
- Mobile menu: tambahkan 3 sub-link di bawah "Profil" dengan indentasi

### `src/pages/Profil.tsx`
- Import `useSearchParams` dari react-router-dom
- Baca query param `tab` untuk menentukan `defaultValue` pada `<Tabs>`
- Jika `?tab=visimisi` → buka tab Visi Misi, dst. Default: `sejarah`

Hasilnya: klik "Profil" di navbar akan muncul dropdown dengan 3 pilihan, dan langsung membuka tab yang sesuai di halaman Profil.
