import { useState } from 'react';
import { useSchool, Ekstrakurikuler } from '@/contexts/SchoolContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import GaleriUpload from '@/components/GaleriUpload';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import BilingualInput from '@/components/BilingualInput';
import { tr, toBilingual } from '@/lib/i18n';

export default function AdminEkskul() {
  const { data, updateEkstrakurikuler } = useSchool();
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Ekstrakurikuler | null>(null);
  const [form, setForm] = useState<{ nama: { id: string; en: string }; foto: string; deskripsi: { id: string; en: string }; galeri: string[] }>({ nama: { id: '', en: '' }, foto: '', deskripsi: { id: '', en: '' }, galeri: [] });

  const filtered = data.ekstrakurikuler.filter(e => tr(e.nama, 'id').toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditItem(null); setForm({ nama: { id: '', en: '' }, foto: '', deskripsi: { id: '', en: '' }, galeri: [] }); setDialogOpen(true); };
  const openEdit = (e: Ekstrakurikuler) => { setEditItem(e); setForm({ nama: toBilingual(e.nama), foto: e.foto, deskripsi: toBilingual(e.deskripsi), galeri: e.galeri || [] }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.nama.id) return;
    const foto = form.foto || `https://placehold.co/400x300/2563EB/white?text=${encodeURIComponent(form.nama.id)}`;
    const now = new Date().toISOString();
    if (editItem) {
      updateEkstrakurikuler(data.ekstrakurikuler.map(e => e.id === editItem.id ? { ...e, ...form, foto, lastModified: now } : e));
    } else {
      updateEkstrakurikuler([...data.ekstrakurikuler, { id: Date.now().toString(), ...form, foto, lastModified: now }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => { if (confirm('Hapus?')) updateEkstrakurikuler(data.ekstrakurikuler.filter(e => e.id !== id)); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Kelola Ekstrakurikuler</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button onClick={openAdd} className="gap-2"><Plus className="w-4 h-4" /> Tambah</Button></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'Tambah'} Ekskul</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <BilingualInput label="Nama" value={form.nama} onChange={v => setForm(f => ({ ...f, nama: v }))} />
              <div><Label>Foto</Label><ImageUpload value={form.foto} onChange={url => setForm(f => ({ ...f, foto: url }))} placeholder /></div>
              <BilingualInput label="Deskripsi" value={form.deskripsi} onChange={v => setForm(f => ({ ...f, deskripsi: v }))} multiline rows={3} />
              <div><Label>Galeri</Label><GaleriUpload value={form.galeri} onChange={galeri => setForm(f => ({ ...f, galeri }))} /></div>
              <Button onClick={handleSave} className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <LastModifiedInfo timestamp={data.lastModified?.ekstrakurikuler} />
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Cari nama ekskul..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" /></div>
      </div>
      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(e => (
              <TableRow key={e.id}>
                <TableCell><img src={e.foto} alt={tr(e.nama, 'id')} className="w-10 h-10 rounded object-cover" /></TableCell>
                <TableCell className="font-medium">
                  {tr(e.nama, 'id')}
                  {e.lastModified && <span className="block text-xs text-muted-foreground">Diubah: {new Date(e.lastModified).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(e)}><Pencil className="w-3 h-3" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(e.id)}><Trash2 className="w-3 h-3" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
