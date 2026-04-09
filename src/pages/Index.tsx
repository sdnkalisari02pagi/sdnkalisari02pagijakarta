import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';
import { Users, BookOpen, Star, Shield, ArrowRight, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  const kegiatanRef = useScrollAnimation();

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
    { icon: Users, label: 'Tenaga Pendidik', value: data.pegawai.length },
    { icon: Calendar, label: 'Kegiatan', value: data.kegiatan.length },
    { icon: Award, label: 'Ekstrakurikuler', value: data.ekstrakurikuler.length },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[400px] flex items-center justify-center bg-primary overflow-hidden">
        {/* Carousel Images */}
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === currentSlide ? 0.3 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-primary/70" />

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 z-20 p-2 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/40 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 z-20 p-2 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/40 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Content */}
        <div className="relative z-10 text-center text-primary-foreground px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{hero.judul}</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">{hero.subtitle}</p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-background/10 backdrop-blur-md border border-primary-foreground/20 rounded-xl px-5 py-3"
              >
                <s.icon className="w-5 h-5 text-secondary" />
                <div className="text-left">
                  <p className="text-2xl font-bold leading-none">{s.value}</p>
                  <p className="text-xs opacity-80">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 z-20 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentSlide ? 'bg-primary-foreground w-6' : 'bg-primary-foreground/40'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Sambutan */}
      <section className="py-16 bg-muted" ref={sambutanRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground scroll-animate">Sambutan Kepala Sekolah</h2>
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto scroll-animate delay-200">
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

      {/* Kegiatan Terbaru */}
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
