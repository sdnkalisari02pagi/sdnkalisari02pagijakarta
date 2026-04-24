import { useSchool } from '@/contexts/SchoolContext';
import ContentAdminTable from '@/components/ContentAdminTable';

export default function AdminPrestasi() {
  const { data, updatePrestasi } = useSchool();
  return <ContentAdminTable title="Kelola Prestasi" items={data.prestasi} onChange={updatePrestasi} lastModified={data.lastModified?.prestasi} />;
}
