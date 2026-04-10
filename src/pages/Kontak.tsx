import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Instagram, Youtube } from 'lucide-react';

export default function Kontak() {
  const { data } = useSchool();

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-10 text-foreground">Kontak Kami</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card><CardContent className="pt-6 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div><h3 className="font-semibold text-foreground">Alamat</h3><p className="text-sm text-muted-foreground">{data.kontak.alamat}</p></div>
            </CardContent></Card>
            <Card><CardContent className="pt-6 flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <div><h3 className="font-semibold text-foreground">Telepon</h3><p className="text-sm text-muted-foreground">{data.kontak.telepon}</p></div>
            </CardContent></Card>
            <Card><CardContent className="pt-6 flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <div><h3 className="font-semibold text-foreground">Email</h3><p className="text-sm text-muted-foreground">{data.kontak.email}</p></div>
            </CardContent></Card>
            <Card><CardContent className="pt-6 flex items-center gap-4">
              <a href={data.sosialMedia.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline"><Instagram className="w-5 h-5" /> Instagram</a>
              <a href={data.sosialMedia.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline"><Youtube className="w-5 h-5" /> YouTube</a>
            </CardContent></Card>
          </div>
          <div className="rounded-lg overflow-hidden border h-[300px] md:h-full min-h-[300px]">
            <iframe src={data.kontak.mapsEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Lokasi Sekolah" />
          </div>
        </div>
      </div>
    </div>
  );
}
