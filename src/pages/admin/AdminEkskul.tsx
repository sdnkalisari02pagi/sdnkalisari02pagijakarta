import { useState, useEffect } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import GaleriUpload from '@/components/GaleriUpload';
import LastModifiedInfo, { formatDate } from '@/components/LastModifiedInfo';
import BilingualInput from '@/components/BilingualInput';
import AdminPagination from '@/components/AdminPagination';
import { tr, toBilingual } from '@/lib/i18n';
import { toast } from '@/hooks/use-toast';

interface FormState {
  nama: { id: string; en: string };
  fotoUtama: string;
  deskripsi: { id: string; en: string };
  galeri: string[];
}

const empty = (): FormState => ({ nama: { id: '', en: '' }, fotoUtama: '', deskripsi: { id: '', en: '' }, galeri: [] });

export default function AdminEkskul() {
  const { data, updateEkstrakurikuler } = useSchool();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [form, setForm] = useState<FormState>(empty());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filtered = data.ekstrakurikuler.filter(e => tr(e.nama, 'id').toLowerCase().includes(search.toLowerCase()));
  const paginatedData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openAdd = () => { setEditItem(null); setForm(empty()); setDialogOpen(true); };
  const openEdit = (e: any) => {
    setEditItem(e);
    setForm({
      nama: toBilingual(e.nama),
      fotoUtama: e.fotoUtama || e.foto || '',
      deskripsi: toBilingual(e.deskripsi),
      galeri: e.galeri || [],
    });
    setDialogOpen(true);
  };


  const handleSave = async () => {
    if (!form.nama.id) {
      toast({ title: 'Gagal', description: 'Nama wajib diisi.', variant: 'destructive' });
      return;
    }
    if (!form.fotoUtama) {
      toast({ title: 'Gagal', description: 'Foto Utama wajib diisi.', variant: 'destructive' });
      return;
    }
    setIsSaving(true);
    try {
      const now = new Date().toISOString();
      const payload: any = {
        id: editItem?.id || Date.now().toString(),
        nama: form.nama,
        foto: form.fotoUtama, // legacy mirror
        fotoUtama: form.fotoUtama,
        deskripsi: form.deskripsi,
        galeri: form.galeri,
        lastModified: now,
      };
      if (editItem) {
        await updateEkstrakurikuler(data.ekstrakurikuler.map(e => e.id === editItem.id ? payload : e));
      } else {
        await updateEkstrakurikuler([...data.ekstrakurikuler, payload]);
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
        await updateEkstrakurikuler(data.ekstrakurikuler.filter(e => e.id !== id));
        toast({ title: 'Berhasil', description: 'Data dihapus' });
      } catch (err: any) {
        toast({ title: 'Gagal', description: err.message, variant: 'destructive' });
      }
    }
  };

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


              <div><Label>Galeri</Label><GaleriUpload value={form.galeri} onChange={galeri => setForm(f => ({ ...f, galeri }))} /></div>
              <Button onClick={handleSave} className="w-full" disabled={isSaving}>{isSaving ? 'Menyimpan...' : 'Simpan'}</Button>
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
              <TableHead className="w-12">No.</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Terakhir Diubah</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((e, index) => (
              <TableRow key={e.id}>
                <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                <TableCell><img src={e.fotoUtama || e.foto} alt={tr(e.nama, 'id')} className="w-10 h-10 rounded object-cover" /></TableCell>
                <TableCell className="font-medium">{tr(e.nama, 'id')}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {e.lastModified ? formatDate(e.lastModified) : e.updated_at ? formatDate(e.updated_at) : '-'}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(e)}><Pencil className="w-3 h-3" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(e.id)}><Trash2 className="w-3 h-3" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AdminPagination 
          currentPage={currentPage}
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
        />
      </div>
    </div>
  );
}
