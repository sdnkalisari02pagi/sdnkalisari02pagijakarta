

# Replace Arrow Buttons with Drag-and-Drop Reordering

## Overview
Replace the ArrowUp/ArrowDown buttons with HTML5 drag-and-drop for a more intuitive reordering experience. No new dependencies needed — using native HTML5 drag events.

## Changes

### `src/pages/admin/AdminPegawai.tsx`
- Add `draggedIndex` state to track which row is being dragged
- Add drag event handlers: `onDragStart`, `onDragOver`, `onDrop`, `onDragEnd`
- On each `TableRow`: add `draggable={!isFiltering}`, attach drag handlers
- Add a `GripVertical` icon (from lucide-react) as the first column (drag handle visual cue)
- Remove ArrowUp/ArrowDown buttons and their imports
- On drop: reorder `data.pegawai` array by moving the dragged item to the drop position, call `updatePegawai`
- Add visual feedback: highlight the row being dragged over (e.g. border-top indicator)
- Disable drag when filtering is active

