import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import LastModifiedInfo from '@/components/LastModifiedInfo';

export default function AdminSosialMedia() {
  const { data, updateSosialMedia } = useSchool();
  const [form, setForm] = useState({ ...data.sosialMedia });

  const handleSave = () => {
    updateSosialMedia(form);
    toast({ title: 'Berhasil', description: 'Sosial media berhasil diperbarui.' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-foreground">Sosial Media</h1>
      <LastModifiedInfo timestamp={data.lastModified?.sosialMedia} />
      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader><CardTitle className="text-lg">Akun Sosial Media</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Instagram URL</Label><Input value={form.instagram} onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))} placeholder="https://instagram.com/..." /></div>
            <div><Label>YouTube URL</Label><Input value={form.youtube} onChange={e => setForm(f => ({ ...f, youtube: e.target.value }))} placeholder="https://youtube.com/..." /></div>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@contoh.com" /></div>
          </CardContent>
        </Card>
        <Button onClick={handleSave}>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
