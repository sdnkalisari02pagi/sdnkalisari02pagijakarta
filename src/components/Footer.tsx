import { GraduationCap, Mail, MapPin, Instagram, Youtube } from 'lucide-react';
import { useSchool } from '@/contexts/SchoolContext';

export default function Footer() {
  const { data } = useSchool();
  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-secondary-foreground" />
            </div>
            <span className="font-bold text-lg">SDN Kalisari 02 Pagi</span>
          </div>
          <p className="text-sm opacity-80">Mewujudkan generasi cerdas, berkarakter, dan berprestasi.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Kontak</h3>
          <div className="space-y-2 text-sm opacity-80">
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span>{data.kontak.alamat}</span></div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /><span>{data.kontak.email}</span></div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Sosial Media</h3>
          <div className="flex gap-4">
            <a href={data.sosialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href={data.sosialMedia.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><Youtube className="w-6 h-6" /></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-4 border-t border-primary-foreground/20 text-center text-sm opacity-60">
        © {new Date().getFullYear()} SDN Kalisari 02 Pagi. All rights reserved.
      </div>
    </footer>
  );
}
