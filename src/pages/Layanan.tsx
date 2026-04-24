import { useState, useMemo } from 'react';
import { useSchool, Dokumen } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Search, Download, Eye } from 'lucide-react';
import DocumentPreview, { detectDocType } from '@/components/DocumentPreview';
import FilterSidebar from '@/components/FilterSidebar';
import PaginationBar, { PerPage, paginate } from '@/components/PaginationBar';

export default function Layanan() {
  const { data } = useSchool();
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [previewDoc, setPreviewDoc] = useState<Dokumen | null>(null);
  const [perPage, setPerPage] = useState<PerPage>(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => data.dokumen.filter(d => {
    const ms = tr(d.nama, lang).toLowerCase().includes(search.toLowerCase());
    const md = !filterDate || d.tanggal.startsWith(filterDate);
    return ms && md;
  }), [data.dokumen, search, filterDate, lang]);

  const paged = paginate(filtered, page, perPage);

  const handleDownload = (d: Dokumen) => {
    if (!d.url || d.url === '#') return;
    const a = document.createElement('a');
    a.href = d.url;
    a.download = tr(d.nama, lang);
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">{t('page_dokumen')}</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <FilterSidebar>
            <div>
              <Label className="text-xs text-muted-foreground">{t('cari')}</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder={t('search_dokumen')} value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-10" />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">{t('tanggal')}</Label>
              <Input type="month" value={filterDate} onChange={e => { setFilterDate(e.target.value); setPage(1); }} className="mt-1" />
            </div>
          </FilterSidebar>

          <div className="flex-1 min-w-0">
            <div className="rounded-lg border bg-background">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('table_nama')}</TableHead>
                    <TableHead>{t('table_tanggal')}</TableHead>
                    <TableHead className="text-right">{t('table_aksi')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paged.map(d => {
                    const canPreview = !!d.url && d.url !== '#' && detectDocType(d.url) !== 'unknown';
                    return (
                      <TableRow key={d.id}>
                        <TableCell className="font-medium">{tr(d.nama, lang)}</TableCell>
                        <TableCell>{new Date(d.tanggal).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID')}</TableCell>
                        <TableCell className="text-right space-x-2">
                          {canPreview && (
                            <Button size="sm" variant="ghost" className="gap-1" onClick={() => setPreviewDoc(d)}>
                              <Eye className="w-4 h-4" /> {t('btn_preview')}
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="gap-1" onClick={() => handleDownload(d)} disabled={!d.url || d.url === '#'}>
                            <Download className="w-4 h-4" /> {t('btn_unduh')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {paged.length === 0 && <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-6">{t('no_dokumen')}</TableCell></TableRow>}
                </TableBody>
              </Table>
            </div>
            <PaginationBar total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} onPerPageChange={pp => { setPerPage(pp); setPage(1); }} />
          </div>
        </div>
      </div>

      <DocumentPreview
        open={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        url={previewDoc?.url || ''}
        title={previewDoc ? tr(previewDoc.nama, lang) : ''}
        onDownload={() => previewDoc && handleDownload(previewDoc)}
      />
    </div>
  );
}
