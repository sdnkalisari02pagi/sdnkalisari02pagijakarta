

# Add Ekstrakurikuler Carousel Section

## Changes to `src/pages/Index.tsx`

### Insert new section between Keunggulan (line 156) and Kegiatan Terbaru (line 158)

- Add a new `ekstrakurikulerRef` using `useScrollAnimation()`
- Add state `ekskulPage` (0-based) to track which group of 3 cards is shown
- Show 3 cards at a time from `data.ekstrakurikuler`, with left/right arrow buttons to navigate between pages (page 0: items 0-2, page 1: items 3-5)
- Each card: photo (`h-48 object-cover`), nama as title, deskripsi truncated (2-line clamp)
- Link each card to `/ekstrakurikuler/{id}`
- Section background: light gradient or white to contrast with surrounding sections
- Arrow buttons positioned on the sides of the carousel, styled similar to the hero arrows
- Add a "Lihat Semua" button linking to `/ekstrakurikuler`

### Structure
```
<section py-16 bg-gradient>
  <h2>Ekstrakurikuler</h2>
  <div relative>
    <button left arrow />
    <div grid 3 cols>
      [Card 1] [Card 2] [Card 3]
    </div>
    <button right arrow />
  </div>
  <Link to /ekstrakurikuler>Lihat Semua</Link>
</section>
```

No new files needed — all changes in `src/pages/Index.tsx`.

