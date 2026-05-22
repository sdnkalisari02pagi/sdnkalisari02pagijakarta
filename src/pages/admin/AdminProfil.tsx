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
        <Card><CardHeader><CardTitle className="text-lg">Misi</CardTitle></CardHeader><CardContent>
          <BilingualInput value={form.misi} onChange={v => setForm(f => ({ ...f, misi: v }))} multiline rows={5} />
        </CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">Tujuan</CardTitle></CardHeader><CardContent>
          <BilingualInput value={form.tujuan} onChange={v => setForm(f => ({ ...f, tujuan: v }))} multiline rows={3} />
        </CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">Foto Sekolah</CardTitle></CardHeader><CardContent>
          <Label>Foto Sekolah (Sejarah)</Label>
          <ImageUpload value={form.fotoSekolah} onChange={url => setForm(f => ({ ...f, fotoSekolah: url }))} placeholder required recommendedSize="1200×900 px (4:3)" />
        </CardContent></Card>
        <Button onClick={handleSave} disabled={isSaving}>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</Button>
      </div>
    </div>
  );
}
