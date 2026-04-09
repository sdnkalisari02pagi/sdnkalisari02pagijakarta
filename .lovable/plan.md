

# Add Detail Popup to Kegiatan Cards

## Overview
Make each kegiatan card clickable to open a scrollable dialog/modal popup showing the full detail, instead of navigating to a new page.

## Changes

### `src/pages/KegiatanPage.tsx`
- Add state `selectedKegiatan` to track which item is clicked
- Wrap page with a `Dialog` component controlled by this state
- Make each `Card` clickable (`cursor-pointer`, `onClick` sets selected item)
- Dialog content shows:
  - Large image at top
  - Date (formatted in Indonesian)
  - Title (larger font)
  - Full description text
- Use `ScrollArea` inside `DialogContent` for scrollable content when text is long
- Import `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` and `ScrollArea`

