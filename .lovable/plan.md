
# Fix Gallery Grid to Max 3 Per Row

## Change in `src/pages/EkstrakurikulerDetail.tsx`

Update the gallery grid class from `grid sm:grid-cols-2 lg:grid-cols-3` to `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3` so it caps at 3 columns and never exceeds that. This ensures max 3 images per row across all screen sizes.

Single line change on line 22.
