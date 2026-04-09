

# Redesign Sambutan Kepala Sekolah Section

## Changes to `src/pages/Index.tsx`

### 1. Photo — square and larger
- Change from `w-40 h-40 rounded-full` to `w-56 h-64 rounded-xl` (rectangular/square-ish, much larger)
- Keep `object-cover` and `shadow-lg`

### 2. Make section colorful
- Change section background from `bg-muted` to a gradient: `bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10`
- Add a colored left border or accent card wrapper with `border-l-4 border-primary` on the text side
- Add a subtle colored decorative element (e.g. a `Quote` icon in secondary color above the text)
- Style the name with `text-primary` color
- Add a colored badge/pill for "Kepala Sekolah" role instead of plain text

### Layout
```
[ Large square photo ] [ Colored accent card with name, role badge, and text ]
```

