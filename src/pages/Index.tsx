import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';
import { Users, BookOpen, Star, Shield, ArrowRight, ChevronLeft, ChevronRight, Award, Quote, GraduationCap, Calendar, Heart, Lightbulb, Target, Smile, Globe, Sparkles, Zap, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Users, Star, Shield, Award, Heart, Lightbulb, Target, Smile, Globe, Sparkles, Zap,
};

export default function Index() {
  const { data } = useSchool();
  const { t, lang } = useLanguage();
  const sambutanRef = useScrollAnimation();
  const keunggulanRef = useScrollAnimation();
  const ekstrakurikulerRef = useScrollAnimation();
  const beritaRef = useScrollAnimation();
  const [ekskulPage, setEkskulPage] = useState(0);

  const totalEkskulPages = Math.ceil(data.ekstrakurikuler.length / 3);
  const visibleEkskul = data.ekstrakurikuler.slice(ekskulPage * 3, (ekskulPage + 1) * 3);

  const hero = data.hero;
  const images = hero.images.length > 0 ? hero.images : [data.profil.fotoSekolah];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => setCurrentSlide(prev => (prev + 1) % images.length), [images.length]);
  const prevSlide = useCallback(() => setCurrentSlide(prev => (prev - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, images.length]);

  const totalSiswa = data.siswa.reduce((s, k) => s + (Number(k.jumlah) || 0), 0);
  const vis = hero.statsVisibility;
  const allStats = [
    { key: 'staff', icon: Users, label: t('hero_stat_staff'), value: data.pegawai.length, show: vis.staff },
    { key: 'students', icon: GraduationCap, label: t('hero_stat_students'), value: totalSiswa, show: vis.students },
    { key: 'ekskul', icon: Award, label: t('hero_stat_ekskul'), value: data.ekstrakurikuler.length, show: vis.ekskul },
    { key: 'founded', icon: Calendar, label: t('hero_stat_founded'), value: hero.tahunBerdiri, show: vis.founded },
  ];
  const stats = allStats.filter(s => s.show);
  const gridColsMap: Record<number, string> = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-2 sm:grid-cols-3', 4: 'grid-cols-2 sm:grid-cols-4' };

  const sambutanText = tr(data.sambutan.teks, lang);

  return (
    <div>
      {/* ==== SECTION LAIN TIDAK DIUBAH ==== */}

      <section className="py-12 md:py-16 bg-muted" ref={beritaRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-10 text-foreground scroll-animate">
            {t('section_kegiatan_terbaru')}
          </h2>

          {/* 🔥 FIX DI SINI (grid-cols-1 ditambahkan) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.berita.slice(0, 6).map((k, i) => {
              const cardImg = k.tipe === 'video' ? k.thumbnail : k.fotoUtama;

              return (
                <Link key={k.id} to={`/berita/${k.id}`}>
                  <Card
                    className="overflow-hidden hover:shadow-lg transition-shadow scroll-animate h-full"
                    style={{ animationDelay: `${(i + 1) * 100}ms` }}
                  >
                    <div className="relative">
                      {cardImg && (
                        <img
                          src={cardImg}
                          alt={tr(k.judul, lang)}
                          className="w-full h-48 object-cover"
                        />
                      )}

                      {k.tipe === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                            <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                          </div>
                        </div>
                      )}
                    </div>

                    <CardContent className="pt-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        {new Date(k.tanggal).toLocaleDateString(
                          lang === 'en' ? 'en-US' : 'id-ID',
                          { day: 'numeric', month: 'long', year: 'numeric' }
                        )}
                      </p>

                      <h3 className="font-semibold text-foreground mb-2">
                        {tr(k.judul, lang)}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tr(k.deskripsi, lang)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8 scroll-animate delay-400">
            <Link to="/berita">
              <Button variant="outline" className="gap-2">
                {t('btn_lihat_semua')} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
