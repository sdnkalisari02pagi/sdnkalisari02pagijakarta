import { useState } from 'react';
import { useSchool, Ekstrakurikuler } from '@/contexts/SchoolContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import GaleriUpload from '@/components/GaleriUpload';

export default function AdminEkskul() {
  const { data, updateEkstrakurikuler } = useSchool();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Ekstrakurikuler | null>(null);
  const [form, setForm] = useState({ nama: '', foto: '', deskripsi: '', galeri: [] as string[] });

  const openAdd = () => { setEditItem(null); setForm({ nama: '', foto: '', deskripsi: '', galeri: [] }); setDialogOpen(true); };
  const openEdit = (e: Ekstrakurikuler) => { setEditItem(e); setForm({ nama: e.nama, foto: e.foto, deskripsi: e.deskripsi, galeri: e.galeri || [] }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.nama) return;
    const foto = form.foto || `https://placehold.co/400x300/2563EB/white?text=${encodeURIComponent(form.nama)}`;
    if (editItem) {
      updateEkstrakurikuler(data.ekstrakurikuler.map(e => e.id === editItem.id ? { ...e, ...form, foto } : e));
    } else {
      updateEkstrakurikuler([...data.ekstrakurikuler, { id: Date.now().toString(), ...form, foto }]);
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
          <DialogContent>
            <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'Tambah'} Ekskul</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Nama</Label><Input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} /></div>
              <div><Label>Foto</Label><ImageUpload value={form.foto} onChange={url => setForm(f => ({ ...f, foto: url }))} placeholder /></div>
              <div><Label>Deskripsi</Label><Textarea value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} /></div>
              <div><Label>Galeri</Label><GaleriUpload value={form.galeri} onChange={galeri => setForm(f => ({ ...f, galeri }))} /></div>
              <Button onClick={handleSave} className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
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
            {data.ekstrakurikuler.map(e => (
              <TableRow key={e.id}>
                <TableCell><img src={e.foto} alt={e.nama} className="w-10 h-10 rounded object-cover" /></TableCell>
                <TableCell className="font-medium">{e.nama}</TableCell>
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