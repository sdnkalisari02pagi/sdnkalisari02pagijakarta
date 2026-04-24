import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft } from 'lucide-react';
import ImageLightbox from '@/components/ImageLightbox';
import { LinkedText } from '@/lib/linkify';

export default function EkstrakurikulerDetail() {
  const { id } = useParams();
  const { data } = useSchool();
  const { t, lang } = useLanguage();
  const ekskul = data.ekstrakurikuler.find(e => e.id === id);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [pelatihIdx, setPelatihIdx] = useState<number | null>(null);

  if (!ekskul) return <div className="py-20 text-center text-muted-foreground">Not found.</div>;

  const nama = tr(ekskul.nama, lang);
  const heroImg = ekskul.fotoUtama || ekskul.foto;
  const pelatih = ekskul.pelatih || [];
  const selectedPelatih = pelatihIdx !== null ? pelatih[pelatihIdx] : null;

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/ekstrakurikuler">
          <Button variant="ghost" className="mb-6 gap-2"><ArrowLeft className="w-4 h-4" /> {t('btn_kembali')}</Button>
        </Link>
        <h1 className="text-3xl font-bold mb-4 text-foreground">{nama}</h1>
        {heroImg && <img src={heroImg} alt={nama} className="w-full max-h-[480px] object-cover rounded-xl mb-6 shadow-md" />}
        <div className="text-muted-foreground mb-8 leading-relaxed">
          <LinkedText text={tr(ekskul.deskripsi, lang)} />
        </div>

        {pelatih.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-foreground">{t('pelatih')}</h2>
            <div className="flex flex-row flex-wrap gap-6">
              {pelatih.map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  <button onClick={() => setPelatihIdx(i)} className="rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
                    {p.foto ? (
                      <img src={p.foto} alt={tr(p.nama, lang)} className="w-20 h-20 object-cover" />
                    ) : (
                      <div className="w-20 h-20 bg-muted flex items-center justify-center text-muted-foreground text-xs">No Photo</div>
                    )}
                  </button>
                  <span className="text-sm font-medium text-foreground max-w-[100px]">{tr(p.nama, lang)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {ekskul.galeri.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-foreground">{t('galeri')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {ekskul.galeri.map((foto, i) => (
                <button key={i} onClick={() => setLightboxIdx(i)} className="group relative overflow-hidden rounded-lg cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary">
                  <img src={foto} alt={`${nama} ${i + 1}`} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <ImageLightbox images={ekskul.galeri} index={lightboxIdx} onClose={() => setLightboxIdx(null)} onIndexChange={setLightboxIdx} alt={nama} />

      <Dialog open={pelatihIdx !== null} onOpenChange={o => !o && setPelatihIdx(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle className="text-center">{selectedPelatih ? tr(selectedPelatih.nama, lang) : ''}</DialogTitle></DialogHeader>
          {selectedPelatih?.foto && (
            <div className="flex justify-center">
              <img src={selectedPelatih.foto} alt={tr(selectedPelatih.nama, lang)} className="w-64 h-64 object-cover rounded-lg" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
