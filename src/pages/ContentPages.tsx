import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentListPage from '@/components/ContentListPage';
import ContentDetailPage from '@/components/ContentDetailPage';

export function BeritaPage() {
  const { data } = useSchool();
  const { t } = useLanguage();
  return <ContentListPage title={t('page_berita')} items={data.berita} basePath="/berita" searchKey="search_berita" emptyKey="no_berita" />;
}

export function BeritaDetail() {
  const { data } = useSchool();
  return <ContentDetailPage items={data.berita} backPath="/berita" />;
}

export function PrestasiPage() {
  const { data } = useSchool();
  const { t } = useLanguage();
  return <ContentListPage title={t('page_prestasi')} items={data.prestasi} basePath="/prestasi" searchKey="search_prestasi" emptyKey="no_prestasi" />;
}

export function PrestasiDetail() {
  const { data } = useSchool();
  return <ContentDetailPage items={data.prestasi} backPath="/prestasi" />;
}
