import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import LastModifiedInfo from '@/components/LastModifiedInfo';

export default function AdminProfil() {
  const { data, updateProfil } = useSchool();
  const [form, setForm] = useState({ ...data.profil });

  const handleSave = () => {
    updateProfil(form);
    toast({ title: 'Berhasil', description: 'Profil sekolah berhasil diperbarui.' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-foreground">Edit Profil Sekolah</h1>
      <LastModifiedInfo timestamp={data.lastModified?.profil} />
      <div className="space-y-6 max-w-2xl">
        <Card><CardHeader><CardTitle className="text-lg">Sejarah</CardTitle></CardHeader><CardContent>
          <Textarea rows={6} value={form.sejarah} onChange={e => setForm(f => ({ ...f, sejarah: e.target.value }))} />
        </CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">Visi</CardTitle></CardHeader><CardContent>
          <Textarea rows={3} value={form.visi} onChange={e => setForm(f => ({ ...f, visi: e.target.value }))} />
        </CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">Misi</CardTitle></CardHeader><CardContent>
          <Textarea rows={6} value={form.misi.join('\n')} onChange={e => setForm(f => ({ ...f, misi: e.target.value.split('\n') }))} />
          <p className="text-xs text-muted-foreground mt-1">Satu misi per baris</p>
        </CardContent></Card>
        <Card><CardHeader><CardTitle className="text-lg">Tujuan</CardTitle></CardHeader><CardContent>
          <Textarea rows={3} value={form.tujuan} onChange={e => setForm(f => ({ ...f, tujuan: e.target.value }))} />
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
