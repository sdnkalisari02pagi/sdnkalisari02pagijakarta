

# Ubah Warna Sidebar Admin

## Masalah
Sidebar admin terlalu gelap (biru tua `hsl(217, 91%, 20%)`) sehingga logo sekolah tidak terlihat.

## Perubahan

### `src/index.css` — ubah CSS variables sidebar (light mode)
- `--sidebar-background`: dari `217.2 91.2% 20%` → `210 20% 96%` (abu-abu terang, mirip `--muted`)
- `--sidebar-foreground`: dari `0 0% 98%` → `222.2 84% 4.9%` (teks gelap)
- `--sidebar-primary`: tetap `45 93% 47%` (kuning)
- `--sidebar-primary-foreground`: tetap `0 0% 100%`
- `--sidebar-accent`: dari `217.2 91.2% 30%` → `214 20% 90%` (abu-abu sedikit lebih gelap)
- `--sidebar-accent-foreground`: dari `0 0% 98%` → `222.2 84% 4.9%` (teks gelap)
- `--sidebar-border`: dari `217.2 91.2% 30%` → `214.3 31.8% 91.4%` (sama seperti `--border`)
- `--sidebar-ring`: tetap

### Dark mode — ubah juga agar kontras
- `--sidebar-background`: dari `217.2 91.2% 10%` → `222.2 84% 8%`
- `--sidebar-accent`: dari `217.2 91.2% 20%` → `217.2 32.6% 17.5%`
- `--sidebar-border`: dari `217.2 91.2% 20%` → `217.2 32.6% 17.5%`

Hasilnya sidebar akan berwarna terang (abu-abu muda) sehingga logo sekolah terlihat jelas.

