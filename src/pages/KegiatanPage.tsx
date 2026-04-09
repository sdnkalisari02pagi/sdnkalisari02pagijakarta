import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function KegiatanPage() {
  const { data } = useSchool();
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [selectedKegiatan, setSelectedKegiatan] = useState<typeof data.kegiatan[0] | null>(null);

  const filtered = data.kegiatan.filter(k => {
    const matchSearch = k.judul.toLowerCase().includes(search.toLowerCase());
    const matchDate = !filterDate || k.tanggal.startsWith(filterDate);
    return matchSearch && matchDate;
  }).sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-foreground">Kegiatan Sekolah</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari kegiatan..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Input type="month" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="w-full sm:w-48" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.map(k => (
            <Card key={k.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedKegiatan(k)}>
              <img src={k.foto} alt={k.judul} className="w-full h-48 object-cover" />
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">{new Date(k.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <h3 className="font-semibold text-foreground mb-2">{k.judul}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{k.deskripsi}</p>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && <p className="col-span-full text-center text-muted-foreground">Tidak ada kegiatan ditemukan.</p>}
        </div>
      </div>

      <Dialog open={!!selectedKegiatan} onOpenChange={open => !open && setSelectedKegiatan(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden">
          <ScrollArea className="max-h-[85vh]">
            {selectedKegiatan && (
              <div>
                <img src={selectedKegiatan.foto} alt={selectedKegiatan.judul} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <DialogHeader>
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(selectedKegiatan.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <DialogTitle className="text-2xl">{selectedKegiatan.judul}</DialogTitle>
                  </DialogHeader>
                  <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">{selectedKegiatan.deskripsi}</p>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
