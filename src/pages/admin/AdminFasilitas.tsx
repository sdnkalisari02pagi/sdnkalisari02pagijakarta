import { useState, useEffect } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Trash2, ChevronUp, ChevronDown, Building, Image, Pencil, Save } from 'lucide-react';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import BilingualInput from '@/components/BilingualInput';
import ImageUpload from '@/components/ImageUpload';
import { tr } from '@/lib/i18n';

interface FasilitasItem {
  id: string;
  nama: { id: string; en: string };
  foto: string;
  urutan?: number;
  lastModified?: string;
  updated_at?: string;
}

export default function AdminFasilitas() {
  const { data, updateFasilitas, updateProfil } = useSchool();
  const [items, setItems] = useState<FasilitasItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Description text state
  const [descForm, setDescForm] = useState({ id: '', en: '' });
  const [isSavingDesc, setIsSavingDesc] = useState(false);

  // Dialog & Add/Edit state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<FasilitasItem | null>(null);
  const [facilityForm, setFacilityForm] = useState({ nama: { id: '', en: '' }, foto: '' });

  // Sync state when data loads
  useEffect(() => {
    if (data.fasilitas) {
      setItems(
        data.fasilitas.map(f => ({
          id: f.id,
          nama: { id: f.nama?.id || f.nama_id || '', en: f.nama?.en || f.nama_en || '' },
          foto: f.foto || '',
          urutan: f.urutan || 0,
          updated_at: f.updated_at
        }))
      );
    }
  }, [data.fasilitas]);

  useEffect(() => {
    if (data.profil?.fasilitasDesc) {
      setDescForm({
        id: data.profil.fasilitasDesc.id || '',
        en: data.profil.fasilitasDesc.en || ''
      });
    }
  }, [data.profil]);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleSaveDesc = async () => {
    setIsSavingDesc(true);
    try {
      await updateProfil({
        ...data.profil,
        fasilitasDesc: descForm
      });
      toast.success('Deskripsi halaman fasilitas berhasil disimpan');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Gagal menyimpan deskripsi');
    } finally {
      setIsSavingDesc(false);
    }
  };

  const openAdd = () => {
    setEditItem(null);
    setFacilityForm({ nama: { id: '', en: '' }, foto: '' });
    setDialogOpen(true);
  };

  const openEdit = (item: FasilitasItem) => {
    setEditItem(item);
    setFacilityForm({
      nama: { id: item.nama.id || '', en: item.nama.en || '' },
      foto: item.foto || ''
    });
    setDialogOpen(true);
  };

  const handleSaveFacility = () => {
    if (!facilityForm.nama.id.trim()) {
      toast.error('Nama fasilitas (ID) wajib diisi');
      return;
    }

    if (editItem) {
      // Edit existing item
      setItems(items.map(i => i.id === editItem.id ? { ...i, ...facilityForm, lastModified: new Date().toISOString() } : i));
      toast.success('Fasilitas diperbarui di tabel (klik Simpan Perubahan untuk menyimpan ke database)');
    } else {
      // Add new item
      setItems([...items, {
        id: generateUUID(),
        ...facilityForm,
        urutan: items.length,
        lastModified: new Date().toISOString()
      }]);
      toast.success('Fasilitas ditambahkan ke tabel (klik Simpan Perubahan untuk menyimpan ke database)');
    }
    setDialogOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Hapus fasilitas ini?')) {
      setItems(items.filter(i => i.id !== id));
      toast.info('Item dihapus dari tabel (klik Simpan Perubahan untuk menyimpan ke database)');
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    setItems(newItems);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    setItems(newItems);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await updateFasilitas(items);
      toast.success('Seluruh data fasilitas berhasil disimpan ke database');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Gagal menyimpan fasilitas');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Building className="w-6 h-6 text-primary" />
            Fasilitas Sekolah
          </h1>
          <p className="text-sm text-muted-foreground">Kelola sarana, prasarana, dan deskripsi halaman fasilitas</p>
          {data.lastModified && <LastModifiedInfo timestamp={data.lastModified.fasilitas} />}
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Tambah Fasilitas
        </Button>
      </div>

      {/* Description Editor Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 font-bold">
            Deskripsi Halaman Fasilitas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <BilingualInput
            label="Teks Deskripsi"
            value={descForm}
            onChange={setDescForm}
            multiline
            rows={3}
            placeholder="Masukkan teks deskripsi fasilitas..."
          />
          <Button onClick={handleSaveDesc} disabled={isSavingDesc} className="gap-2">
            <Save className="w-4 h-4" />
            {isSavingDesc ? 'Menyimpan...' : 'Simpan Deskripsi'}
          </Button>
        </CardContent>
      </Card>

      {/* Facilities Table Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold">Daftar Fasilitas</CardTitle>
          <span className="text-xs text-muted-foreground">Gunakan tombol panah untuk mengatur urutan</span>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-center py-10 border-dashed border rounded-lg">
              <Building className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">Belum ada data fasilitas.</p>
            </div>
          ) : (
            <div className="rounded-lg border overflow-hidden bg-card">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left w-16">No</th>
                    <th className="px-4 py-3 text-left w-28">Foto</th>
                    <th className="px-4 py-3 text-left">Nama (ID)</th>
                    <th className="px-4 py-3 text-left">Nama (EN)</th>
                    <th className="px-4 py-3 text-center w-28">Urutan</th>
                    <th className="px-4 py-3 text-right w-28">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-4 py-3 font-medium">{index + 1}</td>
                      <td className="px-4 py-3">
                        {item.foto ? (
                          <img src={item.foto} alt={item.nama.id} className="w-16 h-10 object-cover rounded border bg-muted" />
                        ) : (
                          <div className="w-16 h-10 rounded border bg-muted flex items-center justify-center text-muted-foreground text-[10px]">
                            No Photo
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">{item.nama.id || '-'}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.nama.en || '-'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveUp(index)}
                            disabled={index === 0}
                            className="h-8 w-8 disabled:opacity-30"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveDown(index)}
                            disabled={index === items.length - 1}
                            className="h-8 w-8 disabled:opacity-30"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right space-x-1.5">
                        <Button size="sm" variant="outline" onClick={() => openEdit(item)} className="h-8 w-8 p-0">
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteItem(item.id)} className="h-8 w-8 p-0">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Button 
        onClick={handleSaveAll} 
        className="w-full text-base font-semibold py-6 shadow-md" 
        size="lg" 
        disabled={isSaving}
      >
        {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
      </Button>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold">
              {editItem ? 'Edit Fasilitas' : 'Tambah Fasilitas Baru'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <BilingualInput
              label="Nama Fasilitas"
              value={facilityForm.nama}
              onChange={val => setFacilityForm(f => ({ ...f, nama: val }))}
              placeholder="Contoh: Lab Komputer"
            />
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Image className="w-4 h-4 text-muted-foreground" />
                Foto Fasilitas
              </Label>
              <ImageUpload
                value={facilityForm.foto}
                onChange={url => setFacilityForm(f => ({ ...f, foto: url }))}
                placeholder
                recommendedSize="800×600 px (4:3)"
              />
            </div>
            <Button onClick={handleSaveFacility} className="w-full mt-2" size="lg">
              {editItem ? 'Update' : 'Tambahkan'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
