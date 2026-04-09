import { useParams, Link } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function EkstrakurikulerDetail() {
  const { id } = useParams();
  const { data } = useSchool();
  const ekskul = data.ekstrakurikuler.find(e => e.id === id);

  if (!ekskul) return <div className="py-20 text-center text-muted-foreground">Ekstrakurikuler tidak ditemukan.</div>;

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/ekstrakurikuler">
          <Button variant="ghost" className="mb-6 gap-2"><ArrowLeft className="w-4 h-4" /> Kembali</Button>
        </Link>
        <h1 className="text-3xl font-bold mb-4 text-foreground">{ekskul.nama}</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">{ekskul.deskripsi}</p>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Galeri</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ekskul.galeri.map((foto, i) => (
            <img key={i} src={foto} alt={`${ekskul.nama} ${i + 1}`} className="w-full h-48 object-cover rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
