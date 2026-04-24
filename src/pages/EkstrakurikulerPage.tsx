import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import FilterSidebar from '@/components/FilterSidebar';
import PaginationBar, { PerPage, paginate } from '@/components/PaginationBar';

export default function EkstrakurikulerPage() {
  const { data } = useSchool();
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState<PerPage>(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => data.ekstrakurikuler.filter(e =>
    tr(e.nama, lang).toLowerCase().includes(search.toLowerCase())
  ), [data.ekstrakurikuler, search, lang]);

  const paged = paginate(filtered, page, perPage);

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">{t('page_ekstrakurikuler')}</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <FilterSidebar>
            <div>
              <Label className="text-xs text-muted-foreground">{t('cari')}</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder={t('search_nama')} value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-10" />
              </div>
            </div>
          </FilterSidebar>

          <div className="flex-1 min-w-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map((e) => {
                const nama = tr(e.nama, lang);
                const cardImg = e.fotoUtama || e.foto;
                const pelatihNames = (e.pelatih || []).slice(0, 3).map(p => tr(p.nama, lang)).filter(Boolean);
                return (
                  <Link key={e.id} to={`/ekstrakurikuler/${e.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow hover:-translate-y-1 cursor-pointer h-full">
                      <img src={cardImg} alt={nama} className="w-full h-48 object-cover" />
                      <CardContent className="pt-4 text-center">
                        <h3 className="font-semibold text-foreground text-lg">{nama}</h3>
                        {pelatihNames.length > 0 && (
                          <p className="text-xs text-primary font-medium mt-1">{t('pelatih')}: {pelatihNames.join(', ')}</p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
              {paged.length === 0 && <p className="col-span-full text-center text-muted-foreground py-8">{t('no_data')}</p>}
            </div>
            <PaginationBar total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} onPerPageChange={pp => { setPerPage(pp); setPage(1); }} />
          </div>
        </div>
      </div>
    </div>
  );
}
