import { useState, useRef } from 'react';
import { useSchool, Dokumen } from '@/contexts/SchoolContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Search, Upload, FileText, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import LastModifiedInfo, { formatDate } from '@/components/LastModifiedInfo';
import BilingualInput from '@/components/BilingualInput';
import { tr, toBilingual } from '@/lib/i18n';
import { uploadFileToSupabase } from '@/lib/supabase';

export default function AdminDokumen() {
  const { data, updateDokumen } = useSchool();
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Dokumen | null>(null);
  const [form, setForm] = useState<{ nama: { id: string; en: string }; tanggal: string; url: string }>({ nama: { id: '', en: '' }, tanggal: '', url: '#' });
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ACCEPTED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png', 'image/webp'];

  const processFile = async (file: File) => {
    if (file.size > 30 * 1024 * 1024) {
      toast({ title: 'Gagal', description: 'Ukuran file maksimal 30MB.', variant: 'destructive' });
      return;
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast({ title: 'Gagal', description: 'Format file tidak didukung.', variant: 'destructive' });
      return;
    }

    toast({ title: 'Mengunggah...', description: 'Mohon tunggu sebentar.' });
    const uploadedUrl = await uploadFileToSupabase(file);
    if (uploadedUrl) {
      setForm(f => ({ ...f, url: uploadedUrl }));
      setFileName(file.name);
      toast({ title: 'Berhasil', description: 'File siap disimpan.' });
    } else {
      toast({ title: 'Gagal', description: 'Terjadi kesalahan saat mengunggah.', variant: 'destructive' });
    }
  };

  const filtered = data.dokumen.filter(d => tr(d.nama, 'id').toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditItem(null); setForm({ nama: { id: '', en: '' }, tanggal: '', url: '#' }); setFileName(''); setDialogOpen(true); };
  const openEdit = (d: Dokumen) => { 
    setEditItem(d); 
    setForm({ nama: toBilingual(d.nama), tanggal: d.tanggal, url: d.url }); 
    let fname = d.url.split('/').pop() || 'File';
    try { fname = decodeURIComponent(fname); } catch(e) {}
    setFileName(fname); 
    setDialogOpen(true); 
  };

  const handleSave = async () => {
    if (!form.nama.id || !form.tanggal) return;
    setIsSaving(true);
    try {
      const now = new Date().toISOString();
      if (editItem) {
        await updateDokumen(data.dokumen.map(d => d.id === editItem.id ? { ...d, ...form, lastModified: now } : d));
      } else {
        await updateDokumen([...data.dokumen, { id: Date.now().toString(), ...form, lastModified: now }]);
      }
      setDialogOpen(false);
      toast({ title: 'Berhasil', description: 'Data disimpan' });
    } catch (err: any) {
      toast({ title: 'Gagal', description: err.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => { 
    if (confirm('Hapus?')) {
      try {
        await updateDokumen(data.dokumen.filter(d => d.id !== id));
        toast({ title: 'Berhasil', description: 'Data dihapus' });
      } catch (err: any) {
        toast({ title: 'Gagal', description: err.message, variant: 'destructive' });
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Kelola Dokumen</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button onClick={openAdd} className="gap-2"><Plus className="w-4 h-4" /> Tambah</Button></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'Tambah'} Dokumen</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <BilingualInput label="Nama" value={form.nama} onChange={v => setForm(f => ({ ...f, nama: v }))} />
              <div><Label>Tanggal</Label><Input type="date" value={form.tanggal} onChange={e => setForm(f => ({ ...f, tanggal: e.target.value }))} /></div>
              <div>
                <Label>File</Label>
                <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp" className="hidden" onChange={e => { const file = e.target.files?.[0]; if (file) processFile(file); e.target.value = ''; }} />
                {form.url !== '#' && form.url !== '' ? (
                  <div className="flex flex-col gap-3">
                    {form.url.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                      <div className="relative rounded-lg border overflow-hidden bg-muted/10 flex justify-center h-[200px]">
                        <img src={form.url} alt="Preview" className="object-contain h-full" />
                      </div>
                    ) : form.url.match(/\.(pdf)$/i) ? (
                      <iframe src={form.url} className="w-full h-[300px] rounded-lg border" title="Preview" />
                    ) : (
                      <div className="h-[100px] w-full rounded-lg border flex flex-col items-center justify-center bg-muted/10">
                        <FileText className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Preview tidak tersedia untuk format ini</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 p-3 rounded-lg border bg-muted/50">
                      <FileText className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm truncate flex-1" title={fileName}>{fileName}</span>
                      <button onClick={() => { setForm(f => ({ ...f, url: '#' })); setFileName(''); }} className="text-muted-foreground hover:text-destructive">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div onClick={() => fileInputRef.current?.click()} onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files?.[0]; if (file) processFile(file); }} className={`w-full min-h-[6rem] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/40 hover:border-primary/60'}`}>
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">Seret file ke sini atau klik untuk unggah</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, XLS, JPG, PNG (maks 30MB)</p>
                  </div>
                )}
              </div>
              <Button onClick={handleSave} className="w-full" disabled={isSaving}>{isSaving ? 'Menyimpan...' : 'Simpan'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <LastModifiedInfo timestamp={data.lastModified?.dokumen} />
      <div className="relative max-w-md mb-6"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Cari..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" /></div>
      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader><TableRow><TableHead className="w-[80px]">Preview</TableHead><TableHead>Nama Dokumen</TableHead><TableHead>Tanggal</TableHead><TableHead>Terakhir Diubah</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map(d => (
              <TableRow key={d.id}>
                <TableCell>
                  <a href={d.url} target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity">
                    {d.url.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                      <img src={d.url} alt="Preview" className="w-12 h-12 object-cover rounded border bg-muted/20" />
                    ) : d.url.match(/\.(pdf)$/i) ? (
                      <div className="w-12 h-12 rounded border overflow-hidden relative bg-white">
                        <iframe src={`${d.url}#page=1&view=Fit&toolbar=0&navpanes=0&scrollbar=0`} className="absolute top-0 left-0 origin-top-left pointer-events-none" style={{ width: '480px', height: '480px', transform: 'scale(0.1)' }} title="PDF Thumbnail" tabIndex={-1} />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center border">
                        <FileText className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </a>
                </TableCell>
                <TableCell>
                  {tr(d.nama, 'id')}
                </TableCell>
                <TableCell>{new Date(d.tanggal).toLocaleDateString('id-ID')}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {d.lastModified ? formatDate(d.lastModified) : (d as any).updated_at ? formatDate((d as any).updated_at) : '-'}
                </TableCell>
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
