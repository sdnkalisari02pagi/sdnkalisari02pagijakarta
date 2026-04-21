import { useState } from 'react';
import { useSchool, Keunggulan } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Trash2, GripVertical, BookOpen, Users, Star, Shield, Award, Heart, Lightbulb, Target, Smile, Globe, Sparkles, Zap } from 'lucide-react';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import BilingualInput from '@/components/BilingualInput';
import { tr, toBilingual } from '@/lib/i18n';

const iconOptions = [
  { value: 'BookOpen', label: 'Buku', Icon: BookOpen },
  { value: 'Users', label: 'Orang', Icon: Users },
  { value: 'Star', label: 'Bintang', Icon: Star },
  { value: 'Shield', label: 'Perisai', Icon: Shield },
  { value: 'Award', label: 'Penghargaan', Icon: Award },
  { value: 'Heart', label: 'Hati', Icon: Heart },
  { value: 'Lightbulb', label: 'Lampu', Icon: Lightbulb },
  { value: 'Target', label: 'Target', Icon: Target },
  { value: 'Smile', label: 'Senyum', Icon: Smile },
  { value: 'Globe', label: 'Dunia', Icon: Globe },
  { value: 'Sparkles', label: 'Kilau', Icon: Sparkles },
  { value: 'Zap', label: 'Kilat', Icon: Zap },
];

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Users, Star, Shield, Award, Heart, Lightbulb, Target, Smile, Globe, Sparkles, Zap,
};

export default function AdminKeunggulan() {
  const { data, updateKeunggulan } = useSchool();
  const [items, setItems] = useState<Keunggulan[]>(data.keunggulan);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), icon: 'Star', title: { id: '', en: '' }, desc: { id: '', en: '' } }]);
  };

  const removeItem = (id: string) => setItems(items.filter(i => i.id !== id));

  const updateField = (id: string, field: keyof Keunggulan, value: any) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const handleSave = () => {
    const valid = items.every(i => tr(i.title, 'id').trim() && tr(i.desc, 'id').trim());
    if (!valid) { toast.error('Semua judul dan deskripsi (ID) harus diisi'); return; }
    updateKeunggulan(items);
    toast.success('Keunggulan berhasil disimpan');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kenapa Memilih Kami</h1>
          <p className="text-sm text-muted-foreground">Kelola keunggulan sekolah yang ditampilkan di halaman utama</p>
          <LastModifiedInfo timestamp={data.lastModified.keunggulan} />
        </div>
        <Button onClick={addItem} className="gap-2"><Plus className="w-4 h-4" /> Tambah</Button>
      </div>

      {items.map((item, index) => {
        const IconComp = iconMap[item.icon] || Star;
        return (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  Keunggulan {index + 1}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-w-xs">
                <Label>Ikon</Label>
                <Select value={item.icon} onValueChange={v => updateField(item.id, 'icon', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <span className="flex items-center gap-2"><opt.Icon className="w-4 h-4" /> {opt.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <BilingualInput label="Judul" value={item.title} onChange={v => updateField(item.id, 'title', v)} />
              <BilingualInput label="Deskripsi" value={item.desc} onChange={v => updateField(item.id, 'desc', v)} multiline rows={2} />
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <IconComp className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{tr(item.title, 'id') || 'Judul'}</p>
                  <p className="text-sm text-muted-foreground">{tr(item.desc, 'id') || 'Deskripsi'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Button onClick={handleSave} className="w-full" size="lg">Simpan Perubahan</Button>
    </div>
  );
}
