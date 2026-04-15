import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import { LayoutTemplate } from 'lucide-react';

export default function AdminFooter() {
  const { data, updateFooter } = useSchool();
  const [form, setForm] = useState(data.footer);
  const { toast } = useToast();

  const handleSave = () => {
    if (!form.namaSekolah.trim()) {
      toast({ title: 'Error', description: 'Nama sekolah tidak boleh kosong', variant: 'destructive' });
      return;
    }
    updateFooter(form);
    toast({ title: 'Berhasil', description: 'Footer berhasil disimpan' });
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-foreground mb-2">Footer</h1>
      <p className="text-muted-foreground mb-4">Atur konten footer yang tampil di halaman publik.</p>
      <LastModifiedInfo timestamp={data.lastModified.footer} />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><LayoutTemplate className="w-5 h-5" /> Konten Footer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nama Sekolah</Label>
            <Input value={form.namaSekolah} onChange={e => setForm({ ...form, namaSekolah: e.target.value })} />
          </div>
          <div>
            <Label>Deskripsi</Label>
            <Textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} rows={3} />
          </div>
          <div>
            <Label>Link Instagram</Label>
            <Input value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} placeholder="https://instagram.com/..." />
          </div>
          <div>
            <Label>Link YouTube</Label>
            <Input value={form.youtube} onChange={e => setForm({ ...form, youtube: e.target.value })} placeholder="https://youtube.com/..." />
          </div>
          <Button onClick={handleSave}>Simpan</Button>
        </CardContent>
      </Card>
    </div>
  );
}
