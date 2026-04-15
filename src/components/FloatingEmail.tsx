import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSchool } from '@/contexts/SchoolContext';

export default function FloatingEmail() {
  const [open, setOpen] = useState(false);
  const [nama, setNama] = useState('');
  const [emailPengirim, setEmailPengirim] = useState('');
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const { data } = useSchool();

  const handleSend = () => {
    const body = `Dari: ${nama}\nEmail: ${emailPengirim}\n\n${deskripsi}`;
    const mailtoLink = `mailto:${data.floatingEmail}?subject=${encodeURIComponent(judul)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setOpen(false);
    setNama('');
    setEmailPengirim('');
    setJudul('');
    setDeskripsi('');
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        title="Kirim Email"
      >
        <Mail className="w-6 h-6" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-yellow-400 border-yellow-500 text-yellow-950 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-yellow-950">Kirim Pesan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-yellow-900">Nama</Label>
              <Input value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama lengkap" className="bg-yellow-50 border-yellow-600 text-yellow-950 placeholder:text-yellow-700/50" />
            </div>
            <div>
              <Label className="text-yellow-900">Email Pengirim</Label>
              <Input type="email" value={emailPengirim} onChange={e => setEmailPengirim(e.target.value)} placeholder="email@contoh.com" className="bg-yellow-50 border-yellow-600 text-yellow-950 placeholder:text-yellow-700/50" />
            </div>
            <div>
              <Label className="text-yellow-900">Judul</Label>
              <Input value={judul} onChange={e => setJudul(e.target.value)} placeholder="Subjek pesan" className="bg-yellow-50 border-yellow-600 text-yellow-950 placeholder:text-yellow-700/50" />
            </div>
            <div>
              <Label className="text-yellow-900">Deskripsi</Label>
              <Textarea value={deskripsi} onChange={e => setDeskripsi(e.target.value)} placeholder="Tulis pesan Anda..." rows={4} className="bg-yellow-50 border-yellow-600 text-yellow-950 placeholder:text-yellow-700/50" />
            </div>
            <Button onClick={handleSend} className="w-full bg-yellow-800 hover:bg-yellow-900 text-yellow-50">
              Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
