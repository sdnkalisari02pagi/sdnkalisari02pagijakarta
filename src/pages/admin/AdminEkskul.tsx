import { useState } from 'react';
import { useSchool, Ekstrakurikuler } from '@/contexts/SchoolContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
              <Button onClick={handleSave} className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.ekstrakurikuler.map(e => (
          <Card key={e.id} className="overflow-hidden">
            <img src={e.foto} alt={e.nama} className="w-full h-40 object-cover" />
            <CardContent className="pt-4 text-center">
              <h4 className="font-semibold text-foreground mb-3">{e.nama}</h4>
              <div className="flex justify-center gap-2">
                <Button size="sm" variant="outline" onClick={() => openEdit(e)}><Pencil className="w-3 h-3" /></Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(e.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
