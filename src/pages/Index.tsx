import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';
import { Users, BookOpen, Star, Shield, ArrowRight, ChevronLeft, ChevronRight, Award, Quote, GraduationCap, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const keunggulan = [
  { icon: BookOpen, title: 'Kurikulum Berkualitas', desc: 'Menerapkan kurikulum merdeka yang inovatif dan menyenangkan.' },
  { icon: Users, title: 'Guru Profesional', desc: 'Tenaga pendidik berpengalaman dan bersertifikasi.' },
  { icon: Star, title: 'Prestasi Gemilang', desc: 'Siswa berprestasi di berbagai kompetisi akademik dan non-akademik.' },
  { icon: Shield, title: 'Lingkungan Aman', desc: 'Lingkungan sekolah yang aman, bersih, dan nyaman.' },
];

export default function Index() {
  const { data } = useSchool();
  const sambutanRef = useScrollAnimation();
  const keunggulanRef = useScrollAnimation();
  const ekstrakurikulerRef = useScrollAnimation();
  const kegiatanRef = useScrollAnimation();
  const [ekskulPage, setEkskulPage] = useState(0);

  const totalEkskulPages = Math.ceil(data.ekstrakurikuler.length / 3);
  const visibleEkskul = data.ekstrakurikuler.slice(ekskulPage * 3, (ekskulPage + 1) * 3);

  const hero = data.hero || { images: [], judul: 'SDN Kalisari 02 Pagi', subtitle: 'Mewujudkan Generasi Cerdas, Berkarakter, dan Berprestasi' };
  const images = hero.images.length > 0 ? hero.images : [data.profil.fotoSekolah];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, images.length]);

  const stats = [
    { icon: Users, label: 'Pegawai', value: data.pegawai.length },
    { icon: Award, label: 'Ekstrakurikuler', value: data.ekstrakurikuler.length },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-6 animate-fade-in-up">

              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient mb-4">
                  {hero.judul}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {hero.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/kontak">
                  <Button size="lg" className="gap-2">
                    Kirim Masukan Anda <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/profil?tab=pegawai">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Users className="w-4 h-4" /> Lihat Guru & Staff
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {[
                  { icon: Users, label: 'Guru & Staff', value: data.pegawai.length },
                  { icon: Award, label: 'Ekstrakurikuler', value: data.ekstrakurikuler.length },
                  { icon: Calendar, label: 'Tahun Berdiri', value: '1985' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 bg-background rounded-xl px-4 py-3 shadow-sm border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xl font-bold leading-none text-foreground">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — Image Carousel */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Slide ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                    style={{ opacity: i === currentSlide ? 1 : 0 }}
                  />
                ))}
              </div>
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentSlide ? 'bg-primary w-6' : 'bg-primary/30'
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sambutan */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" ref={sambutanRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground scroll-animate">Sambutan Kepala Sekolah</h2>
          <div className="flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto scroll-animate delay-200">
            <div className="w-56 h-64 rounded-xl overflow-hidden shadow-xl border-4 border-background shrink-0">
              <img src={data.sambutan.foto} alt={data.sambutan.nama} className="w-full h-full object-cover" />
            </div>
            <div className="border-l-4 border-primary pl-6">
              <Quote className="w-8 h-8 text-secondary mb-3" />
              <h3 className="text-xl font-semibold text-primary mb-1">{data.sambutan.nama}</h3>
              <span className="inline-block bg-primary/15 text-primary text-xs font-medium px-3 py-1 rounded-full mb-4">Kepala Sekolah</span>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{data.sambutan.teks.substring(0, 300)}...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-16" ref={keunggulanRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground scroll-animate">Kenapa Memilih Kami?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keunggulan.map((item, i) => (
              <Card key={i} className={`text-center hover:shadow-lg transition-shadow border-none bg-muted scroll-animate delay-${(i + 1) * 100}`}>
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

      {/* Ekstrakurikuler */}
      <section className="py-16 bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10" ref={ekstrakurikulerRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground scroll-animate">Ekstrakurikuler</h2>
          <div className="relative scroll-animate delay-200">
            {totalEkskulPages > 1 && (
              <>
                <button
                  onClick={() => setEkskulPage(p => (p - 1 + totalEkskulPages) % totalEkskulPages)}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setEkskulPage(p => (p + 1) % totalEkskulPages)}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
              {visibleEkskul.map((e) => (
                <Link key={e.id} to={`/ekstrakurikuler/${e.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <img src={e.foto} alt={e.nama} className="w-full h-48 object-cover" />
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-foreground mb-2">{e.nama}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{e.deskripsi}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center mt-8 scroll-animate delay-300">
            <Link to="/ekstrakurikuler">
              <Button variant="outline" className="gap-2">Lihat Semua <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted" ref={kegiatanRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground scroll-animate">Kegiatan Terbaru</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.kegiatan.slice(0, 6).map((k, i) => (
              <Card key={k.id} className={`overflow-hidden hover:shadow-lg transition-shadow scroll-animate delay-${(i + 1) * 100}`}>
                <img src={k.foto} alt={k.judul} className="w-full h-48 object-cover" />
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground mb-1">{new Date(k.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <h3 className="font-semibold text-foreground mb-2">{k.judul}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{k.deskripsi}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 scroll-animate delay-400">
            <Link to="/kegiatan">
              <Button variant="outline" className="gap-2">Lihat Semua <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
