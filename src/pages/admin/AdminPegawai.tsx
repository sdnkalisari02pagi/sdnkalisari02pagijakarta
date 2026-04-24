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
import BilingualInput from '@/components/BilingualInput';
import { toast } from '@/hooks/use-toast';
import { tr, toBilingual } from '@/lib/i18n';

export default function AdminPegawai() {
  const { data, updatePegawai, updateJabatanList } = useSchool();
  const [search, setSearch] = useState('');
  const [filterJabatan, setFilterJabatan] = useState('all');
  const [editItem, setEditItem] = useState<Pegawai | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [jabatanDialogOpen, setJabatanDialogOpen] = useState(false);
  const [form, setForm] = useState({ nama: '', jabatan: '', foto: '' });
  const [newJabatan, setNewJabatan] = useState({ id: '', en: '' });
  const [editJabIdx, setEditJabIdx] = useState<number | null>(null);
  const [editJabValue, setEditJabValue] = useState({ id: '', en: '' });
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const isFiltering = search !== '' || filterJabatan !== 'all';
  const filtered = data.pegawai.filter(p => {
    const ms = p.nama.toLowerCase().includes(search.toLowerCase());
    const mf = filterJabatan === 'all' || p.jabatan === filterJabatan;
    return ms && mf;
  });

  // jabatan ID values used by pegawai (we store p.jabatan as the ID-language string for backward compat)
  const jabatanIdList = data.jabatanList.map(j => tr(j, 'id'));

  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => { e.preventDefault(); setDragOverIndex(index); };
  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) { setDraggedIndex(null); setDragOverIndex(null); return; }
    const arr = [...data.pegawai];
    const [moved] = arr.splice(draggedIndex, 1);
    arr.splice(dropIndex, 0, moved);
    updatePegawai(arr);
    setDraggedIndex(null); setDragOverIndex(null);
  };
  const handleDragEnd = () => { setDraggedIndex(null); setDragOverIndex(null); };

  const openAdd = () => { setEditItem(null); setForm({ nama: '', jabatan: '', foto: '' }); setDialogOpen(true); };
  const openEdit = (p: Pegawai) => { setEditItem(p); setForm({ nama: p.nama, jabatan: p.jabatan, foto: p.foto }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.nama || !form.jabatan || !form.foto) {
      toast({ title: 'Gagal', description: 'Nama, jabatan & foto wajib diisi.', variant: 'destructive' });
      return;
    }
    const now = new Date().toISOString();
    if (editItem) {
      updatePegawai(data.pegawai.map(p => p.id === editItem.id ? { ...p, ...form, lastModified: now } : p));
    } else {
      updatePegawai([...data.pegawai, { id: Date.now().toString(), ...form, lastModified: now }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => { if (confirm('Hapus pegawai ini?')) updatePegawai(data.pegawai.filter(p => p.id !== id)); };

  const handleAddJabatan = () => {
    const id = newJabatan.id.trim();
    if (!id) return;
    if (jabatanIdList.includes(id)) {
      toast({ title: 'Jabatan sudah ada', variant: 'destructive' });
      return;
    }
    updateJabatanList([...data.jabatanList, { id, en: newJabatan.en.trim() }]);
    setNewJabatan({ id: '', en: '' });
    toast({ title: 'Jabatan berhasil ditambahkan' });
  };

  const handleSaveEditJabatan = () => {
    if (editJabIdx === null) return;
    const id = editJabValue.id.trim();
    if (!id) return;
    const oldId = tr(data.jabatanList[editJabIdx], 'id');
    const newList = [...data.jabatanList];
    newList[editJabIdx] = { id, en: editJabValue.en.trim() };
    updateJabatanList(newList);
    // sync pegawai whose jabatan matches old ID
    if (oldId !== id) {
      updatePegawai(data.pegawai.map(p => p.jabatan === oldId ? { ...p, jabatan: id } : p));
    }
    setEditJabIdx(null);
    toast({ title: 'Jabatan diperbarui' });
  };

  const handleDeleteJabatan = (idx: number) => {
    const j = tr(data.jabatanList[idx], 'id');
    const used = data.pegawai.some(p => p.jabatan === j);
    if (used) {
      toast({ title: 'Tidak dapat menghapus', description: 'Jabatan ini masih digunakan.', variant: 'destructive' });
      return;
    }
    if (confirm(`Hapus jabatan "${j}"?`)) {
      updateJabatanList(data.jabatanList.filter((_, i) => i !== idx));
      toast({ title: 'Jabatan dihapus' });
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
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader><DialogTitle>Kelola Jabatan (Bilingual)</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="border rounded-lg p-3 space-y-3 bg-muted/30">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Tambah Jabatan</p>
                  <BilingualInput value={newJabatan} onChange={setNewJabatan} placeholder="Nama jabatan" />
                  <Button onClick={handleAddJabatan} size="sm" className="gap-1"><Plus className="w-3 h-3" /> Tambah</Button>
                </div>

                <div className="border rounded-lg divide-y max-h-96 overflow-y-auto">
                  {data.jabatanList.map((j, idx) => {
                    const idStr = tr(j, 'id');
                    const enStr = tr(j, 'en');
                    const used = data.pegawai.some(p => p.jabatan === idStr);
                    const isEditing = editJabIdx === idx;
                    return (
                      <div key={idx} className="px-3 py-3 space-y-2">
                        {isEditing ? (
                          <>
                            <BilingualInput value={editJabValue} onChange={setEditJabValue} />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={handleSaveEditJabatan}>Simpan</Button>
                              <Button size="sm" variant="ghost" onClick={() => setEditJabIdx(null)}>Batal</Button>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">🇮🇩 {idStr}</p>
                              <p className="text-xs text-muted-foreground">🇬🇧 {enStr || '—'}</p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {used && <span className="text-xs text-muted-foreground">Digunakan</span>}
                              <Button size="sm" variant="ghost" onClick={() => { setEditJabIdx(idx); setEditJabValue({ id: idStr, en: enStr }); }}><Pencil className="w-3 h-3" /></Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDeleteJabatan(idx)} className={used ? 'text-muted-foreground' : 'text-destructive hover:text-destructive'}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )}
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
                      {data.jabatanList.map((j, i) => {
                        const idStr = tr(j, 'id');
                        return <SelectItem key={i} value={idStr}>{idStr}</SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Foto</Label><ImageUpload value={form.foto} onChange={url => setForm(f => ({ ...f, foto: url }))} placeholder required recommendedSize="300×400 px (3:4)" /></div>
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
            {data.jabatanList.map((j, i) => {
              const idStr = tr(j, 'id');
              return <SelectItem key={i} value={idStr}>{idStr}</SelectItem>;
            })}
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
                  {!isFiltering && (<TableCell className="w-10 text-muted-foreground"><GripVertical className="w-4 h-4" /></TableCell>)}
                  <TableCell>{realIndex + 1}</TableCell>
                  <TableCell><img src={p.foto} alt={p.nama} className="w-10 h-10 rounded-full object-cover" /></TableCell>
                  <TableCell className="font-medium">{p.nama}</TableCell>
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
