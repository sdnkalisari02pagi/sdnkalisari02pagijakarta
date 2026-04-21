import { useState } from 'react';
import { useSchool, KelasSiswa } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Plus, Pencil, Trash2, GraduationCap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import LastModifiedInfo from '@/components/LastModifiedInfo';

export default function AdminSiswa() {
  const { data, updateSiswa } = useSchool();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<KelasSiswa | null>(null);
  const [form, setForm] = useState({ kelas: '', jumlah: 0 });

  const total = data.siswa.reduce((s, k) => s + (Number(k.jumlah) || 0), 0);

  const openAdd = () => { setEditItem(null); setForm({ kelas: '', jumlah: 0 }); setDialogOpen(true); };
  const openEdit = (k: KelasSiswa) => { setEditItem(k); setForm({ kelas: k.kelas, jumlah: k.jumlah }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.kelas.trim() || form.jumlah < 0) {
      toast({ title: 'Gagal', description: 'Nama kelas wajib diisi & jumlah harus ≥ 0', variant: 'destructive' });
      return;
    }
    if (editItem) {
      updateSiswa(data.siswa.map(k => k.id === editItem.id ? { ...k, ...form } : k));
    } else {
      updateSiswa([...data.siswa, { id: Date.now().toString(), ...form }]);
    }
    setDialogOpen(false);
    toast({ title: 'Berhasil', description: 'Data siswa diperbarui.' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus kelas ini?')) updateSiswa(data.siswa.filter(k => k.id !== id));
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-foreground">Kelola Siswa</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button onClick={openAdd} className="gap-2"><Plus className="w-4 h-4" /> Tambah Kelas</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'Tambah'} Kelas</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Nama Kelas</Label><Input value={form.kelas} onChange={e => setForm(f => ({ ...f, kelas: e.target.value }))} placeholder="Kelas 1A" /></div>
              <div><Label>Jumlah Siswa</Label><Input type="number" min={0} value={form.jumlah} onChange={e => setForm(f => ({ ...f, jumlah: Number(e.target.value) || 0 }))} /></div>
              <Button onClick={handleSave} className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <LastModifiedInfo timestamp={data.lastModified?.siswa} />

      <Card className="mb-6 bg-primary/5 border-primary/20">
        <CardContent className="pt-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Siswa Keseluruhan</p>
            <p className="text-3xl font-bold text-foreground">{total}</p>
            <p className="text-xs text-muted-foreground">Dari {data.siswa.length} kelas — angka ini otomatis muncul di statistik Hero.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Daftar Kelas</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Kelas</TableHead><TableHead>Jumlah Siswa</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
            <TableBody>
              {data.siswa.map(k => (
                <TableRow key={k.id}>
                  <TableCell className="font-medium">{k.kelas}</TableCell>
                  <TableCell>{k.jumlah}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => openEdit(k)}><Pencil className="w-3 h-3" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(k.id)}><Trash2 className="w-3 h-3" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {data.siswa.length === 0 && <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">Belum ada kelas</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
