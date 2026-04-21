import { useState } from 'react';
import { useSchool, Dokumen } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Search, Download, Eye } from 'lucide-react';
import DocumentPreview, { detectDocType } from '@/components/DocumentPreview';

export default function Layanan() {
  const { data } = useSchool();
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [previewDoc, setPreviewDoc] = useState<Dokumen | null>(null);

  const filtered = data.dokumen.filter(d => {
    const matchSearch = tr(d.nama, lang).toLowerCase().includes(search.toLowerCase());
    const matchDate = !filterDate || d.tanggal.startsWith(filterDate);
    return matchSearch && matchDate;
  });

  const handleDownload = (d: Dokumen) => {
    if (!d.url || d.url === '#') return;
    const a = document.createElement('a');
    a.href = d.url;
    a.download = tr(d.nama, lang);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-10 text-foreground">{t('page_layanan')}</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder={t('search_dokumen')} value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Input type="month" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="w-full sm:w-48" />
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('table_nama')}</TableHead>
                <TableHead>{t('table_tanggal')}</TableHead>
                <TableHead className="text-right">{t('table_aksi')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(d => {
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
              {filtered.length === 0 && <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">{t('no_dokumen')}</TableCell></TableRow>}
            </TableBody>
          </Table>
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
