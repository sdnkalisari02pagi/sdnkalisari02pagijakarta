import { Link } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';
import { Users, BookOpen, Star, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const keunggulan = [
  { icon: BookOpen, title: 'Kurikulum Berkualitas', desc: 'Menerapkan kurikulum merdeka yang inovatif dan menyenangkan.' },
  { icon: Users, title: 'Guru Profesional', desc: 'Tenaga pendidik berpengalaman dan bersertifikasi.' },
  { icon: Star, title: 'Prestasi Gemilang', desc: 'Siswa berprestasi di berbagai kompetisi akademik dan non-akademik.' },
  { icon: Shield, title: 'Lingkungan Aman', desc: 'Lingkungan sekolah yang aman, bersih, dan nyaman.' },
];

export default function Index() {
  const { data } = useSchool();

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[400px] flex items-center justify-center bg-primary overflow-hidden">
        <img src={data.profil.fotoSekolah} alt="SDN Kalisari 02 Pagi" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center text-primary-foreground px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">SDN Kalisari 02 Pagi</h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">Mewujudkan Generasi Cerdas, Berkarakter, dan Berprestasi</p>
          <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-semibold">
            <Users className="w-5 h-5" />
            <span>{data.pegawai.length} Tenaga Pendidik & Kependidikan</span>
          </div>
        </div>
      </section>

      {/* Sambutan */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Sambutan Kepala Sekolah</h2>
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <img src={data.sambutan.foto} alt={data.sambutan.nama} className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-secondary" />
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-1">{data.sambutan.nama}</h3>
              <p className="text-sm text-muted-foreground mb-4">Kepala Sekolah</p>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{data.sambutan.teks.substring(0, 300)}...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Kenapa Memilih Kami?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keunggulan.map((item, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow border-none bg-muted">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Kegiatan Terbaru */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Kegiatan Terbaru</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.kegiatan.slice(0, 6).map(k => (
              <Card key={k.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={k.foto} alt={k.judul} className="w-full h-48 object-cover" />
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground mb-1">{new Date(k.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <h3 className="font-semibold text-foreground mb-2">{k.judul}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{k.deskripsi}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/kegiatan">
              <Button variant="outline" className="gap-2">Lihat Semua <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
