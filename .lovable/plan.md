

# Add "Read More" Icon Button to Kegiatan Cards

## Overview
Add a small icon button at the bottom-right corner of each kegiatan card that visually indicates "read more". Clicking it (or the card) opens the detail popup.

## Changes

### `src/pages/KegiatanPage.tsx`
- Import `ArrowRight` (or `ExternalLink` / `Eye`) icon from `lucide-react` and `Button` component
- Inside each `Card`'s `CardContent`, add a flex container at the bottom with a small icon button aligned to the right
- The button uses `variant="ghost"` or `variant="outline"` with `size="icon"` styling
- Button has `onClick` with `stopPropagation` to avoid double-triggering (card also opens popup)
- Use `ArrowRight` icon to indicate "selengkapnya"

