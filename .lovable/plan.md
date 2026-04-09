

# Add Drag-and-Drop to Image/File Upload Components

## Overview
Enhance `ImageUpload` and `GaleriUpload` components with drag-and-drop support so admins can drop files directly onto the upload area instead of only clicking the button.

## Changes

### 1. `src/components/ImageUpload.tsx`
- Add `dragOver` state for visual feedback
- Add `onDragOver`, `onDragLeave`, `onDrop` handlers to the main container
- When no image is set, show a larger drop zone area (dashed border) with text "Seret foto ke sini atau klik untuk unggah"
- When dragging over, highlight the border (e.g. `border-primary`)
- Reuse existing file validation logic (2MB limit, format check)

### 2. `src/components/GaleriUpload.tsx`
- Same drag-and-drop handlers on the container
- Add a visible drop zone area below the existing thumbnails with dashed border and drop hint text
- When dragging over, highlight the drop zone
- On drop, append the new image to the gallery array (same as current click flow)

Both components will accept drops anywhere on their container area, with clear visual feedback during the drag interaction.

