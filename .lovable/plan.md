

# Make Pegawai Cards Portrait-Oriented

## Change in `src/pages/Profil.tsx`

The photo container aspect ratio needs to change from landscape (`h-48`) to portrait to match 3x4 / 4x6 photo ratios.

1. Change the image container from `h-48` to `aspect-[3/4]` so photos display in portrait orientation
2. Optionally adjust grid columns to fit more cards since they'll be narrower: e.g. `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`
3. Same change in the dialog popup photo container

