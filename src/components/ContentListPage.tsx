import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSchool, Berita } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowRight, Play, Image as ImageIcon } from 'lucide-react';
import FilterSidebar from '@/components/FilterSidebar';
import PaginationBar, { PerPage, paginate } from '@/components/PaginationBar';

interface Props {
  title: string;
  items: Berita[];
  basePath: string; // e.g. /berita or /prestasi
  searchKey: 'search_berita' | 'search_prestasi';
  emptyKey: 'no_berita' | 'no_prestasi';
}

export default function ContentListPage({ title, items, basePath, searchKey, emptyKey }: Props) {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterTipe, setFilterTipe] = useState<'all' | 'foto' | 'video'>('all');
  const [perPage, setPerPage] = useState<PerPage>(10);
  const [page, setPage] = useState(1);

  const locale = lang === 'en' ? 'en-US' : 'id-ID';

  const filtered = useMemo(() => {
    return items.filter(k => {
      const ms = tr(k.judul, lang).toLowerCase().includes(search.toLowerCase());
      const md = !filterMonth || k.tanggal.startsWith(filterMonth);
      const mt = filterTipe === 'all' || k.tipe === filterTipe;
      return ms && md && mt;
    }).sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
  }, [items, search, filterMonth, filterTipe, lang]);

  const paged = paginate(filtered, page, perPage);

  const onFilterChange = (fn: () => void) => { fn(); setPage(1); };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">{title}</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <FilterSidebar>
            <div>
              <Label className="text-xs text-muted-foreground">{t('cari')}</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder={t(searchKey)} value={search} onChange={e => onFilterChange(() => setSearch(e.target.value))} className="pl-10" />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">{t('tanggal')}</Label>
              <Input type="month" value={filterMonth} onChange={e => onFilterChange(() => setFilterMonth(e.target.value))} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">{t('tipe_konten')}</Label>
              <Select value={filterTipe} onValueChange={v => onFilterChange(() => setFilterTipe(v as any))}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('semua')}</SelectItem>
                  <SelectItem value="foto">{t('tipe_foto')}</SelectItem>
                  <SelectItem value="video">{t('tipe_video')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FilterSidebar>

          <div className="flex-1 min-w-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map(k => {
                const cardImg = k.tipe === 'video' ? k.thumbnail : k.fotoUtama;
                return (
                  <Card key={k.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                    <div className="relative">
                      {cardImg ? (
                        <img src={cardImg} alt={tr(k.judul, lang)} className="w-full h-48 object-cover" />
                      ) : (
                        <div className="w-full h-48 bg-muted flex items-center justify-center"><ImageIcon className="w-10 h-10 text-muted-foreground" /></div>
                      )}
                      {k.tipe === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"><Play className="w-6 h-6 text-primary fill-primary ml-1" /></div>
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-4 flex flex-col flex-1">
                      <p className="text-xs text-muted-foreground mb-1">{new Date(k.tanggal).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      <h3 className="font-semibold text-foreground mb-2">{tr(k.judul, lang)}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{tr(k.deskripsi, lang)}</p>
                      <div className="mt-auto">
                        <Link to={`${basePath}/${k.id}`}>
                          <Button size="sm" variant="outline" className="gap-1 w-full">
                            {t('btn_selengkapnya')} <ArrowRight className="w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {paged.length === 0 && <p className="col-span-full text-center text-muted-foreground py-8">{t(emptyKey)}</p>}
            </div>
            <PaginationBar total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} onPerPageChange={pp => { setPerPage(pp); setPage(1); }} />
          </div>
        </div>
      </div>
    </div>
  );
}
