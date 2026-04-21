import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function EkstrakurikulerDetail() {
  const { id } = useParams();
  const { data } = useSchool();
  const { t, lang } = useLanguage();
  const ekskul = data.ekstrakurikuler.find(e => e.id === id);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (!ekskul) return <div className="py-20 text-center text-muted-foreground">Not found.</div>;

  const nama = tr(ekskul.nama, lang);
  const showPrev = () => setLightboxIdx(i => i === null ? null : (i - 1 + ekskul.galeri.length) % ekskul.galeri.length);
  const showNext = () => setLightboxIdx(i => i === null ? null : (i + 1) % ekskul.galeri.length);

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/ekstrakurikuler">
          <Button variant="ghost" className="mb-6 gap-2"><ArrowLeft className="w-4 h-4" /> {t('btn_kembali')}</Button>
        </Link>
        <h1 className="text-3xl font-bold mb-4 text-foreground">{nama}</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed whitespace-pre-line">{tr(ekskul.deskripsi, lang)}</p>
        <h2 className="text-xl font-semibold mb-4 text-foreground">{t('galeri')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ekskul.galeri.map((foto, i) => (
            <button
              key={i}
              onClick={() => setLightboxIdx(i)}
              className="group relative overflow-hidden rounded-lg cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <img src={foto} alt={`${nama} ${i + 1}`} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={lightboxIdx !== null} onOpenChange={o => !o && setLightboxIdx(null)}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          {lightboxIdx !== null && (
            <div className="relative">
              <img src={ekskul.galeri[lightboxIdx]} alt={`${nama} ${lightboxIdx + 1}`} className="w-full max-h-[85vh] object-contain" />
              {ekskul.galeri.length > 1 && (
                <>
                  <button onClick={showPrev} className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="Previous">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={showNext} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="Next">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-medium">
                {lightboxIdx + 1} / {ekskul.galeri.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
