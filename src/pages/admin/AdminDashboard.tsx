import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Star, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const { data } = useSchool();
  const stats = [
    { label: 'Pegawai', value: data.pegawai.length, icon: Users, color: 'bg-primary' },
    { label: 'Kegiatan', value: data.kegiatan.length, icon: Calendar, color: 'bg-secondary' },
    { label: 'Ekstrakurikuler', value: data.ekstrakurikuler.length, icon: Star, color: 'bg-primary' },
    { label: 'Dokumen', value: data.dokumen.length, icon: FileText, color: 'bg-secondary' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-foreground">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
