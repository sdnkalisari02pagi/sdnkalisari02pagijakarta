import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

export default function AdminSambutan() {
  const { data, updateSambutan } = useSchool();
  const [form, setForm] = useState({ ...data.sambutan });

  const handleSave = () => {
    updateSambutan(form);
    toast({ title: 'Berhasil', description: 'Sambutan berhasil diperbarui.' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-foreground">Edit Sambutan Kepala Sekolah</h1>
      <div className="space-y-6 max-w-2xl">
        <Card><CardHeader><CardTitle className="text-lg">Data Kepala Sekolah</CardTitle></CardHeader><CardContent className="space-y-4">
          <div><Label>Nama</Label><Input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} /></div>
          <div><Label>Foto</Label><ImageUpload value={form.foto} onChange={url => setForm(f => ({ ...f, foto: url }))} placeholder /></div>
          <div><Label>Teks Sambutan</Label><Textarea rows={10} value={form.teks} onChange={e => setForm(f => ({ ...f, teks: e.target.value }))} /></div>
        </CardContent></Card>
        <Button onClick={handleSave}>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
