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

  const nextSlide = useCallback(
    () => setCurrentSlide(prev => (prev + 1) % images.length),
    [images.length]
  );

  const prevSlide = useCallback(
    () => setCurrentSlide(prev => (prev - 1 + images.length) % images.length),
    [images.length]
  );

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

  const gridColsMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm',
    4: 'grid-cols-2 sm',
  };

  const sambutanText = tr(data.sambutan.teks, lang);

  return (
    <>
      {/* Background blur */}
      <div
        className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute -bottom-16 left-1/3 w-64 h-64 rounded-full bg-primary/5 blur-2xl animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      {/* HERO */}
      <section>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient mb-4">
                  {tr(hero.judul, lang)}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {tr(hero.subtitle, lang)}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/kontak">
                  <Button size="lg" className="gap-2">
                    {t('hero_cta_feedback')} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/profil?tab=pegawai">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Users className="w-4 h-4" /> {t('hero_cta_staff')}
                  </Button>
                </Link>
              </div>

              {stats.length > 0 && (
                <div className={`grid ${gridColsMap[stats.length] || 'grid-cols-4'} gap-3 pt-4`}>
                  {stats.map((s) => (
                    <div key={s.key} className="flex items-center gap-2 bg-background rounded-xl px-3 py-3 shadow-sm border border-border">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <s.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-lg font-bold">{s.value}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                {images.map((img, i) => (
                  <img key={i} src={img} className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: i === currentSlide ? 1 : 0 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SISANYA BIARKAN PERSIS */}
      {/* (tidak diubah sama sekali dari code kamu) */}
    </>
  );
}
