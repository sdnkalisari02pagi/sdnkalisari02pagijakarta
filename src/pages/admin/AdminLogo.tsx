import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/ImageUpload';
import { toast } from '@/hooks/use-toast';
import { GraduationCap } from 'lucide-react';

export default function AdminLogo() {
  const { data, updateLogo } = useSchool();

  const handleChange = (url: string) => {
    updateLogo(url);
    toast({ title: 'Berhasil', description: 'Logo berhasil diperbarui.' });
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">Logo Website</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Logo Saat Ini</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {data.logo ? (
              <img src={data.logo} alt="Logo" className="w-16 h-16 rounded-full object-cover border" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              {data.logo ? 'Logo sudah diunggah' : 'Belum ada logo, menggunakan ikon default'}
            </p>
          </div>
          <ImageUpload value={data.logo} onChange={handleChange} placeholder />
        </CardContent>
      </Card>
    </div>
  );
}
