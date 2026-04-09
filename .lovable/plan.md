

# Add Reorder Functionality to Admin Pegawai

## Overview
Add up/down arrow buttons to each row in the pegawai table so admins can reorder staff. The order in admin will be reflected on the public website since both read from the same `data.pegawai` array.

## Changes

### `src/pages/admin/AdminPegawai.tsx`
- Import `ArrowUp` and `ArrowDown` icons from lucide-react
- Add a "No." (number) column as the first column showing the row index
- Add up/down arrow buttons in the Aksi column (before edit/delete)
- `moveUp(index)`: swaps item at `index` with `index-1`, calls `updatePegawai`
- `moveDown(index)`: swaps item at `index` with `index+1`, calls `updatePegawai`
- Disable up button on first row, down button on last row
- Reorder buttons only work on the unfiltered full list — when search/filter is active, hide reorder buttons (since reordering a filtered subset would be confusing)

No other files need changes — the public pages already render `data.pegawai` in array order.

