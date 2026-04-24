import { useSchool } from '@/contexts/SchoolContext';
import ContentAdminTable from '@/components/ContentAdminTable';

export default function AdminBerita() {
  const { data, updateBerita } = useSchool();
  return <ContentAdminTable title="Kelola Berita" items={data.berita} onChange={updateBerita} lastModified={data.lastModified?.berita} />;
}
