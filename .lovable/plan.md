

# Replace Placeholder Images with Real Unsplash Photos

## Overview
Replace all `placehold.co` and `ui-avatars` dummy images in `SchoolContext.tsx` default data with real Unsplash photos that match each context (school activities, extracurriculars, school building, people portraits).

## Changes

### `src/contexts/SchoolContext.tsx` — update all image URLs in `defaultData`

**Pegawai (staff photos)** — replace `ui-avatars` with Unsplash portrait photos:
- Use `https://images.unsplash.com/photo-...?w=200&h=200&fit=crop&crop=face` for each staff member
- Mix of male/female Indonesian-looking professional portraits

**Kegiatan (activities)** — replace `placehold.co` with relevant Unsplash photos:
- Upacara → flag ceremony / school assembly image
- Lomba Mewarnai → children coloring/painting
- Hari Kartini → traditional costume / cultural event
- Kunjungan Museum → museum visit / field trip
- Pentas Seni → school performance / stage show
- Senam Pagi → morning exercise / kids doing sports

**Ekstrakurikuler** — replace main photos and gallery photos:
- Pramuka → scouting / outdoor activity
- Pantomim → mime / theater performance
- Tari → traditional dance
- Qasidah / Marawis → music / Islamic art
- Menggambar → children drawing / art class

**Profil** — fotoSekolah: school building exterior photo

**Sambutan** — professional female portrait for headmaster

All images sourced from Unsplash with appropriate `w=` and `h=` sizing parameters for performance.

