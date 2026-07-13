import { useState, useEffect } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Trash2, ChevronUp, ChevronDown, Building, Image } from 'lucide-react';
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
  const { data, updateFasilitas } = useSchool();
  const [items, setItems] = useState<FasilitasItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

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

  const addItem = () => {
    const newItem: FasilitasItem = {
      id: `new-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      nama: { id: '', en: '' },
      foto: '',
      urutan: items.length,
      lastModified: new Date().toISOString()
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateField = (id: string, field: keyof FasilitasItem, value: any) => {
    setItems(
      items.map(i =>
        i.id === id ? { ...i, [field]: value, lastModified: new Date().toISOString() } : i
      )
    );
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

  const handleSave = async () => {
    const valid = items.every(i => tr(i.nama, 'id').trim() && i.foto.trim());
    if (!valid) {
      toast.error('Semua nama fasilitas (ID) dan foto harus diisi');
      return;
    }
    setIsSaving(true);
    try {
      await updateFasilitas(items);
      toast.success('Fasilitas berhasil disimpan');
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
          <p className="text-sm text-muted-foreground">Kelola sarana dan prasarana penunjang belajar mengajar</p>
          {data.lastModified && <LastModifiedInfo timestamp={data.lastModified.fasilitas} />}
        </div>
        <Button onClick={addItem} className="gap-2">
          <Plus className="w-4 h-4" /> Tambah Fasilitas
        </Button>
      </div>

      {items.length === 0 ? (
        <Card className="p-8 text-center border-dashed">
          <Building className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Belum ada fasilitas. Klik tombol Tambah untuk membuat baru.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <Card key={item.id} className="relative group/card hover:border-primary/20 transition-all">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2 font-semibold">
                    Fasilitas #{index + 1}
                  </CardTitle>
                  <div className="flex items-center gap-1">
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <BilingualInput
                      label="Nama Fasilitas"
                      value={item.nama}
                      onChange={v => updateField(item.id, 'nama', v)}
                      placeholder="Contoh: Perpustakaan / Library"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5 mb-1.5">
                      <Image className="w-4 h-4 text-muted-foreground" />
                      Foto Fasilitas
                    </Label>
                    <ImageUpload
                      value={item.foto}
                      onChange={url => updateField(item.id, 'foto', url)}
                      placeholder
                      required
                      recommendedSize="800×600 px (4:3)"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <Button 
          onClick={handleSave} 
          className="w-full text-base font-semibold py-6 shadow-md" 
          size="lg" 
          disabled={isSaving}
        >
          {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      )}
    </div>
  );
}
