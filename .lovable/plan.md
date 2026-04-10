

# Change "Tambah Jabatan" Button from Icon to Text

## Change in `src/pages/admin/AdminPegawai.tsx`

Replace the `+` icon button next to the jabatan input with a text button saying "Tambah".

- Find: `<Button onClick={handleAddJabatan}><Plus className="w-4 h-4" /></Button>`
- Replace with: `<Button onClick={handleAddJabatan}>Tambah</Button>`

Single line change, one file.

