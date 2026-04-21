import { useState } from 'react';
import { useSchool, HeroData } from '@/contexts/SchoolContext';
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

export default function AdminHero() {
  const { data, updateHero } = useSchool();
  const [hero, setHero] = useState<HeroData>(data.hero);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleSave = () => {
    if (hero.images.length === 0) {
      toast({ title: 'Gagal', description: 'Minimal 1 gambar hero.', variant: 'destructive' });
      return;
    }
    updateHero(hero);
    toast({ title: 'Berhasil', description: 'Hero berhasil diperbarui.' });
  };

  const addImage = (url: string) => { if (url) setHero(h => ({ ...h, images: [...h.images, url] })); };
  const removeImage = (index: number) => setHero(h => ({ ...h, images: h.images.filter((_, i) => i !== index) }));
  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const newImages = [...hero.images];
    const [moved] = newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, moved);
    setHero(h => ({ ...h, images: newImages }));
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const setVis = (key: keyof HeroData['statsVisibility'], val: boolean) =>
    setHero(h => ({ ...h, statsVisibility: { ...h.statsVisibility, [key]: val } }));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Kelola Hero</h1>
      <LastModifiedInfo timestamp={data.lastModified.hero} />

      <Card>
        <CardHeader><CardTitle className="text-lg">Teks Hero</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <BilingualInput label="Judul" value={hero.judul} onChange={v => setHero(h => ({ ...h, judul: v }))} />
          <BilingualInput label="Subtitle" value={hero.subtitle} onChange={v => setHero(h => ({ ...h, subtitle: v }))} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Statistik Hero</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Tahun Berdiri</Label>
            <Input value={hero.tahunBerdiri} onChange={e => setHero(h => ({ ...h, tahunBerdiri: e.target.value }))} placeholder="1985" />
            <p className="text-xs text-muted-foreground mt-1">Ditampilkan di statistik "Berdiri" pada Hero.</p>
          </div>
          <div className="space-y-3 pt-2 border-t">
            <p className="text-sm font-medium">Tampilkan / Sembunyikan Statistik</p>
            {[
              { key: 'staff' as const, label: 'Guru & Staff' },
              { key: 'students' as const, label: 'Siswa (otomatis dari data Siswa)' },
              { key: 'ekskul' as const, label: 'Ekskul (otomatis dari data Ekstrakurikuler)' },
              { key: 'founded' as const, label: 'Berdiri (Tahun)' },
            ].map(s => (
              <div key={s.key} className="flex items-center justify-between p-3 rounded-lg border">
                <Label htmlFor={`vis-${s.key}`} className="cursor-pointer">{s.label}</Label>
                <Switch id={`vis-${s.key}`} checked={hero.statsVisibility[s.key]} onCheckedChange={v => setVis(s.key, v)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Gambar Carousel ({hero.images.length})</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {hero.images.map((img, i) => (
              <div key={i} draggable onDragStart={() => setDraggedIndex(i)} onDragOver={e => { e.preventDefault(); setDragOverIndex(i); }} onDrop={() => handleDrop(i)} onDragEnd={() => { setDraggedIndex(null); setDragOverIndex(null); }} className={`flex items-center gap-3 p-2 rounded-lg border transition-colors ${dragOverIndex === i ? 'border-primary bg-primary/5' : 'border-border'} ${draggedIndex === i ? 'opacity-50' : ''}`}>
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab shrink-0" />
                <img src={img} alt={`Slide ${i + 1}`} className="w-24 h-16 object-cover rounded" />
                <span className="text-sm text-muted-foreground flex-1">Slide {i + 1}</span>
                <Button variant="ghost" size="icon" onClick={() => removeImage(i)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Tambah Gambar</p>
            <ImageUpload value="" onChange={addImage} />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">Simpan</Button>
    </div>
  );
}
