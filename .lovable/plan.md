

# Fix: Scroll Animations Not Working on Tab Switch

## Problem
The Visi & Misi and Pegawai tabs appear completely blank because:
- `scroll-animate` CSS class sets `opacity: 0` by default
- The `useScrollAnimation` hook runs once on mount and only observes elements present at that time
- When switching tabs, new `.scroll-animate` elements appear but are never observed, so they stay invisible

## Solution

**Option A (Recommended)**: Use a MutationObserver inside `useScrollAnimation` to detect newly added `.scroll-animate` children and observe them automatically.

**Changes in `src/hooks/useScrollAnimation.tsx`**:
- Add a `MutationObserver` that watches for new child elements added to the container
- When new `.scroll-animate` elements are added (e.g., on tab switch), automatically start observing them with the IntersectionObserver

This is a clean fix that works for all pages using this hook without any changes to individual page components.

## Technical Detail

```text
Current flow:
  Mount → find .scroll-animate → observe → (tab switch) → new elements never observed → invisible

Fixed flow:
  Mount → find .scroll-animate → observe
       → MutationObserver watches for DOM changes
       → tab switch → new .scroll-animate detected → observe → animate in
```

## Files Changed
1. `src/hooks/useScrollAnimation.tsx` — Add MutationObserver to detect dynamically added elements

