import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';
import { Users, BookOpen, Star, Shield, ArrowRight, ChevronLeft, ChevronRight, Award, Quote, GraduationCap, Calendar, Heart, Lightbulb, Target, Smile, Globe, Sparkles, Zap, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import LastModifiedInfo from '@/components/LastModifiedInfo';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {BookOpen, Users, Star, Shield, Award, Heart, Lightbulb, Target, Smile, Globe, Sparkles, Zap,};

export default function Index() {const { data } = useSchool();
const langCtx = useLanguage();
const t = typeof langCtx?.t === 'function'
  ? langCtx.t
  : (key: string) => key;

const lang = langCtx?.lang || 'id';                          
const sambutanRef = useScrollAnimation();
const keunggulanRef = useScrollAnimation();
const ekstrakurikulerRef = useScrollAnimation();
const beritaRef = useScrollAnimation();
const kalenderRef = useScrollAnimation();
const [ekskulPage, setEkskulPage] = useState(0);

const totalEkskulPages = Math.ceil(data.ekstrakurikuler.length / 3);const visibleEkskul = data.ekstrakurikuler.slice(ekskulPage * 3, (ekskulPage + 1) * 3);

const hero = data.hero;const images = hero.images.length > 0 ? hero.images : [data.profil.fotoSekolah];const [currentSlide, setCurrentSlide] = useState(0);

const nextSlide = useCallback(() => setCurrentSlide(prev => (prev + 1) % images.length), [images.length]);const prevSlide = useCallback(() => setCurrentSlide(prev => (prev - 1 + images.length) % images.length), [images.length]);

useEffect(() => {if (images.length <= 1) return;const timer = setInterval(nextSlide, 5000);return () => clearInterval(timer);}, [nextSlide, images.length]);

const totalSiswa = data.siswa.reduce((s, k) => s + (Number(k.jumlah) || 0), 0);
const vis = hero.statsVisibility;const allStats = [{ key: 'staff', icon: Users, label: t('hero_stat_staff'), value: data.pegawai.length, show: vis.staff },{ key: 'students', icon: GraduationCap, label: t('hero_stat_students'), value: totalSiswa, show: vis.students },{ key: 'ekskul', icon: Award, label: t('hero_stat_ekskul'), value: data.ekstrakurikuler.length, show: vis.ekskul },{ key: 'founded', icon: Calendar, label: t('hero_stat_founded'), value: hero.tahunBerdiri, show: vis.founded },];
const stats = allStats.filter(s => s.show);
const gridColsMap: Record<number, string> = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-2 sm', 4: 'grid-cols-2 sm' };

  const getMonthAndYear = (dateStr: string) => {
    const cleanStr = dateStr.toLowerCase();
    const idMonths = ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember'];
    const enMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    let monthIndex = -1;
    for (let i = 0; i < 12; i++) {
      if (cleanStr.includes(idMonths[i])) {
        monthIndex = i;
        break;
      }
    }
    if (monthIndex === -1) {
      for (let i = 0; i < 12; i++) {
        if (cleanStr.includes(enMonths[i])) {
          monthIndex = i;
          break;
        }
      }
    }

    const yearMatch = dateStr.match(/\b(20\d{2})\b/);
    const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();

    return { monthIndex, year };
  };

  const getMonthLabel = (monthIndex: number, lang: string) => {
    const idMonths = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const enMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (monthIndex === -1) return lang === 'en' ? 'Other' : 'Lainnya';
    return lang === 'en' ? enMonths[monthIndex] : idMonths[monthIndex];
  };

  const monthStyles = [
    { bg: '#93C5FD', text: 'text-slate-800' }, // 0: Blue
    { bg: '#86EFAC', text: 'text-slate-800' }, // 1: Green
    { bg: '#FDE68A', text: 'text-slate-800' }, // 2: Yellow/Amber
    { bg: '#FDBA74', text: 'text-slate-800' }, // 3: Orange
    { bg: '#FCA5A5', text: 'text-slate-800' }, // 4: Red/Pink
    { bg: '#C4B5FD', text: 'text-slate-800' }, // 5: Violet
    { bg: '#F9A8D4', text: 'text-slate-800' }, // 6: Pink
    { bg: '#99F6E4', text: 'text-slate-800' }, // 7: Teal
    { bg: '#A5F3FC', text: 'text-slate-800' }, // 8: Cyan
    { bg: '#A5B4FC', text: 'text-slate-800' }, // 9: Indigo
    { bg: '#BEF264', text: 'text-slate-800' }, // 10: Lime
    { bg: '#FCD34D', text: 'text-slate-800' }, // 11: Gold/Amber
    { bg: '#D8B4FE', text: 'text-slate-800' }  // 12: Purple
  ];

  const fallbackStyle = { bg: '#CBD5E1', text: 'text-slate-800' };

  const groupedKalender = (() => {
    if (!data.kalender) return [];
    
    const groups: Record<string, { monthIndex: number; year: number; items: any[] }> = {};
    
    data.kalender.forEach((k: any) => {
      const dateStr = tr(k.tanggal, 'id') || '';
      const { monthIndex, year } = getMonthAndYear(dateStr);
      const key = monthIndex === -1 ? 'other' : `${year}-${monthIndex}`;
      
      if (!groups[key]) {
        groups[key] = { monthIndex, year, items: [] };
      }
      groups[key].items.push(k);
    });

    return Object.entries(groups).map(([key, value]) => ({
      key,
      ...value,
      monthLabel: getMonthLabel(value.monthIndex, lang)
    })).sort((a, b) => {
      if (a.monthIndex === -1) return 1;
      if (b.monthIndex === -1) return -1;
      
      const getAcademicScore = (mIdx: number, y: number) => {
        const academicStartYear = mIdx >= 6 ? y : y - 1;
        const offset = (mIdx - 6 + 12) % 12;
        return academicStartYear * 12 + offset;
      };
      
      return getAcademicScore(a.monthIndex, a.year) - getAcademicScore(b.monthIndex, b.year);
    });
  })();

  const sambutanText = tr(data.sambutan.teks, lang);

return (
<div>

  <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
  <div className="absolute -bottom-16 left-1/3 w-64 h-64 rounded-full bg-primary/5 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

  <section className="relative py-12 md:py-24 overflow-hidden hero-gradient">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-16 left-1/3 w-64 h-64 rounded-full bg-primary/5 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient mb-4">{tr(hero.judul, lang)}</h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">{tr(hero.subtitle, lang)}</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/kontak"><Button size="lg" className="gap-2">{t('hero_cta_feedback')} <ArrowRight className="w-4 h-4" /></Button></Link>
                <Link to="/profil?tab=pegawai"><Button size="lg" variant="outline" className="gap-2"><Users className="w-4 h-4" /> {t('hero_cta_staff')}</Button></Link>
              </div>

              {stats.length > 0 && (
                <div className={`grid ${gridColsMap[stats.length] || 'grid-cols-4'} gap-3 pt-4`}>
                  {stats.map((s) => (
                    <div key={s.key} className="flex items-center gap-2 bg-background rounded-xl px-3 py-3 shadow-sm border border-border">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <s.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-lg font-bold leading-none text-foreground">{s.value}</p>
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
                  <img key={i} src={img} alt={`Slide ${i + 1}`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out" style={{ opacity: i === currentSlide ? 1 : 0 }} />
                ))}
                {images.length > 1 && (
                  <>
                    <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/60 backdrop-blur-sm text-foreground hover:bg-background/80 transition-colors shadow-md" aria-label="Previous"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/60 backdrop-blur-sm text-foreground hover:bg-background/80 transition-colors shadow-md" aria-label="Next"><ChevronRight className="w-5 h-5" /></button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlide ? 'bg-primary w-6' : 'bg-primary/30'}`} aria-label={`Slide ${i + 1}`} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

  {/* SEMUA BAGIAN DI BAWAH INI SAMA PERSIS DENGAN CODE LU */}

  <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" ref={sambutanRef}>
    <div className="container mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground scroll-animate">{t('section_sambutan')}</h2>
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-4xl mx-auto scroll-animate delay-200">
        <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-xl overflow-hidden shadow-xl border-4 border-background shrink-0">
          <img src={data.sambutan.foto} alt={data.sambutan.nama} className="w-full h-full object-cover" />
        </div>
        <div className="border-l-4 border-primary pl-4 sm:pl-6">
          <Quote className="w-8 h-8 text-secondary mb-3" />
          <h3 className="text-xl font-semibold text-primary mb-1">{data.sambutan.nama}</h3>
          <span className="inline-block bg-primary/15 text-primary text-xs font-medium px-3 py-1 rounded-full mb-4">{t('section_kepala_sekolah')}</span>
          <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{sambutanText.substring(0, 300)}...</p>
        </div>
      </div>
    </div>
  </section>

  <section className="py-12 md:py-16" ref={keunggulanRef}>
    <div className="container mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-10 text-foreground scroll-animate">{t('section_keunggulan')}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.keunggulan.map((item, i) => {
          const IconComp = iconMap[item.icon] || Star;
          return (
            <Card key={item.id} className={`text-center hover:shadow-lg transition-shadow border-none bg-muted scroll-animate delay-${(i + 1) * 100}`}>
              <CardContent className="pt-6">
                <div className="w-14 h-14 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
                  <IconComp className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{tr(item.judul, lang)}</h3>
                <p className="text-sm text-muted-foreground">{tr(item.deskripsi, lang)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  </section>

  <section className="py-12 md:py-16 bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10" ref={ekstrakurikulerRef}>
    <div className="container mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-10 text-foreground scroll-animate">{t('section_ekstrakurikuler')}</h2>
      <div className="relative scroll-animate delay-200">
        {totalEkskulPages > 1 && (
          <>
            <button onClick={() => setEkskulPage(p => (p - 1 + totalEkskulPages) % totalEkskulPages)} className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors" aria-label="Previous"><ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" /></button>
            <button onClick={() => setEkskulPage(p => (p + 1) % totalEkskulPages)} className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors" aria-label="Next"><ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" /></button>
          </>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10 sm:px-8">
          {visibleEkskul.map((e) => {
            const cardImg = e.fotoUtama || e.foto;
            return (
              <Link key={e.id} to={`/ekstrakurikuler/${e.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <img src={cardImg} alt={tr(e.nama, lang)} className="w-full h-48 object-cover" />
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-foreground mb-1">{tr(e.nama, lang)}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{tr(e.deskripsi, lang)}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="text-center mt-8 scroll-animate delay-300">
        <Link to="/ekstrakurikuler"><Button variant="outline" className="gap-2">{t('btn_lihat_semua')} <ArrowRight className="w-4 h-4" /></Button></Link>
      </div>
    </div>
  </section>

  <section className="py-12 md:py-16 bg-muted" ref={beritaRef}>
    <div className="container mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-10 text-foreground scroll-animate">{t('section_kegiatan_terbaru')}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.berita.slice(0, 6).map((k, i) => {
          const cardImg = k.tipe === 'video' ? k.thumbnail : k.fotoUtama;
          return (
            <Link key={k.id} to={`/berita/${k.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow scroll-animate" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                <div className="relative">
                  {cardImg && <img src={cardImg} alt={tr(k.judul, lang)} className="w-full h-48 object-cover" />}
                  {k.tipe === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"><Play className="w-5 h-5 text-primary fill-primary ml-0.5" /></div>
                    </div>
                  )}
                </div>
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground mb-1">{new Date(k.tanggal).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <h3 className="font-semibold text-foreground mb-2">{tr(k.judul, lang)}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{tr(k.deskripsi, lang)}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
      <div className="text-center mt-8 scroll-animate delay-400">
        <Link to="/berita"><Button variant="outline" className="gap-2">{t('btn_lihat_semua')} <ArrowRight className="w-4 h-4" /></Button></Link>
      </div>
    </div>
  </section>

  {data.kalender && data.kalender.length > 0 && (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{t('section_kalender_akademik')}</h2>
          <LastModifiedInfo timestamp={data.lastModified?.kalender} className="justify-center" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {groupedKalender.map((group, idx) => {
            const style = monthStyles[idx % monthStyles.length] || fallbackStyle;
            return (
              <div key={group.key} className="rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-white flex flex-col" style={{ borderColor: style.bg }}>
                <div className={`${style.text} px-4 py-3 font-bold text-center text-base sm:text-lg tracking-wide`} style={{ backgroundColor: style.bg }}>
                  {group.monthLabel} {group.monthIndex !== -1 && group.year}
                </div>
                <div className="p-4 space-y-4 flex-1">
                  {group.items.map((item) => (
                    <div key={item.id} className="flex flex-col pb-3 last:pb-0 border-b last:border-b-0 border-slate-100">
                      <span className="text-xs font-semibold text-primary">{tr(item.tanggal, lang)}</span>
                      <span className="text-sm font-medium text-slate-700 mt-1 leading-relaxed">{tr(item.kegiatan, lang)}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )}

</div>
);
}
