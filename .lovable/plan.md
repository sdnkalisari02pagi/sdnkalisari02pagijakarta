

# Hero Section Adjustments

## Changes to `src/pages/Index.tsx`

### 1. Reduce overlay opacity for gradient effect
- Change image opacity from `0.3` to `0.6` (line 57) so the photo is more visible
- Change the overlay from `bg-primary/70` to a gradient: `bg-gradient-to-b from-primary/40 via-primary/50 to-primary/70` — this creates a gradation effect where the top is lighter and bottom darker, making the photo colors visible while keeping text readable

### 2. Remove "Kegiatan" from stats
- Remove `{ icon: Calendar, label: 'Kegiatan', value: data.kegiatan.length }` from the `stats` array (line 42)
- Remove `Calendar` from imports

### 3. Rename "Tenaga Pendidik" to "Pegawai"
- Change label from `'Tenaga Pendidik'` to `'Pegawai'` (line 41)

