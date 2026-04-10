import { useState } from 'react';
import { useSchool, Pegawai } from '@/contexts/SchoolContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Search, Plus, Pencil, Trash2, GripVertical, Settings } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import { toast } from '@/hooks/use-toast';

export default function AdminPegawai() {
  const { data, updatePegawai, updateJabatanList } = useSchool();
  const [search, setSearch] = useState('');
  const [filterJabatan, setFilterJabatan] = useState('all');
  const [editItem, setEditItem] = useState<Pegawai | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [jabatanDialogOpen, setJabatanDialogOpen] = useState(false);
  const [form, setForm] = useState({ nama: '', jabatan: '', foto: '' });
  const [newJabatan, setNewJabatan] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const isFiltering = search !== '' || filterJabatan !== 'all';
  const filtered = data.pegawai.filter(p => {
    const ms = p.nama.toLowerCase().includes(search.toLowerCase());
    const mf = filterJabatan === 'all' || p.jabatan === filterJabatan;
    return ms && mf;
  });

  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => { e.preventDefault(); setDragOverIndex(index); };
  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) { setDraggedIndex(null); setDragOverIndex(null); return; }
    const arr = [...data.pegawai];
    const [moved] = arr.splice(draggedIndex, 1);
    arr.splice(dropIndex, 0, moved);
    updatePegawai(arr);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };
  const handleDragEnd = () => { setDraggedIndex(null); setDragOverIndex(null); };

  const openAdd = () => { setEditItem(null); setForm({ nama: '', jabatan: '', foto: '' }); setDialogOpen(true); };
  const openEdit = (p: Pegawai) => { setEditItem(p); setForm({ nama: p.nama, jabatan: p.jabatan, foto: p.foto }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.nama || !form.jabatan) return;
    const foto = form.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.nama)}&background=2563EB&color=fff&size=200`;
    const now = new Date().toISOString();
    if (editItem) {
      updatePegawai(data.pegawai.map(p => p.id === editItem.id ? { ...p, ...form, foto, lastModified: now } : p));
    } else {
      updatePegawai([...data.pegawai, { id: Date.now().toString(), ...form, foto, lastModified: now }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => { if (confirm('Hapus pegawai ini?')) updatePegawai(data.pegawai.filter(p => p.id !== id)); };

  const handleAddJabatan = () => {
    const trimmed = newJabatan.trim();
    if (!trimmed) return;
    if (data.jabatanList.includes(trimmed)) {
      toast({ title: 'Jabatan sudah ada', variant: 'destructive' });
      return;
    }
    updateJabatanList([...data.jabatanList, trimmed]);
    setNewJabatan('');
    toast({ title: 'Jabatan berhasil ditambahkan' });
  };

  const handleDeleteJabatan = (jabatan: string) => {
    const used = data.pegawai.some(p => p.jabatan === jabatan);
    if (used) {
      toast({ title: 'Tidak dapat menghapus', description: 'Jabatan ini masih digunakan oleh pegawai.', variant: 'destructive' });
      return;
    }
    if (confirm(`Hapus jabatan "${jabatan}"?`)) {
      updateJabatanList(data.jabatanList.filter(j => j !== jabatan));
      toast({ title: 'Jabatan berhasil dihapus' });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Kelola Pegawai</h1>
        <div className="flex gap-2">
          <Dialog open={jabatanDialogOpen} onOpenChange={setJabatanDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2"><Settings className="w-4 h-4" /> Kelola Jabatan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Kelola Jabatan</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Nama jabatan baru..." value={newJabatan} onChange={e => setNewJabatan(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddJabatan()} />
                  <Button onClick={handleAddJabatan}><Plus className="w-4 h-4" /></Button>
                </div>
                <div className="border rounded-lg divide-y max-h-64 overflow-y-auto">
                  {data.jabatanList.map(j => {
                    const used = data.pegawai.some(p => p.jabatan === j);
                    return (
                      <div key={j} className="flex items-center justify-between px-3 py-2">
                        <span className="text-sm">{j}</span>
                        <div className="flex items-center gap-2">
                          {used && <span className="text-xs text-muted-foreground">Digunakan</span>}
                          <Button size="sm" variant="ghost" onClick={() => handleDeleteJabatan(j)} className={used ? 'text-muted-foreground' : 'text-destructive hover:text-destructive'}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  {data.jabatanList.length === 0 && <p className="text-sm text-muted-foreground p-3">Belum ada jabatan.</p>}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button onClick={openAdd} className="gap-2"><Plus className="w-4 h-4" /> Tambah</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'Tambah'} Pegawai</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Nama</Label><Input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} /></div>
                <div>
                  <Label>Jabatan</Label>
                  <Select value={form.jabatan} onValueChange={v => setForm(f => ({ ...f, jabatan: v }))}>
                    <SelectTrigger><SelectValue placeholder="Pilih jabatan" /></SelectTrigger>
                    <SelectContent>
                      {data.jabatanList.map(j => <SelectItem key={j} value={j}>{j}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Foto</Label><ImageUpload value={form.foto} onChange={url => setForm(f => ({ ...f, foto: url }))} placeholder /></div>
                <Button onClick={handleSave} className="w-full">Simpan</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <LastModifiedInfo timestamp={data.lastModified?.pegawai} />
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Cari nama..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" /></div>
        <Select value={filterJabatan} onValueChange={setFilterJabatan}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            {data.jabatanList.map(j => <SelectItem key={j} value={j}>{j}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              {!isFiltering && <TableHead className="w-10"></TableHead>}
              <TableHead>No.</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => {
              const realIndex = data.pegawai.findIndex(x => x.id === p.id);
              return (
                <TableRow
                  key={p.id}
                  draggable={!isFiltering}
                  onDragStart={() => handleDragStart(realIndex)}
                  onDragOver={(e) => handleDragOver(e, realIndex)}
                  onDrop={() => handleDrop(realIndex)}
                  onDragEnd={handleDragEnd}
                  className={`${!isFiltering ? 'cursor-grab active:cursor-grabbing' : ''} ${draggedIndex === realIndex ? 'opacity-50' : ''} ${dragOverIndex === realIndex && draggedIndex !== realIndex ? 'border-t-2 border-t-primary' : ''}`}
                >
                  {!isFiltering && (
                    <TableCell className="w-10 text-muted-foreground"><GripVertical className="w-4 h-4" /></TableCell>
                  )}
                  <TableCell>{realIndex + 1}</TableCell>
                  <TableCell><img src={p.foto} alt={p.nama} className="w-10 h-10 rounded-full object-cover" /></TableCell>
                  <TableCell className="font-medium">
                    {p.nama}
                    {p.lastModified && <span className="block text-xs text-muted-foreground">Diubah: {new Date(p.lastModified).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>}
                  </TableCell>
                  <TableCell>{p.jabatan}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button size="sm" variant="outline" onClick={() => openEdit(p)}><Pencil className="w-3 h-3" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}><Trash2 className="w-3 h-3" /></Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
