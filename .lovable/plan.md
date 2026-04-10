

# Pegawai Photo Cards with Popup Detail

## Changes in `src/pages/Profil.tsx`

1. **Change photo shape**: Replace `w-20 h-20 rounded-full` with a rectangular portrait style (e.g. `w-full h-48 rounded-lg object-cover`)
2. **Make cards clickable**: Add `cursor-pointer` and `onClick` to set a selected pegawai state
3. **Add popup dialog**: Import `Dialog` components, show selected pegawai's foto (larger), nama, and jabatan when clicked
4. **State**: Add `selectedPegawai` state (null or pegawai object)

### Layout change
- Photo moves from small circle inside CardContent to a full-width rectangle at top of card (above CardContent)
- Name and jabatan remain below the photo

