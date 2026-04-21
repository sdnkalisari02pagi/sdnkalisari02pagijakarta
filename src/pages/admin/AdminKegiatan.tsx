import { useState } from 'react';
import { useSchool, Kegiatan } from '@/contexts/SchoolContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import BilingualInput from '@/components/BilingualInput';
import { tr, toBilingual } from '@/lib/i18n';

export default function AdminKegiatan() {
  const { data, updateKegiatan } = useSchool();
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Kegiatan | null>(null);
  const [form, setForm] = useState<{ judul: { id: string; en: string }; tanggal: string; foto: string; deskripsi: { id: string; en: string } }>({ judul: { id: '', en: '' }, tanggal: '', foto: '', deskripsi: { id: '', en: '' } });

  const filtered = data.kegiatan.filter(k => tr(k.judul, 'id').toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditItem(null); setForm({ judul: { id: '', en: '' }, tanggal: '', foto: '', deskripsi: { id: '', en: '' } }); setDialogOpen(true); };
  const openEdit = (k: Kegiatan) => { setEditItem(k); setForm({ judul: toBilingual(k.judul), tanggal: k.tanggal, foto: k.foto, deskripsi: toBilingual(k.deskripsi) }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.judul.id || !form.tanggal) return;
    const foto = form.foto || `https://placehold.co/600x400/2563EB/white?text=${encodeURIComponent(form.judul.id)}`;
    const now = new Date().toISOString();
    if (editItem) {
      updateKegiatan(data.kegiatan.map(k => k.id === editItem.id ? { ...k, ...form, foto, lastModified: now } : k));
    } else {
      updateKegiatan([...data.kegiatan, { id: Date.now().toString(), ...form, foto, lastModified: now }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => { if (confirm('Hapus kegiatan ini?')) updateKegiatan(data.kegiatan.filter(k => k.id !== id)); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Kelola Kegiatan</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button onClick={openAdd} className="gap-2"><Plus className="w-4 h-4" /> Tambah</Button></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'Tambah'} Kegiatan</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <BilingualInput label="Judul" value={form.judul} onChange={v => setForm(f => ({ ...f, judul: v }))} />
              <div><Label>Tanggal</Label><Input type="date" value={form.tanggal} onChange={e => setForm(f => ({ ...f, tanggal: e.target.value }))} /></div>
              <div><Label>Foto</Label><ImageUpload value={form.foto} onChange={url => setForm(f => ({ ...f, foto: url }))} placeholder /></div>
              <BilingualInput label="Deskripsi" value={form.deskripsi} onChange={v => setForm(f => ({ ...f, deskripsi: v }))} multiline rows={4} />
              <Button onClick={handleSave} className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <LastModifiedInfo timestamp={data.lastModified?.kegiatan} />
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Cari judul kegiatan..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" /></div>
      </div>
      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(k => (
              <TableRow key={k.id}>
                <TableCell><img src={k.foto} alt={tr(k.judul, 'id')} className="w-10 h-10 rounded object-cover" /></TableCell>
                <TableCell className="font-medium">
                  {tr(k.judul, 'id')}
                  {k.lastModified && <span className="block text-xs text-muted-foreground">Diubah: {new Date(k.lastModified).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>}
                </TableCell>
                <TableCell>{new Date(k.tanggal).toLocaleDateString('id-ID')}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(k)}><Pencil className="w-3 h-3" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(k.id)}><Trash2 className="w-3 h-3" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
