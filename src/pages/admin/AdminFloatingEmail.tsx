import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import { Mail } from 'lucide-react';

export default function AdminFloatingEmail() {
  const { data, updateFloatingEmail } = useSchool();
  const [email, setEmail] = useState(data.floatingEmail);
  const { toast } = useToast();

  const handleSave = () => {
    if (!email.trim()) {
      toast({ title: 'Error', description: 'Email tidak boleh kosong', variant: 'destructive' });
      return;
    }
    updateFloatingEmail(email.trim());
    toast({ title: 'Berhasil', description: 'Email floating berhasil disimpan' });
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-foreground mb-2">Floating Email</h1>
      <p className="text-muted-foreground mb-4">Atur email tujuan untuk tombol floating email di halaman publik.</p>
      <LastModifiedInfo timestamp={data.lastModified.floatingEmail} />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Mail className="w-5 h-5" /> Email Sekolah</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Email Tujuan</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="contoh@email.com" />
            <p className="text-xs text-muted-foreground mt-1">Email ini akan menerima pesan dari pengunjung website.</p>
          </div>
          <Button onClick={handleSave}>Simpan</Button>
        </CardContent>
      </Card>
    </div>
  );
}
