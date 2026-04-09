import { useState } from 'react';
import { useSchool, Kegiatan } from '@/contexts/SchoolContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function AdminKegiatan() {
  const { data, updateKegiatan } = useSchool();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Kegiatan | null>(null);
  const [form, setForm] = useState({ judul: '', tanggal: '', foto: '', deskripsi: '' });

  const openAdd = () => { setEditItem(null); setForm({ judul: '', tanggal: '', foto: '', deskripsi: '' }); setDialogOpen(true); };
  const openEdit = (k: Kegiatan) => { setEditItem(k); setForm({ judul: k.judul, tanggal: k.tanggal, foto: k.foto, deskripsi: k.deskripsi }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.judul || !form.tanggal) return;
    const foto = form.foto || `https://placehold.co/600x400/2563EB/white?text=${encodeURIComponent(form.judul)}`;
    if (editItem) {
      updateKegiatan(data.kegiatan.map(k => k.id === editItem.id ? { ...k, ...form, foto } : k));
    } else {
      updateKegiatan([...data.kegiatan, { id: Date.now().toString(), ...form, foto }]);
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
          <DialogContent>
            <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'Tambah'} Kegiatan</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Judul</Label><Input value={form.judul} onChange={e => setForm(f => ({ ...f, judul: e.target.value }))} /></div>
              <div><Label>Tanggal</Label><Input type="date" value={form.tanggal} onChange={e => setForm(f => ({ ...f, tanggal: e.target.value }))} /></div>
              <div><Label>Foto</Label><ImageUpload value={form.foto} onChange={url => setForm(f => ({ ...f, foto: url }))} placeholder /></div>
              <div><Label>Deskripsi</Label><Textarea value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} /></div>
              <Button onClick={handleSave} className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.kegiatan.map(k => (
          <Card key={k.id} className="overflow-hidden">
            <img src={k.foto} alt={k.judul} className="w-full h-40 object-cover" />
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">{new Date(k.tanggal).toLocaleDateString('id-ID')}</p>
              <h4 className="font-semibold text-foreground mb-2">{k.judul}</h4>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openEdit(k)}><Pencil className="w-3 h-3" /></Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(k.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
