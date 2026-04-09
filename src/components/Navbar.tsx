import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { label: 'Profil', path: '/profil' },
  { label: 'Kegiatan', path: '/kegiatan' },
  { label: 'Ekstrakurikuler', path: '/ekstrakurikuler' },
  { label: 'Layanan', path: '/layanan' },
  { label: 'Kontak', path: '/kontak' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-sm md:text-base text-foreground hidden sm:block">SDN Kalisari 02 Pagi</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${location.pathname.startsWith(item.path) ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/login">
            <Button size="sm" className="ml-2">Login</Button>
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background pb-4">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${location.pathname.startsWith(item.path) ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full">Login</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
