import { useSchool } from '@/contexts/SchoolContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/ImageUpload';
import { toast } from '@/hooks/use-toast';
import { GraduationCap, Save, Trash2 } from 'lucide-react';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function AdminLogo() {
  const { data, updateLogo } = useSchool();
  const [logo, setLogo] = useState(data.logo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    const { data: dbData, error } = await supabase
      .from('logo')
      .select('*')
      .eq('id', 1)
      .single();

    if (!error && dbData) {
      setLogo(dbData.url);
      updateLogo(dbData.url);
    }
  };

  // 🔥 CREATE / UPDATE
  const handleSave = async () => {
    if (!logo) {
      toast({
        title: 'Gagal',
        description: 'Logo wajib diunggah.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      // cek dulu ada data atau tidak
      const { data: existing } = await supabase
        .from('logo')
        .select('*')
        .eq('id', 1)
        .single();

      if (existing) {
        // 🔄 UPDATE
        const { error } = await supabase
          .from('logo')
          .update({ url: logo })
          .eq('id', 1);

        if (error) throw error;
      } else {
        // ➕ CREATE
        const { error } = await supabase
          .from('logo')
          .insert({ id: 1, url: logo });

        if (error) throw error;
      }

      updateLogo(logo);

      toast({
        title: 'Berhasil',
        description: 'Logo berhasil disimpan.'
      });

    } catch (err: any) {
      console.error(err);
      toast({
        title: 'Gagal',
        description: err.message,
        variant: 'destructive'
      });
    }

    setLoading(false);
  };

  // 🗑 DELETE
  const handleDelete = async () => {
    setLoading(true);

    try {
      const { error } = await supabase
        .from('logo')
        .delete()
        .eq('id', 1);

      if (error) throw error;

      setLogo('');
      updateLogo('');

      toast({
        title: 'Berhasil',
        description: 'Logo berhasil dihapus.'
      });

    } catch (err: any) {
      console.error(err);
      toast({
        title: 'Gagal',
        description: err.message,
        variant: 'destructive'
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Logo Website
      </h1>

      <LastModifiedInfo timestamp={data.lastModified?.logo} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Logo Saat Ini</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {logo ? (
              <img
                src={logo}
                alt="Logo"
                className="w-16 h-16 rounded-full object-cover border"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              {logo ? 'Logo sudah diunggah' : 'Belum ada logo'}
            </p>
          </div>

          <ImageUpload
            value={logo}
            onChange={setLogo}
            placeholder
            required
            recommendedSize="200×200 px (kotak)"
          />

          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="w-full gap-2"
              disabled={loading}
            >
              <Save className="w-4 h-4" />
              {loading ? 'Menyimpan...' : 'Simpan'}
            </Button>

            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={loading}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
