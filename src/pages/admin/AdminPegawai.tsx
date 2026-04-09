import { useState } from 'react';
import { useSchool, Pegawai } from '@/contexts/SchoolContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

export default function AdminPegawai() {
  const { data, updatePegawai } = useSchool();
  const [search, setSearch] = useState('');
  const [filterJabatan, setFilterJabatan] = useState('all');
  const [editItem, setEditItem] = useState<Pegawai | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ nama: '', jabatan: '', foto: '' });

  const jabatanList = [...new Set(data.pegawai.map(p => p.jabatan))];
  const filtered = data.pegawai.filter(p => {
    const ms = p.nama.toLowerCase().includes(search.toLowerCase());
    const mf = filterJabatan === 'all' || p.jabatan === filterJabatan;
    return ms && mf;
  });

  const openAdd = () => { setEditItem(null); setForm({ nama: '', jabatan: '', foto: '' }); setDialogOpen(true); };
  const openEdit = (p: Pegawai) => { setEditItem(p); setForm({ nama: p.nama, jabatan: p.jabatan, foto: p.foto }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.nama || !form.jabatan) return;
    const foto = form.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.nama)}&background=2563EB&color=fff&size=200`;
    if (editItem) {
      updatePegawai(data.pegawai.map(p => p.id === editItem.id ? { ...p, ...form, foto } : p));
    } else {
      updatePegawai([...data.pegawai, { id: Date.now().toString(), ...form, foto }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => { if (confirm('Hapus pegawai ini?')) updatePegawai(data.pegawai.filter(p => p.id !== id)); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Kelola Pegawai</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button onClick={openAdd} className="gap-2"><Plus className="w-4 h-4" /> Tambah</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'Tambah'} Pegawai</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Nama</Label><Input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} /></div>
              <div><Label>Jabatan</Label><Input value={form.jabatan} onChange={e => setForm(f => ({ ...f, jabatan: e.target.value }))} /></div>
              <div><Label>Foto</Label><ImageUpload value={form.foto} onChange={url => setForm(f => ({ ...f, foto: url }))} placeholder /></div>
              <Button onClick={handleSave} className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Cari nama..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" /></div>
        <Select value={filterJabatan} onValueChange={setFilterJabatan}><SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Semua</SelectItem>{jabatanList.map(j => <SelectItem key={j} value={j}>{j}</SelectItem>)}</SelectContent></Select>
      </div>
      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(p => (
              <TableRow key={p.id}>
                <TableCell><img src={p.foto} alt={p.nama} className="w-10 h-10 rounded-full object-cover" /></TableCell>
                <TableCell className="font-medium">{p.nama}</TableCell>
                <TableCell>{p.jabatan}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(p)}><Pencil className="w-3 h-3" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}><Trash2 className="w-3 h-3" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}