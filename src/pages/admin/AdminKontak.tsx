import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import LastModifiedInfo from '@/components/LastModifiedInfo';

export default function AdminKontak() {
  const { data, updateKontak } = useSchool();
  const [form, setForm] = useState({ ...data.kontak });

  const handleSave = () => {
    updateKontak(form);
    toast({ title: 'Berhasil', description: 'Kontak berhasil diperbarui.' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-foreground">Edit Kontak</h1>
      <LastModifiedInfo timestamp={data.lastModified?.kontak} />
      <div className="space-y-6 max-w-2xl">
        <Card><CardHeader><CardTitle className="text-lg">Informasi Kontak</CardTitle></CardHeader><CardContent className="space-y-4">
          <div><Label>Alamat</Label><Textarea rows={2} value={form.alamat} onChange={e => setForm(f => ({ ...f, alamat: e.target.value }))} /></div>
          <div><Label>Telepon</Label><Input value={form.telepon} onChange={e => setForm(f => ({ ...f, telepon: e.target.value }))} /></div>
          <div><Label>Email</Label><Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
          <div><Label>Instagram URL</Label><Input value={form.instagram} onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))} /></div>
          <div><Label>YouTube URL</Label><Input value={form.youtube} onChange={e => setForm(f => ({ ...f, youtube: e.target.value }))} /></div>
          <div><Label>Google Maps Embed URL</Label><Textarea rows={3} value={form.mapsEmbed} onChange={e => setForm(f => ({ ...f, mapsEmbed: e.target.value }))} /></div>
        </CardContent></Card>
        <Button onClick={handleSave}>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
