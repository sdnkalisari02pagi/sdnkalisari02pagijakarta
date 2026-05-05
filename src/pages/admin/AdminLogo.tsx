import { useSchool } from '@/contexts/SchoolContext';
import { supabase } from '@/lib/supabase';
import { updateFavicon } from '@/utils/updateFavicon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/ImageUpload';
import { toast } from '@/hooks/use-toast';
import { GraduationCap, Save, Trash2 } from 'lucide-react';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function AdminLogo() {
  const { data, updateLogo } = useSchool();
  const [logo, setLogo] = useState(data.logo || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogo();
  }, []);

  useEffect(() => {
    if (logo) {
      updateFavicon(logo);
    }
  }, [logo]);

  const fetchLogo = async () => {
    const { data: dbData } = await supabase
      .from('logo')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (dbData) {
      setLogo(dbData.url);
      updateLogo?.(dbData.url);
      updateFavicon(dbData.url);
    }
  };

  // 🔥 convert base64 → file
  const base64ToFile = async (base64: string) => {
    const res = await fetch(base64);
    const blob = await res.blob();
    return new File([blob], `logo-${Date.now()}.png`, { type: blob.type });
  };

  const uploadToStorage = async (file: File) => {
  const fileName = `logo-${Date.now()}`;

  const { error } = await supabase.storage
    .from('logo')
    .upload(fileName, file);

  if (error) {
    console.error('UPLOAD ERROR:', error);
    throw error;
  }

  const { data } = supabase.storage
    .from('logo')
    .getPublicUrl(fileName);

  return data.publicUrl;
  };

  // 🔥 NEW: DELETE ALL FILE DI BUCKET LOGO
  const deleteAllLogo = async () => {
    const { data: files } = await supabase.storage.from('logo').list();

    if (!files || files.length === 0) return;

    const paths = files.map(f => f.name);

    await supabase.storage.from('logo').remove(paths);
  };

  const handleSave = async () => {
  if (!logo) {
    toast({ title: 'Gagal', description: 'Upload dulu logo', variant: 'destructive' });
    return;
  }

  setLoading(true);

  try {
    let finalUrl = logo;

    // 🔥 upload dulu, JANGAN hapus dulu
    if (logo.startsWith('data:')) {
      const file = await base64ToFile(logo);
      finalUrl = await uploadToStorage(file);
    }

    // 🔥 baru hapus file lama
    await deleteAllLogo();

    // 🔥 INSERT DB + CEK ERROR
    const { error } = await supabase
      .from('logo')
      .upsert({
        id: 1,
        url: finalUrl
      });

    if (error) throw error;

    setLogo(finalUrl);
    updateLogo?.(finalUrl);
    updateFavicon(finalUrl);

    toast({ title: 'Berhasil', description: 'Logo disimpan' });

      } catch (err: any) {
        console.error(err);
        toast({ title: 'Error', description: err.message, variant: 'destructive' });
      }
    
      setLoading(false);
    };

  const handleDelete = async () => {
    await supabase.from('logo').delete().eq('id', 1);

    // 🔥 hapus juga dari storage
    await deleteAllLogo();

    setLogo('');
    updateLogo?.('');
    updateFavicon('');
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-2">Logo Website</h1>

      <LastModifiedInfo timestamp={data.lastModified?.logo} />

      <Card>
        <CardHeader>
          <CardTitle>Logo</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {logo ? (
            <img src={logo} className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <GraduationCap />
          )}

          <ImageUpload
            value={logo}
            onChange={setLogo}
            placeholder
            required
            recommendedSize="200×200 px (kotak)"
          />

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={loading}>
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save'}
            </Button>

            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
