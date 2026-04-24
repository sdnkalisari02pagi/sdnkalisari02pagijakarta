import { useState } from 'react';
import { useSchool, KelasSiswa } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, GraduationCap, GripVertical } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableRow({ k, onEdit, onDelete }: { k: KelasSiswa; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: k.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  return (
    <tr ref={setNodeRef} style={style} className="border-t bg-background">
      <td className="px-3 py-3 w-10 text-muted-foreground cursor-grab active:cursor-grabbing" {...attributes} {...listeners}>
        <GripVertical className="w-4 h-4" />
      </td>
      <td className="px-3 py-3 font-medium">{k.kelas}</td>
      <td className="px-3 py-3">{k.jumlah}</td>
      <td className="px-3 py-3 text-right space-x-2">
        <Button size="sm" variant="outline" onClick={onEdit}><Pencil className="w-3 h-3" /></Button>
        <Button size="sm" variant="destructive" onClick={onDelete}><Trash2 className="w-3 h-3" /></Button>
      </td>
    </tr>
  );
}

export default function AdminSiswa() {
  const { data, updateSiswa } = useSchool();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<KelasSiswa | null>(null);
  const [form, setForm] = useState({ kelas: '', jumlah: 0 });

  const total = data.siswa.reduce((s, k) => s + (Number(k.jumlah) || 0), 0);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const openAdd = () => { setEditItem(null); setForm({ kelas: '', jumlah: 0 }); setDialogOpen(true); };
  const openEdit = (k: KelasSiswa) => { setEditItem(k); setForm({ kelas: k.kelas, jumlah: k.jumlah }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.kelas.trim() || form.jumlah < 0) {
      toast({ title: 'Gagal', description: 'Nama kelas wajib & jumlah ≥ 0', variant: 'destructive' });
      return;
    }
    if (editItem) updateSiswa(data.siswa.map(k => k.id === editItem.id ? { ...k, ...form } : k));
    else updateSiswa([...data.siswa, { id: Date.now().toString(), ...form }]);
    setDialogOpen(false);
    toast({ title: 'Berhasil', description: 'Data siswa diperbarui.' });
  };

  const handleDelete = (id: string) => { if (confirm('Hapus kelas ini?')) updateSiswa(data.siswa.filter(k => k.id !== id)); };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = data.siswa.findIndex(s => s.id === active.id);
    const newIdx = data.siswa.findIndex(s => s.id === over.id);
    if (oldIdx >= 0 && newIdx >= 0) updateSiswa(arrayMove(data.siswa, oldIdx, newIdx));
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
            <p className="text-xs text-muted-foreground">Dari {data.siswa.length} kelas — angka ini muncul di Hero & halaman Profil/Siswa.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Daftar Kelas (drag baris untuk mengurutkan)</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 text-left w-10"></th>
                  <th className="px-3 py-2 text-left">Kelas</th>
                  <th className="px-3 py-2 text-left">Jumlah</th>
                  <th className="px-3 py-2 text-right">Aksi</th>
                </tr>
              </thead>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={data.siswa.map(s => s.id)} strategy={verticalListSortingStrategy}>
                  <tbody>
                    {data.siswa.map(k => (
                      <SortableRow key={k.id} k={k} onEdit={() => openEdit(k)} onDelete={() => handleDelete(k.id)} />
                    ))}
                    {data.siswa.length === 0 && <tr><td colSpan={4} className="text-center text-muted-foreground py-6">Belum ada kelas</td></tr>}
                  </tbody>
                </SortableContext>
              </DndContext>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
