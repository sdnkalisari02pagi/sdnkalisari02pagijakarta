import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Profil() {
  const { data } = useSchool();
  const [search, setSearch] = useState('');
  const [filterJabatan, setFilterJabatan] = useState('all');
  const [selectedPegawai, setSelectedPegawai] = useState<any>(null);
  const scrollRef = useScrollAnimation();

  const jabatanList = [...new Set(data.pegawai.map(p => p.jabatan))];
  const filtered = data.pegawai.filter(p => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterJabatan === 'all' || p.jabatan === filterJabatan;
    return matchSearch && matchFilter;
  });

  return (
    <div className="py-10" ref={scrollRef}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-foreground scroll-animate">Profil Sekolah</h1>

        <Tabs defaultValue="sejarah" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sejarah">Sejarah</TabsTrigger>
            <TabsTrigger value="visimisi">Visi & Misi</TabsTrigger>
            <TabsTrigger value="pegawai">Pegawai</TabsTrigger>
          </TabsList>

          <TabsContent value="sejarah" className="mt-6">
            <img src={data.profil.fotoSekolah} alt="Sekolah" className="w-full h-64 object-cover rounded-lg mb-6 scroll-animate" />
            <p className="text-muted-foreground leading-relaxed scroll-animate" style={{ animationDelay: '150ms' }}>{data.profil.sejarah}</p>
          </TabsContent>

          <TabsContent value="visimisi" className="mt-6 space-y-6">
            <Card className="scroll-animate"><CardContent className="pt-6">
              <h3 className="font-semibold text-lg text-foreground mb-2">Visi</h3>
              <p className="text-muted-foreground">{data.profil.visi}</p>
            </CardContent></Card>
            <Card className="scroll-animate" style={{ animationDelay: '150ms' }}><CardContent className="pt-6">
              <h3 className="font-semibold text-lg text-foreground mb-2">Misi</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                {data.profil.misi.map((m, i) => <li key={i}>{m}</li>)}
              </ol>
            </CardContent></Card>
            <Card className="scroll-animate" style={{ animationDelay: '300ms' }}><CardContent className="pt-6">
              <h3 className="font-semibold text-lg text-foreground mb-2">Tujuan</h3>
              <p className="text-muted-foreground">{data.profil.tujuan}</p>
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="pegawai" className="mt-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 scroll-animate">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Cari nama..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
              </div>
              <Select value={filterJabatan} onValueChange={setFilterJabatan}>
                <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Filter jabatan" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jabatan</SelectItem>
                  {jabatanList.map(j => <SelectItem key={j} value={j}>{j}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((p, index) => (
                <Card key={p.id} className="text-center hover:shadow-lg transition-shadow cursor-pointer overflow-hidden scroll-animate" style={{ animationDelay: `${index * 100}ms` }} onClick={() => setSelectedPegawai(p)}>
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img src={p.foto} alt={p.nama} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground">{p.nama}</h4>
                    <p className="text-sm text-muted-foreground">{p.jabatan}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Dialog open={!!selectedPegawai} onOpenChange={(open) => !open && setSelectedPegawai(null)}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">{selectedPegawai?.nama}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-lg">
                    <img src={selectedPegawai?.foto} alt={selectedPegawai?.nama} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-muted-foreground">{selectedPegawai?.jabatan}</p>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}