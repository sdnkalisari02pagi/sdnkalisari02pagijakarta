import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Search, Download } from 'lucide-react';

export default function Layanan() {
  const { data } = useSchool();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const filtered = data.dokumen.filter(d => {
    const matchSearch = d.nama.toLowerCase().includes(search.toLowerCase());
    const matchDate = !filterDate || d.tanggal.startsWith(filterDate);
    return matchSearch && matchDate;
  });

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
              {filtered.map(d => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.nama}</TableCell>
                  <TableCell>{new Date(d.tanggal).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="gap-1"><Download className="w-4 h-4" /> {t('btn_unduh')}</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">{t('no_dokumen')}</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
