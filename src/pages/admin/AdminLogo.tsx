import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/ImageUpload';
import { toast } from '@/hooks/use-toast';
import { GraduationCap } from 'lucide-react';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export default function AdminLogo() {
  const { data, updateLogo } = useSchool();
  const [logo, setLogo] = useState(data.logo);

  useEffect(() => { setLogo(data.logo); }, [data.logo]);

  const handleSave = () => {
    if (!logo) {
      toast({ title: 'Gagal', description: 'Logo wajib diunggah.', variant: 'destructive' });
      return;
    }
    updateLogo(logo);
    toast({ title: 'Berhasil', description: 'Logo berhasil disimpan.' });
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-foreground mb-2">Logo Website</h1>
      <LastModifiedInfo timestamp={data.lastModified?.logo} />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Logo Saat Ini</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {logo ? (
              <img src={logo} alt="Logo" className="w-16 h-16 rounded-full object-cover border" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </div>
            )}
            <p className="text-sm text-muted-foreground">{logo ? 'Logo sudah diunggah' : 'Belum ada logo'}</p>
          </div>
          <ImageUpload value={logo} onChange={setLogo} placeholder required recommendedSize="200×200 px (kotak)" />
          <Button onClick={handleSave} className="w-full gap-2">
            <Save className="w-4 h-4" /> Simpan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
