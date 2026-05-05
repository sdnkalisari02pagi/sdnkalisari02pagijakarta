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

  const [logo, setLogo] = useState<string | File>(data.logo || '');
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogo();
  }, []);

  useEffect(() => {
    if (typeof logo === 'string') {
      setPreview(logo);
      if (logo) updateFavicon(logo);
    } else if (logo instanceof File) {
      const url = URL.createObjectURL(logo);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
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
      setPreview(dbData.url);
      updateLogo?.(dbData.url, dbData.updated_at);
      updateFavicon(dbData.url);
    }
  };

  // 🔥 FIX: pakai path tetap → auto replace
  const uploadToStorage = async (file: File) => {
    const filePath = `logo`; // 🔥 satu file saja

    const { error } = await supabase.storage
      .from('logo')
      .upload(filePath, file, {
        upsert: true, // replace file lama
        contentType: file.type
      });

    if (error) {
      console.error('UPLOAD ERROR:', error);
      throw error;
    }

    const { data } = supabase.storage
      .from('logo')
      .getPublicUrl(filePath);

    // 🔥 cache bust biar nggak ke-cache browser
    return data.publicUrl + `?t=${Date.now()}`;
  };

  const handleSave = async () => {
    if (!logo) {
      toast({ title: 'Gagal', description: 'Upload dulu logo', variant: 'destructive' });
      return;
    }

    setLoading(true);

    try {
      let finalUrl = '';

      if (logo instanceof File) {
        finalUrl = await uploadToStorage(logo);
      } else {
        finalUrl = logo;
      }

      const { error } = await supabase
        .from('logo')
        .upsert({
          id: 1,
          url: finalUrl
        });

      if (error) throw error;

      setLogo(finalUrl);
      setPreview(finalUrl);

      // ❌ jangan langsung update state
      // updateLogo?.(finalUrl);
      
      // ✅ paksa ambil ulang dari DB biar konsisten
      const { data: dbData } = await supabase
        .from('logo')
        .select('*')
        .eq('id', 1)
        .maybeSingle();
      
      if (dbData) {
        updateLogo?.(dbData.url);
      }
      updateFavicon(finalUrl);

      toast({ title: 'Berhasil', description: 'Logo disimpan' });

    } catch (err: any) {
      console.error(err);
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    // 🔥 hapus 1 file saja
    await supabase.storage.from('logo').remove(['logo']);

    await supabase.from('logo').delete().eq('id', 1);

    setLogo('');
    setPreview('');
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
          {preview ? (
            <img
              src={preview}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <GraduationCap />
          )}

          <ImageUpload
            value={preview}
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
