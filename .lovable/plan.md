

# Add Subtle Animations on Load and Scroll

## Overview
Add gentle fade-in and slide-up animations when the page loads and as sections scroll into view. Using CSS animations for the initial hero, and Intersection Observer for scroll-triggered animations on other sections.

## Changes

### 1. `tailwind.config.ts` — Add custom keyframes
- Add `fade-in-up` keyframe (opacity 0→1, translateY 20px→0)
- Add corresponding animation class with 0.6s duration

### 2. New hook: `src/hooks/useScrollAnimation.tsx`
- Custom hook using Intersection Observer API
- Returns a `ref` to attach to elements
- Adds a class (e.g. `animate-visible`) when element enters viewport (threshold ~0.15)
- Triggers only once per element (`once: true`)

### 3. `src/index.css` — Add animation utility classes
- `.scroll-animate`: starts invisible (`opacity: 0; transform: translateY(20px)`)
- `.scroll-animate.animate-visible`: transitions to visible (`opacity: 1; transform: translateY(0)`) with `transition: all 0.6s ease-out`
- Stagger delay utilities: `.delay-100`, `.delay-200`, `.delay-300`

### 4. `src/pages/Index.tsx` — Apply animations
- **Hero section**: CSS `animate-fade-in-up` on the text content (plays on load)
- **Sambutan, Keunggulan, Kegiatan sections**: Wrap each section's content with the scroll animation hook ref and `scroll-animate` class
- **Keunggulan cards**: Add staggered delay (`delay-100`, `delay-200`, etc.) for sequential reveal
- **Kegiatan cards**: Same staggered fade-in on scroll

All animations are subtle (0.5-0.7s, ease-out, small translateY) — no bouncing, spinning, or flashy effects.

