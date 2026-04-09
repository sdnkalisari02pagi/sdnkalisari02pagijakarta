import { useState, useRef } from 'react';
import { useSchool, Dokumen } from '@/contexts/SchoolContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Search, Upload, FileText, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function AdminDokumen() {
  const { data, updateDokumen } = useSchool();
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Dokumen | null>(null);
  const [form, setForm] = useState({ nama: '', tanggal: '', url: '#' });
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ACCEPTED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png', 'image/webp'];

  const processFile = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: 'Gagal', description: 'Ukuran file maksimal 2MB.', variant: 'destructive' });
      return;
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast({ title: 'Gagal', description: 'Format file tidak didukung.', variant: 'destructive' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm(f => ({ ...f, url: reader.result as string }));
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const filtered = data.dokumen.filter(d => d.nama.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditItem(null); setForm({ nama: '', tanggal: '', url: '#' }); setFileName(''); setDialogOpen(true); };
  const openEdit = (d: Dokumen) => { setEditItem(d); setForm({ nama: d.nama, tanggal: d.tanggal, url: d.url }); setFileName(''); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.nama || !form.tanggal) return;
    if (editItem) {
      updateDokumen(data.dokumen.map(d => d.id === editItem.id ? { ...d, ...form } : d));
    } else {
      updateDokumen([...data.dokumen, { id: Date.now().toString(), ...form }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => { if (confirm('Hapus?')) updateDokumen(data.dokumen.filter(d => d.id !== id)); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Kelola Dokumen</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button onClick={openAdd} className="gap-2"><Plus className="w-4 h-4" /> Tambah</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'Tambah'} Dokumen</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Nama</Label><Input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} /></div>
              <div><Label>Tanggal</Label><Input type="date" value={form.tanggal} onChange={e => setForm(f => ({ ...f, tanggal: e.target.value }))} /></div>
              <div>
                <Label>File</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={e => { const file = e.target.files?.[0]; if (file) processFile(file); e.target.value = ''; }}
                />
                {form.url !== '#' && form.url !== '' ? (
                  <div className="flex items-center gap-2 p-3 rounded-lg border bg-muted/50">
                    <FileText className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm truncate flex-1">{fileName || 'File terunggah'}</span>
                    <button onClick={() => { setForm(f => ({ ...f, url: '#' })); setFileName(''); }} className="text-muted-foreground hover:text-destructive">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files?.[0]; if (file) processFile(file); }}
                    className={`w-full min-h-[6rem] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                      dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/40 hover:border-primary/60'
                    }`}
                  >
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">Seret file ke sini atau klik untuk unggah</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, XLS, JPG, PNG (maks 2MB)</p>
                  </div>
                )}
              </div>
              <Button onClick={handleSave} className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative max-w-md mb-6"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Cari..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" /></div>
      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader><TableRow><TableHead>Nama</TableHead><TableHead>Tanggal</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map(d => (
              <TableRow key={d.id}>
                <TableCell>{d.nama}</TableCell>
                <TableCell>{new Date(d.tanggal).toLocaleDateString('id-ID')}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(d)}><Pencil className="w-3 h-3" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(d.id)}><Trash2 className="w-3 h-3" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
