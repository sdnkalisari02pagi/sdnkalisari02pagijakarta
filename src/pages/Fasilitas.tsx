import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Building, ZoomIn } from 'lucide-react';
import ImageLightbox from '@/components/ImageLightbox';
import SEO from '@/components/SEO';

export default function Fasilitas() {
  const { data } = useSchool();
  const { t, lang } = useLanguage();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const listFasilitas = data.fasilitas || [];
  const imageUrls = listFasilitas.map(f => f.foto).filter(Boolean);

  return (
    <div className="py-10 min-h-[60vh] bg-background">
      <SEO 
        title={t('page_fasilitas')} 
        description="Jelajahi berbagai sarana dan prasarana penunjang kegiatan belajar mengajar di SDN Kalisari 02 Pagi Jakarta." 
        breadcrumbs={[
          { name: t('page_fasilitas'), item: '/fasilitas' }
        ]}
      />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-4">
            <Building className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3">
            {t('page_fasilitas')}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {lang === 'id' 
              ? 'SDN Kalisari 02 Pagi berkomitmen menyediakan fasilitas terbaik demi kenyamanan belajar dan tumbuh kembang peserta didik.'
              : 'SDN Kalisari 02 Pagi is committed to providing the best facilities for the learning comfort and development of students.'}
          </p>
        </div>

        {listFasilitas.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-muted-foreground/20">
            <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground font-medium">{t('no_fasilitas')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {listFasilitas.map((f, i) => {
              const nama = tr(f.nama, lang);
              // Find index in filtered image list for lightbox
              const imgIndex = imageUrls.indexOf(f.foto);

              return (
                <Card key={f.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border border-muted hover:border-primary/20 flex flex-col h-full bg-card">
                  <div className="relative overflow-hidden aspect-video cursor-zoom-in shrink-0 bg-muted">
                    <img 
                      src={f.foto} 
                      alt={nama} 
                      loading="lazy" 
                      onClick={() => imgIndex !== -1 && setLightboxIdx(imgIndex)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div 
                      onClick={() => imgIndex !== -1 && setLightboxIdx(imgIndex)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 flex-1 flex items-center justify-center text-center bg-card">
                    <h3 className="font-semibold text-foreground text-base sm:text-lg leading-snug line-clamp-2">
                      {nama}
                    </h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <ImageLightbox 
        images={imageUrls} 
        index={lightboxIdx} 
        onClose={() => setLightboxIdx(null)} 
        onIndexChange={setLightboxIdx} 
        alt={t('page_fasilitas')} 
      />
    </div>
  );
}
