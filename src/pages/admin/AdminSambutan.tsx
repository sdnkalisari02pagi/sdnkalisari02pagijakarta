import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import BilingualInput from '@/components/BilingualInput';

export default function AdminSambutan() {
  const { data, updateSambutan } = useSchool();
  const [form, setForm] = useState({ ...data.sambutan });

  const handleSave = () => {
    updateSambutan(form);
    toast({ title: 'Berhasil', description: 'Sambutan berhasil diperbarui.' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-foreground">Edit Sambutan Kepala Sekolah</h1>
      <LastModifiedInfo timestamp={data.lastModified?.sambutan} />
      <div className="space-y-6 max-w-3xl">
        <Card><CardHeader><CardTitle className="text-lg">Data Kepala Sekolah</CardTitle></CardHeader><CardContent className="space-y-4">
          <div><Label>Nama</Label><Input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} /></div>
          <div><Label>Foto</Label><ImageUpload value={form.foto} onChange={url => setForm(f => ({ ...f, foto: url }))} placeholder required recommendedSize="600×800 px (3:4)" /></div>
          <BilingualInput label="Teks Sambutan" value={form.teks} onChange={v => setForm(f => ({ ...f, teks: v }))} multiline rows={10} />
        </CardContent></Card>
        <Button onClick={handleSave}>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
