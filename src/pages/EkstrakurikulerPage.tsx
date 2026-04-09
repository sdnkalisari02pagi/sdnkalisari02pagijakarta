import { Link } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent } from '@/components/ui/card';

export default function EkstrakurikulerPage() {
  const { data } = useSchool();

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-foreground">Ekstrakurikuler</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {data.ekstrakurikuler.map(e => (
            <Link key={e.id} to={`/ekstrakurikuler/${e.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow hover:-translate-y-1 cursor-pointer">
                <img src={e.foto} alt={e.nama} className="w-full h-48 object-cover" />
                <CardContent className="pt-4 text-center">
                  <h3 className="font-semibold text-foreground text-lg">{e.nama}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
