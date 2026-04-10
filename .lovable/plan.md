

# Add Animations to Profil Page Sections

## Overview
Add scroll-based fade-in animations to the Sejarah, Visi & Misi, and Pegawai sections using the existing `useScrollAnimation` hook and `scroll-animate` CSS class pattern.

## Changes in `src/pages/Profil.tsx`

1. Import `useScrollAnimation` from `@/hooks/useScrollAnimation`
2. Attach the ref from `useScrollAnimation()` to the main container
3. Add `scroll-animate` class to:
   - **Sejarah**: the image and the paragraph text
   - **Visi & Misi**: each Card (Visi, Misi, Tujuan) with staggered delays
   - **Pegawai**: the search/filter bar and each pegawai card with staggered delays
4. Use inline `style={{ animationDelay }}` for staggered card entrance effects

## CSS Classes Used
- `scroll-animate` — starts hidden, becomes visible when intersected
- `animate-visible` — applied by IntersectionObserver to trigger the fade-in-up animation
- Staggered delays on pegawai cards (e.g., `0ms, 100ms, 200ms...`) for an elegant sequential reveal

