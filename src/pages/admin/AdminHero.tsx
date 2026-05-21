import { useState, useEffect } from 'react';
import { useSchool, HeroData } from '@/contexts/SchoolContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import BilingualInput from '@/components/BilingualInput';
import { Trash2, GripVertical } from 'lucide-react';

const defaultHero: HeroData = {
  judul: { id: '', en: '' },
  subtitle: { id: '', en: '' },
  images: [],
  tahunBerdiri: '',
  statsVisibility: {
    staff: true,
    students: true,
    ekskul: true,
    founded: true,
  }
};

export interface HeroData {
  judul: Bilingual;
  subtitle: Bilingual;
  images: string[];
  tahunBerdiri: string;
  statsVisibility: {
    staff: boolean;
    students: boolean;
    ekskul: boolean;
    founded: boolean;
  };
}

export default function AdminHero() {
  const { data, updateHero } = useSchool();

  const [hero, setHero] = useState<HeroData>(defaultHero);
  const [files, setFiles] = useState<File[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data?.hero) {
      setHero({
        ...defaultHero,
        ...data.hero,
        statsVisibility: {
          ...defaultHero.statsVisibility,
          ...(data.hero.statsVisibility || {})
        }
      });
    }
  }, [data?.hero]);

  const uploadToStorage = async (file: File) => {
    const fileName = `hero-${Date.now()}-${Math.random()}`;

    const { error } = await supabase.storage
      .from('hero')
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('hero')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  // 🔥 NEW: DELETE ALL HERO FILES
  const deleteAllHero = async () => {
    const { data: files } = await supabase.storage.from('hero').list();

    if (!files || files.length === 0) return;

    const paths = files.map(f => f.name);

    await supabase.storage.from('hero').remove(paths);
  };

  const handleSave = async () => {
    if (!hero.images || hero.images.length === 0) {
      toast({ title: 'Gagal', description: 'Minimal 1 gambar hero.', variant: 'destructive' });
      return;
    }

    try {
      let finalImages = [...hero.images];

      // 🔥 kalau ada upload baru → bersihin dulu bucket
      if (files.length > 0) {
        await deleteAllHero(); // 🔥 CLEANUP

        const uploadedUrls = await Promise.all(
          files.map(file => uploadToStorage(file))
        );

        finalImages = uploadedUrls;
      }

      updateHero({
        ...hero,
        images: finalImages
      });

      setFiles([]);

      toast({ title: 'Berhasil', description: 'Hero berhasil diperbarui.' });

    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const addImage = (url: string) => {
  if (!url) return;

  setHero(h => ({
    ...h,
    images: [...(h.images || []), url]
  }));
};

  const removeImage = (index: number) => {
    setHero(h => ({
      ...h,
      images: (h.images || []).filter((_, i) => i !== index)
    }));
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...(hero.images || [])];
    const [moved] = newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, moved);

    setHero(h => ({ ...h, images: newImages }));
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const setVis = (key: keyof HeroData['statsVisibility'], val: boolean) => {
    setHero(h => ({
      ...h,
      statsVisibility: {
        ...(h.statsVisibility || defaultHero.statsVisibility),
        [key]: val
      }
    }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Kelola Hero</h1>

      <LastModifiedInfo timestamp={data?.lastModified?.hero} />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Teks Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <BilingualInput
            label="Judul"
            value={hero.judul}
            onChange={v => setHero(h => ({ ...h, judul: v }))}
          />
          <BilingualInput
            label="Subtitle"
            value={hero.subtitle}
            onChange={v => setHero(h => ({ ...h, subtitle: v }))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Statistik Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Tahun Berdiri</Label>
            <Input
              value={hero.tahunBerdiri || ''}
              onChange={e => setHero(h => ({ ...h, tahunBerdiri: e.target.value }))}
              placeholder="1985"
            />
          </div>

          {[
            { key: 'staff', label: 'Guru & Staff' },
            { key: 'students', label: 'Siswa (otomatis dari data Siswa)' },
            { key: 'ekskul', label: 'Ekskul (otomatis dari data Ekstrakurikuler)' },
            { key: 'founded', label: 'Berdiri (Tahun)' },
          ].map(s => (
            <div key={s.key} className="flex justify-between">
              <Label>{s.label}</Label>
              <Switch
                checked={hero.statsVisibility?.[s.key] ?? true}
                onCheckedChange={v => setVis(s.key as any, v)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gambar Carousel ({hero.images?.length || 0})</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {(hero.images || []).map((img, i) => (
            <div key={i} className="flex items-center gap-3 border p-2 rounded">
              <GripVertical className="w-4 h-4" />
              <img src={img} className="w-24 h-16 object-cover rounded" />
              <span className="flex-1">Slide {i + 1}</span>
              <Button size="icon" onClick={() => removeImage(i)}>
                <Trash2 />
              </Button>
            </div>
          ))}

          <ImageUpload
            value=""
            onChange={(file) => {
              if (!file) return;

              if (typeof file !== 'string') {
                const previewUrl = URL.createObjectURL(file);
                addImage(previewUrl);
                setFiles(f => [...f, file]);
              }
            }}
            placeholder
            recommendedSize="1920×900 px (panorama 16:7.5)"
          />
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Simpan
      </Button>
    </div>
  );
}
