import { useState } from 'react';
import { Berita, ContentTipe } from '@/contexts/SchoolContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Search, Plus, Pencil, Trash2, Image as ImageIcon, Video } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import GaleriUpload from '@/components/GaleriUpload';
import LastModifiedInfo from '@/components/LastModifiedInfo';
import BilingualInput from '@/components/BilingualInput';
import { tr, toBilingual } from '@/lib/i18n';
import { getVideoThumbnail } from '@/lib/videoEmbed';

interface FormState {
  judul: { id: string; en: string };
  tanggal: string;
  tipe: ContentTipe;
  fotoUtama: string;
  thumbnail: string;
  videoUrl: string;
  galeri: string[];
  deskripsi: { id: string; en: string };
}

const emptyForm = (): FormState => ({
  judul: { id: '', en: '' }, tanggal: '', tipe: 'foto',
  fotoUtama: '', thumbnail: '', videoUrl: '', galeri: [],
  deskripsi: { id: '', en: '' },
});

interface Props {
  title: string;
  items: Berita[];
  onChange: (items: Berita[]) => void;
  lastModified?: string;
}

export default function ContentAdminTable({ title, items, onChange, lastModified }: Props) {
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Berita | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());

  const filtered = items.filter(k => tr(k.judul, 'id').toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditItem(null); setForm(emptyForm()); setDialogOpen(true); };
  const openEdit = (k: Berita) => {
    setEditItem(k);
    setForm({
      judul: toBilingual(k.judul),
      tanggal: k.tanggal,
      tipe: k.tipe,
      fotoUtama: k.fotoUtama,
      thumbnail: k.thumbnail,
      videoUrl: k.videoUrl,
      galeri: k.galeri || [],
      deskripsi: toBilingual(k.deskripsi),
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.judul.id || !form.tanggal) return;
    if (form.tipe === 'foto' && !form.fotoUtama) {
      alert('Foto Utama wajib diisi untuk tipe Foto.');
      return;
    }
    if (form.tipe === 'video' && !form.videoUrl) {
      alert('URL Video wajib diisi untuk tipe Video.');
      return;
    }
    const now = new Date().toISOString();
    if (editItem) {
      onChange(items.map(k => k.id === editItem.id ? { ...k, ...form, lastModified: now } : k));
    } else {
      onChange([...items, { id: Date.now().toString(), ...form, lastModified: now }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => { if (confirm('Hapus item ini?')) onChange(items.filter(k => k.id !== id)); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button onClick={openAdd} className="gap-2"><Plus className="w-4 h-4" /> Tambah</Button></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'Tambah'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <BilingualInput label="Judul" value={form.judul} onChange={v => setForm(f => ({ ...f, judul: v }))} />
              <div><Label>Tanggal</Label><Input type="date" value={form.tanggal} onChange={e => setForm(f => ({ ...f, tanggal: e.target.value }))} /></div>

              <div>
                <Label>Tipe Konten</Label>
                <RadioGroup value={form.tipe} onValueChange={(v) => setForm(f => ({ ...f, tipe: v as ContentTipe }))} className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2 border rounded-lg px-4 py-2 flex-1 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="foto" id="tipe-foto" />
                    <Label htmlFor="tipe-foto" className="cursor-pointer flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Foto</Label>
                  </div>
                  <div className="flex items-center gap-2 border rounded-lg px-4 py-2 flex-1 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="video" id="tipe-video" />
                    <Label htmlFor="tipe-video" className="cursor-pointer flex items-center gap-2"><Video className="w-4 h-4" /> Video</Label>
                  </div>
                </RadioGroup>
              </div>

              {form.tipe === 'foto' ? (
                <div>
                  <Label>Foto Utama (Card)</Label>
                  <ImageUpload value={form.fotoUtama} onChange={url => setForm(f => ({ ...f, fotoUtama: url }))} placeholder required recommendedSize="1200×800 px (3:2)" />
                </div>
              ) : (
                <>
                  <div>
                    <Label>URL Video <span className="text-destructive">*</span></Label>
                    <Input value={form.videoUrl} onChange={e => setForm(f => ({ ...f, videoUrl: e.target.value }))} placeholder="YouTube / TikTok / Instagram / Google Drive" required />
                    <p className="text-xs text-muted-foreground mt-1">Pastikan video / postingan bersifat publik & mendukung embed.</p>
                  </div>
                  <div>
                    <Label>Thumbnail (Card) <span className="text-muted-foreground text-xs">(opsional)</span></Label>
                    <ImageUpload value={form.thumbnail} onChange={url => setForm(f => ({ ...f, thumbnail: url }))} placeholder recommendedSize="1200×800 px (3:2)" />
                    <p className="text-xs text-muted-foreground mt-1">Kosongkan untuk auto-ambil dari URL (YouTube & Google Drive). TikTok/Instagram akan menggunakan placeholder.</p>
                  </div>
                </>
              )}

              <BilingualInput label="Deskripsi" value={form.deskripsi} onChange={v => setForm(f => ({ ...f, deskripsi: v }))} multiline rows={4} />

              <div>
                <Label>Galeri (opsional)</Label>
                <GaleriUpload value={form.galeri} onChange={galeri => setForm(f => ({ ...f, galeri }))} />
              </div>

              <Button onClick={handleSave} className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <LastModifiedInfo timestamp={lastModified} />
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Cari judul..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" /></div>
      </div>
      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(k => {
              const cardImg = k.tipe === 'video'
                ? (k.thumbnail || getVideoThumbnail(k.videoUrl))
                : k.fotoUtama;
              return (
                <TableRow key={k.id}>
                  <TableCell>{cardImg ? <img src={cardImg} alt={tr(k.judul, 'id')} className="w-10 h-10 rounded object-cover" /> : <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">{k.tipe === 'video' ? <Video className="w-4 h-4 text-muted-foreground" /> : null}</div>}</TableCell>
                  <TableCell className="font-medium">
                    {tr(k.judul, 'id')}
                    {k.lastModified && <span className="block text-xs text-muted-foreground">Diubah: {new Date(k.lastModified).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${k.tipe === 'video' ? 'bg-secondary/20 text-secondary-foreground' : 'bg-primary/10 text-primary'}`}>
                      {k.tipe === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                      {k.tipe === 'video' ? 'Video' : 'Foto'}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(k.tanggal).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => openEdit(k)}><Pencil className="w-3 h-3" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(k.id)}><Trash2 className="w-3 h-3" /></Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
