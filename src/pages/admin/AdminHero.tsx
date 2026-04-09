import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export default function AdminHero() {
  const { data, updateHero } = useSchool();
  const [images, setImages] = useState<string[]>(data.hero.images);
  const [judul, setJudul] = useState(data.hero.judul);
  const [subtitle, setSubtitle] = useState(data.hero.subtitle);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleSave = () => {
    if (images.length === 0) {
      toast({ title: 'Gagal', description: 'Minimal 1 gambar hero.', variant: 'destructive' });
      return;
    }
    updateHero({ images, judul, subtitle });
    toast({ title: 'Berhasil', description: 'Hero berhasil diperbarui.' });
  };

  const addImage = (url: string) => {
    if (url) setImages(prev => [...prev, url]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };
  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const newImages = [...images];
    const [moved] = newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, moved);
    setImages(newImages);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Kelola Hero</h1>
      <LastModifiedInfo timestamp={data.lastModified.hero} />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Teks Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Judul</label>
            <Input value={judul} onChange={e => setJudul(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Subtitle</label>
            <Input value={subtitle} onChange={e => setSubtitle(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gambar Carousel ({images.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={e => handleDragOver(e, i)}
                onDrop={() => handleDrop(i)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 p-2 rounded-lg border transition-colors ${
                  dragOverIndex === i ? 'border-primary bg-primary/5' : 'border-border'
                } ${draggedIndex === i ? 'opacity-50' : ''}`}
              >
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab shrink-0" />
                <img src={img} alt={`Slide ${i + 1}`} className="w-24 h-16 object-cover rounded" />
                <span className="text-sm text-muted-foreground flex-1">Slide {i + 1}</span>
                <Button variant="ghost" size="icon" onClick={() => removeImage(i)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
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
