import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Berita } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { LinkedText } from '@/lib/linkify';
import { getVideoEmbed } from '@/lib/videoEmbed';
import ImageLightbox from '@/components/ImageLightbox';

interface Props {
  items: Berita[];
  backPath: string;
}

export default function ContentDetailPage({ items, backPath }: Props) {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const item = items.find(k => k.id === id);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (!item) return (
    <div className="py-20 text-center">
      <p className="text-muted-foreground mb-4">Tidak ditemukan.</p>
      <Link to={backPath}><Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> {t('btn_kembali')}</Button></Link>
    </div>
  );

  const judul = tr(item.judul, lang);
  const locale = lang === 'en' ? 'en-US' : 'id-ID';
  const embed = item.tipe === 'video' ? getVideoEmbed(item.videoUrl) : null;

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to={backPath}>
          <Button variant="ghost" className="mb-6 gap-2"><ArrowLeft className="w-4 h-4" /> {t('btn_kembali')}</Button>
        </Link>

        <p className="text-sm text-muted-foreground mb-2">{new Date(item.tanggal).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <h1 className="text-3xl font-bold mb-6 text-foreground">{judul}</h1>

        {item.tipe === 'foto' ? (
          item.fotoUtama && (
            <img src={item.fotoUtama} alt={judul} className="w-full max-h-[480px] object-cover rounded-xl mb-6 shadow-md" />
          )
        ) : (
          <div className="aspect-video w-full mb-6 rounded-xl overflow-hidden bg-black shadow-md">
            {embed && embed.embedUrl ? (
              <iframe
                src={embed.embedUrl}
                title={judul}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">Video tidak tersedia</div>
            )}
          </div>
        )}

        <div className="prose prose-sm max-w-none mb-10 text-muted-foreground leading-relaxed">
          <LinkedText text={tr(item.deskripsi, lang)} />
        </div>

        {item.galeri && item.galeri.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-foreground">{t('galeri')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {item.galeri.map((foto, i) => (
                <button key={i} onClick={() => setLightboxIdx(i)} className="group relative overflow-hidden rounded-lg cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary">
                  <img src={foto} alt={`${judul} ${i + 1}`} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <ImageLightbox images={item.galeri} index={lightboxIdx} onClose={() => setLightboxIdx(null)} onIndexChange={setLightboxIdx} alt={judul} />
    </div>
  );
}
