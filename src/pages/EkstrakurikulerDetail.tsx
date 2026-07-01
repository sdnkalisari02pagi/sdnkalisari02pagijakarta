import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ImageLightbox from '@/components/ImageLightbox';
import { LinkedText } from '@/lib/linkify';
import SEO from '@/components/SEO';

export default function EkstrakurikulerDetail() {
  const { id } = useParams();
  const { data } = useSchool();
  const { t, lang } = useLanguage();
  const ekskul = data.ekstrakurikuler.find(e => e.id === id);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (!ekskul) return <div className="py-20 text-center text-muted-foreground">Not found.</div>;

  const nama = tr(ekskul.nama, lang);
  const heroImg = ekskul.fotoUtama || ekskul.foto;
  const deskripsiText = tr(ekskul.deskripsi, lang).replace(/<[^>]*>/g, '').substring(0, 160);

  return (
    <div className="py-10">
      <SEO 
        title={nama} 
        description={deskripsiText}
        canonicalPath={`/ekstrakurikuler/${id}`}
        ogImage={heroImg || undefined}
        breadcrumbs={[
          { name: t('page_ekstrakurikuler'), item: '/ekstrakurikuler' },
          { name: nama, item: `/ekstrakurikuler/${id}` }
        ]}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/ekstrakurikuler">
          <Button variant="ghost" className="mb-6 gap-2"><ArrowLeft className="w-4 h-4" /> {t('btn_kembali')}</Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground break-words">{nama}</h1>
        {heroImg && <img src={heroImg} alt={nama} loading="lazy" className="w-full max-h-[480px] object-cover rounded-xl mb-6 shadow-md" />}
        <div className="text-muted-foreground mb-8 leading-relaxed">
          <LinkedText text={tr(ekskul.deskripsi, lang)} />
        </div>

        {ekskul.galeri.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-foreground">{t('galeri')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {ekskul.galeri.map((foto, i) => (
                <button key={i} onClick={() => setLightboxIdx(i)} className="group relative overflow-hidden rounded-lg cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary">
                  <img src={foto} alt={`${nama} ${i + 1}`} loading="lazy" className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <ImageLightbox images={ekskul.galeri} index={lightboxIdx} onClose={() => setLightboxIdx(null)} onIndexChange={setLightboxIdx} alt={nama} />
    </div>
  );
}
