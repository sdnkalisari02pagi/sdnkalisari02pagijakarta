import { useState, useRef, ChangeEvent } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, CalendarDays, GripVertical, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import LastModifiedInfo, { formatDate } from '@/components/LastModifiedInfo';
import BilingualInput from '@/components/BilingualInput';
import { toBilingual } from '@/lib/i18n';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as XLSX from 'xlsx';

const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

type KalenderItem = any; // fallback from data structure

function SortableRow({ item, onEdit, onDelete }: { item: KalenderItem; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  return (
    <tr ref={setNodeRef} style={style} className="border-t bg-background">
      <td className="px-3 py-3 w-10 text-muted-foreground cursor-grab active:cursor-grabbing" {...attributes} {...listeners}>
        <GripVertical className="w-4 h-4" />
      </td>
      <td className="px-3 py-3 font-medium">{item.kegiatan?.id || ''}</td>
      <td className="px-3 py-3">{item.tanggal?.id || ''}</td>
      <td className="px-3 py-3 text-xs text-muted-foreground">
        {item.lastModified ? formatDate(item.lastModified) : item.updated_at ? formatDate(item.updated_at) : '-'}
      </td>
      <td className="px-3 py-3 text-right space-x-2">
        <Button size="sm" variant="outline" onClick={onEdit}><Pencil className="w-3 h-3" /></Button>
        <Button size="sm" variant="destructive" onClick={onDelete}><Trash2 className="w-3 h-3" /></Button>
      </td>
    </tr>
  );
}

export default function AdminKalender() {
  const { data, updateKalender } = useSchool();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<KalenderItem | null>(null);
  const [form, setForm] = useState({ kegiatan: { id: '', en: '' }, tanggal: { id: '', en: '' } });
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const openAdd = () => { setEditItem(null); setForm({ kegiatan: { id: '', en: '' }, tanggal: { id: '', en: '' } }); setDialogOpen(true); };
  const openEdit = (k: KalenderItem) => { setEditItem(k); setForm({ kegiatan: toBilingual(k.kegiatan), tanggal: toBilingual(k.tanggal) }); setDialogOpen(true); };

  const handleSave = async () => {
    if (!form.kegiatan.id.trim() || !form.tanggal.id.trim()) {
      toast({ title: 'Gagal', description: 'Kegiatan dan tanggal (ID) wajib diisi.', variant: 'destructive' });
      return;
    }
    setIsSaving(true);
    try {
      const now = new Date().toISOString();
      if (editItem) {
        await updateKalender(data.kalender.map((k: any) => k.id === editItem.id ? { ...k, ...form, lastModified: now } : k));
      } else {
        await updateKalender([...(data.kalender || []), { id: generateUUID(), ...form, lastModified: now }]);
      }
      setDialogOpen(false);
      toast({ title: 'Berhasil', description: 'Data kalender akademik diperbarui.' });
    } catch (err: any) {
      toast({ title: 'Gagal', description: err.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => { 
    if (confirm('Hapus kegiatan ini dari kalender?')) {
      try {
        await updateKalender(data.kalender.filter((k: any) => k.id !== id));
        toast({ title: 'Berhasil', description: 'Kegiatan dihapus' });
      } catch (err: any) {
        toast({ title: 'Gagal', description: err.message, variant: 'destructive' });
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = data.kalender.findIndex((s: any) => s.id === active.id);
    const newIdx = data.kalender.findIndex((s: any) => s.id === over.id);
    if (oldIdx >= 0 && newIdx >= 0) updateKalender(arrayMove(data.kalender, oldIdx, newIdx));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target?.result;
      if (!fileData) return;

      try {
        const workbook = XLSX.read(fileData, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert sheet to array of arrays
        const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (rows.length === 0) return;

        // Skip header if first row contains 'kegiatan'
        let startIndex = 0;
        if (rows[0] && rows[0].some((cell: any) => typeof cell === 'string' && (cell.toLowerCase().includes('kegiatan') || cell.toLowerCase().includes('tanggal')))) {
          startIndex = 1;
        }

        const newItems = [];
        const now = new Date().toISOString();
        
        for (let i = startIndex; i < rows.length; i++) {
          const cols = rows[i];
          // Skip completely empty rows
          if (!cols || cols.length === 0 || cols.every(c => c === undefined || c === null || String(c).trim() === '')) {
            continue;
          }

          const c0 = cols[0] ? String(cols[0]).trim() : '';
          const c1 = cols[1] ? String(cols[1]).trim() : '';
          const c2 = cols[2] ? String(cols[2]).trim() : '';
          const c3 = cols[3] ? String(cols[3]).trim() : '';

          if (c0) { // Require at least kegiatan_id
            newItems.push({
              id: generateUUID(),
              kegiatan: { id: c0, en: c1 },
              tanggal: { id: c2 || '', en: c3 || '' },
              lastModified: now
            });
          }
        }

        if (newItems.length > 0) {
          setIsSaving(true);
          try {
            await updateKalender(newItems);
            toast({ title: 'Berhasil', description: `${newItems.length} kegiatan berhasil diimpor.` });
          } catch (err: any) {
            toast({ title: 'Gagal', description: 'Gagal menyimpan data: ' + err.message, variant: 'destructive' });
          } finally {
            setIsSaving(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
          }
        } else {
          toast({ title: 'Gagal', description: 'Tidak ada data valid yang ditemukan di file tersebut.', variant: 'destructive' });
        }
      } catch (err: any) {
        toast({ title: 'Gagal', description: 'Gagal membaca file Excel/CSV: ' + err.message, variant: 'destructive' });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-foreground">Kelola Kalender Akademik</h1>
        <div className="flex gap-2">
          <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2" disabled={isSaving}>
            <Upload className="w-4 h-4" /> Upload File (CSV/Excel)
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button onClick={openAdd} className="gap-2"><Plus className="w-4 h-4" /> Tambah Kegiatan</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'Tambah'} Kegiatan</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nama Kegiatan</Label>
                <BilingualInput value={form.kegiatan} onChange={val => setForm(f => ({ ...f, kegiatan: val }))} />
              </div>
              <div>
                <Label>Tanggal / Waktu</Label>
                <BilingualInput 
                  value={form.tanggal} 
                  onChange={val => setForm(f => ({ ...f, tanggal: val }))} 
                  placeholder="Contoh: 14 - 18 Oktober 2026"
                />
              </div>
              <Button onClick={handleSave} className="w-full" disabled={isSaving}>{isSaving ? 'Menyimpan...' : 'Simpan'}</Button>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Daftar Kegiatan (drag baris untuk mengurutkan)</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 text-left w-10"></th>
                  <th className="px-3 py-2 text-left">Kegiatan</th>
                  <th className="px-3 py-2 text-left">Tanggal</th>
                  <th className="px-3 py-2 text-left">Terakhir Diubah</th>
                  <th className="px-3 py-2 text-right">Aksi</th>
                </tr>
              </thead>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={(data.kalender || []).map((s: any) => s.id)} strategy={verticalListSortingStrategy}>
                  <tbody>
                    {(data.kalender || []).map((k: any) => (
                      <SortableRow key={k.id} item={k} onEdit={() => openEdit(k)} onDelete={() => handleDelete(k.id)} />
                    ))}
                    {(!data.kalender || data.kalender.length === 0) && <tr><td colSpan={5} className="text-center text-muted-foreground py-6">Belum ada kegiatan kalender</td></tr>}
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
