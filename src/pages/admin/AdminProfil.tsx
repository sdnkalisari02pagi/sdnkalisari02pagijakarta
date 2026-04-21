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
import { tr, toBilingual } from '@/lib/i18n';

export default function AdminProfil() {
  const { data, updateProfil } = useSchool();
  const [form, setForm] = useState({ ...data.profil });

  const misiText = form.misi.map(m => tr(m, 'id')).join('\n');
  const misiTextEn = form.misi.map(m => tr(m, 'en')).join('\n');

  const setMisi = (idText: string, enText: string) => {
    const idLines = idText.split('\n');
    const enLines = enText.split('\n');
    const max = Math.max(idLines.length, enLines.length);
    const merged = Array.from({ length: max }, (_, i) => ({ id: idLines[i] || '', en: enLines[i] || '' }))
      .filter(m => m.id.trim() || m.en.trim());
    setForm(f => ({ ...f, misi: merged }));
  };

  const handleSave = () => {
    updateProfil(form);
    toast({ title: 'Berhasil', description: 'Profil sekolah berhasil diperbarui.' });
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
        <Card><CardHeader><CardTitle className="text-lg">Misi</CardTitle></CardHeader><CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">Satu misi per baris (urutan baris harus sama untuk ID & EN)</p>
          <div className="grid sm:grid-cols-2 gap-2">
            <div>
              <Label className="text-[10px] uppercase">🇮🇩 Indonesia</Label>
              <Textarea rows={6} value={misiText} onChange={e => setMisi(e.target.value, misiTextEn)} />
            </div>
            <div>
              <Label className="text-[10px] uppercase">🇬🇧 English</Label>
              <Textarea rows={6} value={misiTextEn} onChange={e => setMisi(misiText, e.target.value)} />
            </div>
          </div>
        </CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">Tujuan</CardTitle></CardHeader><CardContent>
          <BilingualInput value={form.tujuan} onChange={v => setForm(f => ({ ...f, tujuan: v }))} multiline rows={3} />
        </CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">Foto Sekolah</CardTitle></CardHeader><CardContent>
          <Label>Foto Sekolah</Label>
          <ImageUpload value={form.fotoSekolah} onChange={url => setForm(f => ({ ...f, fotoSekolah: url }))} placeholder />
        </CardContent></Card>
        <Button onClick={handleSave}>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
