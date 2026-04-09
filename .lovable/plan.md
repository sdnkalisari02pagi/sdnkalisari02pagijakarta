

# Add Scroll Animations to Kegiatan and Ekstrakurikuler Pages

## Changes

### 1. `src/pages/KegiatanPage.tsx`
- Import `useScrollAnimation` hook
- Apply scroll animation ref to the card grid container
- Add `scroll-animate` class with staggered delays to each card

### 2. `src/pages/EkstrakurikulerPage.tsx`
- Import `useScrollAnimation` hook
- Apply scroll animation ref to the card grid container
- Add `scroll-animate` class with staggered delays to each card

Both pages will use the same pattern as the homepage: cards fade-in and slide-up as they scroll into view, with staggered timing.

