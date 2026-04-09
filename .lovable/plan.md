

# Hero Carousel + Enhanced Stats + Admin Hero Editor

## Overview
1. Add an image carousel to the Hero section with 3 school photos, auto-slide every 5 seconds, and manual left/right arrows
2. Make the "Tenaga Pendidik & Kependidikan" counter more visually appealing
3. Add a new Admin Hero page to manage the carousel images

## Changes

### 1. `src/contexts/SchoolContext.tsx` — Add hero data to model
- Add `hero` field to `SchoolData`:
  ```ts
  hero: {
    images: string[];  // array of 3+ image URLs
    judul: string;     // e.g. "SDN Kalisari 02 Pagi"
    subtitle: string;  // e.g. "Mewujudkan Generasi Cerdas..."
  }
  ```
- Add `updateHero` function
- Default data: 3 different Unsplash school photos
- Add `hero?: string` to `LastModified`

### 2. `src/pages/Index.tsx` — Hero carousel + enhanced counter
- Replace single `<img>` with a custom carousel:
  - State: `currentSlide` index, auto-increment every 5s via `useEffect` + `setInterval`
  - Render all images absolutely positioned, use opacity/transition for crossfade effect
  - Left/right arrow buttons (ChevronLeft/ChevronRight) positioned on sides, semi-transparent white bg
  - Dot indicators at the bottom showing current slide
- Enhanced "Tenaga Pendidik" section:
  - Replace single pill with a row of 2-3 stat counters (e.g. Tenaga Pendidik count, Kegiatan count, Ekstrakurikuler count)
  - Each with an icon and animated number, glassmorphism-style cards (backdrop-blur, semi-transparent bg)

### 3. `src/pages/admin/AdminHero.tsx` — New admin page
- Manage hero images (add/remove/reorder using `ImageUpload`)
- Edit hero title and subtitle text fields
- Save button updates via `updateHero`
- Show `LastModifiedInfo` component

### 4. `src/App.tsx` — Add route
- Import `AdminHero` and add `<Route path="hero" element={<AdminHero />} />`

### 5. `src/components/AdminLayout.tsx` — Add sidebar menu item
- Add "Hero" menu item with `Image` icon, url `/admin/hero`, positioned after "Logo"

