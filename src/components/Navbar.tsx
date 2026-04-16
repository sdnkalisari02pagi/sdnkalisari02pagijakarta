import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';
import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profilOpen, setProfilOpen] = useState(false);
  const location = useLocation();
  const { data } = useSchool();
  const { lang, setLang, t } = useLanguage();
  const isProfilActive = location.pathname.startsWith('/profil');

  const menuItems = [
    { label: t('nav_kegiatan'), path: '/kegiatan' },
    { label: t('nav_ekstrakurikuler'), path: '/ekstrakurikuler' },
    { label: t('nav_layanan'), path: '/layanan' },
    { label: t('nav_kontak'), path: '/kontak' },
  ];

  const profilSubMenu = [
    { label: t('nav_sejarah'), path: '/profil?tab=sejarah' },
    { label: t('nav_visimisi'), path: '/profil?tab=visimisi' },
    { label: t('nav_pegawai'), path: '/profil?tab=pegawai' },
  ];

  const LangToggle = () => (
    <div className="flex items-center gap-0.5 bg-muted rounded-full p-0.5 text-xs font-medium">
      <button
        onClick={() => setLang('id')}
        className={`px-2.5 py-1 rounded-full transition-colors ${lang === 'id' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
      >
        ID
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-2.5 py-1 rounded-full transition-colors ${lang === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
      >
        EN
      </button>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          {data.logo ? (
            <img src={data.logo} alt="Logo" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
          )}
          <span className="font-bold text-sm md:text-base text-foreground hidden sm:block">SDN Kalisari 02 Pagi</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <div className="relative group">
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-1 ${isProfilActive ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
            >
              {t('nav_profil')}
              <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 pt-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
              <div className="bg-popover border rounded-md shadow-lg py-1 min-w-[160px]">
                {profilSubMenu.map(item => (
                  <Link key={item.path} to={item.path} className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {menuItems.map(item => (
            <Link key={item.path} to={item.path} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${location.pathname.startsWith(item.path) ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}>
              {item.label}
            </Link>
          ))}
          <LangToggle />
          <Link to="/login">
            <Button size="sm" className="ml-2">{t('nav_login')}</Button>
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background pb-4">
          <button
            onClick={() => setProfilOpen(!profilOpen)}
            className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${isProfilActive ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            {t('nav_profil')}
            <ChevronDown className={`w-4 h-4 transition-transform ${profilOpen ? 'rotate-180' : ''}`} />
          </button>
          {profilOpen && (
            <div className="bg-muted/50">
              {profilSubMenu.map(item => (
                <Link key={item.path} to={item.path} onClick={() => { setOpen(false); setProfilOpen(false); }} className="block px-10 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {menuItems.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setOpen(false)} className={`block px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${location.pathname.startsWith(item.path) ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}>
              {item.label}
            </Link>
          ))}
          <div className="px-6 pt-3 flex items-center gap-3">
            <LangToggle />
            <Link to="/login" onClick={() => setOpen(false)} className="flex-1">
              <Button size="sm" className="w-full">{t('nav_login')}</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
