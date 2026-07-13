import { GraduationCap, Mail, MapPin, Instagram, Youtube } from 'lucide-react';
import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';
import TikTokIcon from '@/components/TikTokIcon';

function getCleanEmbedUrl(urlOrIframe: string): string {
  if (!urlOrIframe) return '';
  if (urlOrIframe.startsWith('http')) {
    const match = urlOrIframe.match(/^(https?:\/\/[^\s"]+)/);
    return match ? match[1] : urlOrIframe;
  }
  const match = urlOrIframe.match(/src=["'](https?:\/\/[^"']+)["']/);
  return match ? match[1] : '';
}

export default function Footer() {
  const { data } = useSchool();
  const { t, lang } = useLanguage();
  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6">
      <div className="container mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
         <div className="flex items-center gap-2 mb-4">
            {data.logo ? (
              <img src={data.logo} alt="Logo" loading="lazy" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-secondary-foreground" />
              </div>
            )}
            <span className="font-bold text-xl">{data.footer.namaSekolah}</span>
          </div>
          <p className="text-base leading-relaxed opacity-95">{tr(data.footer.deskripsi, lang)}</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">{t('footer_kontak')}</h3>
          <div className="space-y-3 text-base opacity-95">
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-1.5 shrink-0" /><span>{tr(data.kontak.alamat, lang)}</span></div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /><span>{data.kontak.email}</span></div>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">{t('footer_sosmed')}</h3>
          <div className="flex gap-4">
            {data.footer.instagram && <a href={data.footer.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><Instagram className="w-6 h-6" /></a>}
            {data.footer.youtube && <a href={data.footer.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><Youtube className="w-6 h-6" /></a>}
            {data.footer.tiktok && <a href={data.footer.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><TikTokIcon className="w-6 h-6" /></a>}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">{lang === 'id' ? 'Lokasi Kami' : 'Our Location'}</h3>
          {data.kontak.mapsEmbed ? (
            <div className="rounded-lg overflow-hidden border border-primary-foreground/20 h-[150px] w-full bg-white/5">
              <iframe
                src={getCleanEmbedUrl(data.kontak.mapsEmbed)}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Peta Lokasi Sekolah"
              />
            </div>
          ) : (
            <p className="text-base opacity-95">{lang === 'id' ? 'Lokasi tidak tersedia.' : 'Location not available.'}</p>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-4 border-t border-primary-foreground/20 text-center text-sm opacity-70">
        {data.footer.copyright || `© ${new Date().getFullYear()} ${data.footer.namaSekolah}. All rights reserved.`}
      </div>
    </footer>
  );
}
