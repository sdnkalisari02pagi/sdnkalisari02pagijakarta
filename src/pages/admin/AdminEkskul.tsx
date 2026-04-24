import { useState } from 'react';
import { useSchool, Ekstrakurikuler, Pelatih } from '@/contexts/SchoolContext';
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
import { toast } from '@/hooks/use-toast';

interface FormState {
  nama: { id: string; en: string };
  fotoUtama: string;
  deskripsi: { id: string; en: string };
  galeri: string[];
  pelatih: Pelatih[];
}

const empty = (): FormState => ({ nama: { id: '', en: '' }, fotoUtama: '', deskripsi: { id: '', en: '' }, galeri: [], pelatih: [] });

export default function AdminEkskul() {
  const { data, updateEkstrakurikuler } = useSchool();
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Ekstrakurikuler | null>(null);
  const [form, setForm] = useState<FormState>(empty());

  const filtered = data.ekstrakurikuler.filter(e => tr(e.nama, 'id').toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditItem(null); setForm(empty()); setDialogOpen(true); };
  const openEdit = (e: Ekstrakurikuler) => {
    setEditItem(e);
    setForm({
      nama: toBilingual(e.nama),
      fotoUtama: e.fotoUtama || e.foto || '',
      deskripsi: toBilingual(e.deskripsi),
      galeri: e.galeri || [],
      pelatih: (e.pelatih || []).map(p => ({ nama: toBilingual(p.nama), foto: p.foto })),
    });
    setDialogOpen(true);
  };

  const addPelatih = () => {
    if (form.pelatih.length >= 3) {
      toast({ title: 'Maksimal 3 pelatih', variant: 'destructive' });
      return;
    }
    setForm(f => ({ ...f, pelatih: [...f.pelatih, { nama: { id: '', en: '' }, foto: '' }] }));
  };
  const removePelatih = (i: number) => setForm(f => ({ ...f, pelatih: f.pelatih.filter((_, idx) => idx !== i) }));
  const updatePelatih = (i: number, patch: Partial<Pelatih>) => setForm(f => ({
    ...f,
    pelatih: f.pelatih.map((p, idx) => idx === i ? { ...p, ...patch } : p),
  }));

  const handleSave = () => {
    if (!form.nama.id) {
      toast({ title: 'Gagal', description: 'Nama wajib diisi.', variant: 'destructive' });
      return;
    }
    if (!form.fotoUtama) {
      toast({ title: 'Gagal', description: 'Foto Utama wajib diisi.', variant: 'destructive' });
      return;
    }
    const now = new Date().toISOString();
    const payload: Ekstrakurikuler = {
      id: editItem?.id || Date.now().toString(),
      nama: form.nama,
      foto: form.fotoUtama, // legacy mirror
      fotoUtama: form.fotoUtama,
      deskripsi: form.deskripsi,
      galeri: form.galeri,
      pelatih: form.pelatih,
      lastModified: now,
    };
    if (editItem) {
      updateEkstrakurikuler(data.ekstrakurikuler.map(e => e.id === editItem.id ? payload : e));
    } else {
      updateEkstrakurikuler([...data.ekstrakurikuler, payload]);
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
              <div>
                <Label>Foto Utama (Card)</Label>
                <ImageUpload value={form.fotoUtama} onChange={url => setForm(f => ({ ...f, fotoUtama: url }))} placeholder required recommendedSize="800×600 px (4:3)" />
              </div>
              <BilingualInput label="Deskripsi" value={form.deskripsi} onChange={v => setForm(f => ({ ...f, deskripsi: v }))} multiline rows={3} />

              <div className="border rounded-lg p-3 space-y-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <Label>Pelatih ({form.pelatih.length}/3)</Label>
                  <Button type="button" size="sm" variant="outline" onClick={addPelatih} disabled={form.pelatih.length >= 3} className="gap-1">
                    <Plus className="w-3 h-3" /> Tambah Pelatih
                  </Button>
                </div>
                {form.pelatih.map((p, i) => (
                  <div key={i} className="border rounded-md p-3 bg-background space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-muted-foreground">Pelatih {i + 1}</p>
                      <Button type="button" size="sm" variant="ghost" onClick={() => removePelatih(i)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                    </div>
                    <BilingualInput label="Nama" value={p.nama} onChange={v => updatePelatih(i, { nama: v })} />
                    <div>
                      <Label>Foto</Label>
                      <ImageUpload value={p.foto} onChange={foto => updatePelatih(i, { foto })} placeholder recommendedSize="200×200 px" />
                    </div>
                  </div>
                ))}
                {form.pelatih.length === 0 && <p className="text-xs text-muted-foreground italic">Belum ada pelatih.</p>}
              </div>

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
              <TableHead>Pelatih</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(e => (
              <TableRow key={e.id}>
                <TableCell><img src={e.fotoUtama || e.foto} alt={tr(e.nama, 'id')} className="w-10 h-10 rounded object-cover" /></TableCell>
                <TableCell className="font-medium">{tr(e.nama, 'id')}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {(e.pelatih || []).map(p => tr(p.nama, 'id')).filter(Boolean).join(', ') || '—'}
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
