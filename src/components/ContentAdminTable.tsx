import { useState, useEffect } from 'react';
import { Berita, ContentTipe } from '@/contexts/SchoolContext';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Video
} from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import GaleriUpload from '@/components/GaleriUpload';
import LastModifiedInfo, { formatDate } from '@/components/LastModifiedInfo';
import BilingualInput from '@/components/BilingualInput';
import { tr, toBilingual } from '@/lib/i18n';
import { getVideoThumbnail } from '@/lib/videoEmbed';
import AdminPagination from '@/components/AdminPagination';

interface FormState {
  judul: { id: string; en: string };
  tanggal: string;
  tipe: ContentTipe;
  fotoUtama: string;
  thumbnail: string;
  videoUrl: string;
  galeri: (string | File)[];
  deskripsi: { id: string; en: string };

  _fotoFile?: File;
  _thumbnailFile?: File;
  _galeriFiles?: File[];
}

const emptyForm = (): FormState => ({
  judul: { id: '', en: '' },
  tanggal: '',
  tipe: 'foto',
  fotoUtama: '',
  thumbnail: '',
  videoUrl: '',
  galeri: [],
  deskripsi: { id: '', en: '' }
});

interface Props {
  title: string;
  items: Berita[];
  onChange: (items: Berita[]) => Promise<void> | void;
  lastModified?: string;
}

export default function ContentAdminTable({
  title,
  items,
  onChange,
  lastModified
}: Props) {
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Berita | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filtered = items.filter(k =>
    tr(k.judul, 'id').toLowerCase().includes(search.toLowerCase())
  );
  const paginatedData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

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
      deskripsi: toBilingual(k.deskripsi)
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.judul.id || !form.tanggal) return;

    if (form.tipe === 'foto' && !form.fotoUtama) {
      alert('Foto Utama wajib diisi untuk tipe Foto.');
      return;
    }

    if (form.tipe === 'video' && !form.videoUrl) {
      alert('URL Video wajib diisi untuk tipe Video.');
      return;
    }

    setIsSaving(true);
    try {
      const now = new Date().toISOString();

      if (editItem) {
        await onChange(
          items.map(k =>
            k.id === editItem.id ? { ...k, ...form, lastModified: now } : k
          )
        );
      } else {
        await onChange([
          ...items,
          { id: Date.now().toString(), ...form, lastModified: now }
        ]);
      }

      setDialogOpen(false);
      toast({ title: 'Berhasil', description: 'Data disimpan' });
    } catch (err: any) {
      toast({ title: 'Gagal', description: err.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus item ini?')) {
      try {
        await onChange(items.filter(k => k.id !== id));
        toast({ title: 'Berhasil', description: 'Data dihapus' });
      } catch (err: any) {
        toast({ title: 'Gagal', description: err.message, variant: 'destructive' });
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd} className="gap-2">
              <Plus className="w-4 h-4" /> Tambah
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editItem ? 'Edit' : 'Tambah'}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <BilingualInput
                label="Judul"
                value={form.judul}
                onChange={v => setForm(f => ({ ...f, judul: v }))}
              />

              <div>
                <Label>Tanggal</Label>
                <Input
                  type="date"
                  value={form.tanggal}
                  onChange={e =>
                    setForm(f => ({ ...f, tanggal: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label>Tipe Konten</Label>
                <RadioGroup
                  value={form.tipe}
                  onValueChange={v =>
                    setForm(f => ({ ...f, tipe: v as ContentTipe }))
                  }
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center gap-2 border rounded-lg px-4 py-2 flex-1 cursor-pointer">
                    <RadioGroupItem value="foto" id="tipe-foto" />
                    <Label htmlFor="tipe-foto" className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> Foto
                    </Label>
                  </div>

                  <div className="flex items-center gap-2 border rounded-lg px-4 py-2 flex-1 cursor-pointer">
                    <RadioGroupItem value="video" id="tipe-video" />
                    <Label htmlFor="tipe-video" className="flex items-center gap-2">
                      <Video className="w-4 h-4" /> Video
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {form.tipe === 'foto' ? (
                <div>
                  <Label>Foto Utama (Card)</Label>
                  <ImageUpload
                    value={form.fotoUtama}
                    onChange={url => setForm(f => ({ ...f, fotoUtama: url }))}
                    required
                    recommendedSize="1200×800 px (3:2)"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <Label>URL Video</Label>
                    <Input
                      value={form.videoUrl}
                      onChange={e =>
                        setForm(f => ({ ...f, videoUrl: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <Label>Thumbnail (opsional)</Label>
                    <ImageUpload
                      value={form.thumbnail}
                      onChange={url => setForm(f => ({ ...f, thumbnail: url }))}
                      recommendedSize="1200×800 px (3:2)"
                    />
                  </div>
                </>
              )}

              <BilingualInput
                label="Deskripsi"
                value={form.deskripsi}
                onChange={v => setForm(f => ({ ...f, deskripsi: v }))}
                multiline
                rows={4}
              />

              <div>
                <Label>Galeri</Label>
                <GaleriUpload
                  value={form.galeri as string[]}
                  onChange={urls => setForm(f => ({ ...f, galeri: urls }))}
                />
              </div>

              <Button onClick={handleSave} className="w-full" disabled={isSaving}>
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <LastModifiedInfo timestamp={lastModified} />

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari judul..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">No.</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Terakhir Diubah</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((k, index) => {
              const cardImg =
                k.tipe === 'video'
                  ? k.thumbnail || getVideoThumbnail(k.videoUrl)
                  : k.fotoUtama;

              return (
                <TableRow key={k.id}>
                  <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                  <TableCell>
                    {cardImg ? (
                      <img src={cardImg} className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-10 h-10 bg-muted rounded" />
                    )}
                  </TableCell>

                  <TableCell>{tr(k.judul, 'id')}</TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${k.tipe === 'foto'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-red-100 text-red-600'
                        }`}
                    >
                      {k.tipe === 'foto' ? (
                        <>
                          <ImageIcon className="w-3 h-3" />
                          Foto
                        </>
                      ) : (
                        <>
                          <Video className="w-3 h-3" />
                          Video
                        </>
                      )}
                    </span>
                  </TableCell>

                  <TableCell>{k.tanggal}</TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    {k.lastModified ? formatDate(k.lastModified) : k.updated_at ? formatDate(k.updated_at) : '-'}
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button size="sm" onClick={() => openEdit(k)}>
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(k.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <AdminPagination 
          currentPage={currentPage}
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
        />
      </div>
    </div>
  );
}
