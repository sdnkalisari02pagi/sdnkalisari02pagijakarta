import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import BilingualInput from '@/components/BilingualInput';
import { Trash2 } from 'lucide-react';
import { tr, toBilingual } from '@/lib/i18n';

export default function AdminProfil() {
  const { data, updateProfil } = useSchool();
  const [form, setForm] = useState({ ...data.profil });
  const [isSaving, setIsSaving] = useState(false);

  const addMisi = () => setForm(f => ({ ...f, misi: [...f.misi, { id: '', en: '' }] }));
  const updateMisi = (idx: number, val: any) => {
    const newMisi = [...form.misi];
    newMisi[idx] = val;
    setForm(f => ({ ...f, misi: newMisi }));
  };
  const removeMisi = (idx: number) => setForm(f => ({ ...f, misi: f.misi.filter((_, i) => i !== idx) }));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfil(form);
      toast({ title: 'Berhasil', description: 'Profil sekolah berhasil diperbarui.' });
    } catch (err: any) {
      toast({ title: 'Gagal', description: err.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-foreground">Edit Profil Sekolah</h1>
      <LastModifiedInfo timestamp={data.lastModified?.profil} />
      <div className="space-y-6 max-w-3xl">
        <Card><CardHeader><CardTitle className="text-lg">Sejarah</CardTitle></CardHeader><CardContent>
          <BilingualInput value={form.sejarah} onChange={v => setForm(f => ({ ...f, sejarah: v }))} multiline rows={6} />
        </CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">Visi</CardTitle></CardHeader><CardContent>
          <BilingualInput value={form.visi} onChange={v => setForm(f => ({ ...f, visi: v }))} multiline rows={3} />
        </CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">Misi</CardTitle></CardHeader><CardContent className="space-y-4">
          {form.misi.map((m: any, idx: number) => (
            <div key={idx} className="relative bg-muted/50 p-4 rounded-lg border border-border">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:bg-destructive/10" onClick={() => removeMisi(idx)}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <Label className="mb-2 block">Misi {idx + 1}</Label>
              <div className="pr-8">
                <BilingualInput value={m} onChange={v => updateMisi(idx, v)} multiline rows={3} />
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" onClick={addMisi}>+ Tambah Misi</Button>
        </CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">Tujuan</CardTitle></CardHeader><CardContent>
          <BilingualInput value={form.tujuan} onChange={v => setForm(f => ({ ...f, tujuan: v }))} multiline rows={3} />
        </CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">Foto Sekolah</CardTitle></CardHeader><CardContent>
          <Label>Foto Sekolah (Sejarah)</Label>
          <ImageUpload value={form.fotoSekolah} onChange={url => setForm(f => ({ ...f, fotoSekolah: url }))} placeholder required recommendedSize="1600×900 px (16:9)" />
        </CardContent></Card>
        <Button onClick={handleSave} disabled={isSaving}>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</Button>
      </div>
    </div>
  );
}
