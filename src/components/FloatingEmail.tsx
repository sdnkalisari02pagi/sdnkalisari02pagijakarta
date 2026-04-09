import { Mail } from 'lucide-react';

export default function FloatingEmail() {
  return (
    <a
      href="mailto:kalisari02pagi@gmail.com"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      title="Kirim Email"
    >
      <Mail className="w-6 h-6" />
    </a>
  );
}
