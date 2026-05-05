import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bilingual } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';

/* ================= TYPES ================= */

const B = (id: string, en = ''): Bilingual => ({ id, en });

export interface SchoolData {
  logo: any;
  hero: any;
  keunggulan: any[];
  pegawai: any[];
  jabatanList: any[];
  berita: any[];
  prestasi: any[];
  ekstrakurikuler: any[];
  dokumen: any[];
  profil: any;
  sambutan: any;
  kontak: any;
  lastModified: {
    logo: string | null;
    footer: string | null;
    hero: string | null;
    keunggulan: string | null;
    pegawai: string | null;
    berita: string | null;
    prestasi: string | null;
    ekstrakurikuler: string | null;
    dokumen: string | null;
    profil: string | null;
    sambutan: string | null;
    kontak: string | null;
    siswa: string | null;
  };
  footer: any;
  siswa: any[];
}

/* ================= DEFAULT ================= */

const defaultData: SchoolData = {
  logo: '',
  hero: {
    images: [],
    judul: B('', ''),
    subtitle: B('', ''),
    tahunBerdiri: '',
    statsVisibility: { staff: true, students: true, ekskul: true, founded: true }
  },
  keunggulan: [],
  pegawai: [],
  jabatanList: [],
  berita: [],
  prestasi: [],
  ekstrakurikuler: [],
  dokumen: [],
  profil: {
    sejarah: B('', ''),
    visi: B('', ''),
    misi: [],
    tujuan: B('', ''),
    fotoSekolah: ''
  },
  sambutan: { nama: '', foto: '', teks: B('', '') },
  kontak: {
    alamat: B('', ''),
    telepon: '',
    email: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    mapsEmbed: ''
  },
  footer: {
    namaSekolah: '',
    deskripsi: B('', ''),
    instagram: '',
    youtube: '',
    tiktok: '',
    copyright: ''
  },
  lastModified: {
    logo: null,
    footer: null,
    hero: null,
    keunggulan: null,
    pegawai: null,
    berita: null,
    prestasi: null,
    ekstrakurikuler: null,
    dokumen: null,
    profil: null,
    sambutan: null,
    kontak: null,
    siswa: null
  },
  siswa: []
};

/* ================= CONTEXT ================= */

const SchoolContext = createContext<any>(undefined);

/* ================= FETCH ================= */

async function fetchAll(): Promise<SchoolData> {
  try {
    const [
      logo,
      hero,
      keunggulan,
      pegawai,
      berita,
      footer,
      sambutan
    ] = await Promise.all([
      supabase.from('logo').select('*').limit(1).maybeSingle(),
      supabase.from('hero').select('*').limit(1).maybeSingle(),
      supabase.from('keunggulan').select('*'),
      supabase.from('pegawai').select('*'),
      supabase.from('berita').select('*'),
      supabase.from('footer').select('*').limit(1).maybeSingle(),
      supabase.from('sambutan').select('*').limit(1).maybeSingle()
    ]);

    return {
      logo: logo.data?.url || '',

      hero: hero.data ? {
        images: [],
        judul: B(hero.data.judul_id || '', hero.data.judul_en || ''),
        subtitle: B(hero.data.subtitle_id || '', hero.data.subtitle_en || ''),
        tahunBerdiri: hero.data.tahun || '',
        statsVisibility: {}
      } : defaultData.hero,

      keunggulan: keunggulan.data || [],
      pegawai: pegawai.data || [],
      jabatanList: [],
      berita: berita.data || [],

      footer: footer.data ? {
        namaSekolah: footer.data.nama || '',
        deskripsi: B('', ''),
        instagram: footer.data.instagram || '',
        youtube: footer.data.youtube || '',
        tiktok: footer.data.tiktok || '',
        copyright: footer.data.copyright || ''
      } : defaultData.footer,

      sambutan: sambutan.data ? {
        nama: sambutan.data.nama || '',
        foto: sambutan.data.foto || '',
        teks: B(sambutan.data.teks_id || '', sambutan.data.teks_en || '')
      } : defaultData.sambutan,

      lastModified: {
        logo: logo.data?.updated_at || null,
        footer: footer.data?.updated_at || null,
        hero: hero.data?.updated_at || null,
        keunggulan: keunggulan.data?.[0]?.updated_at || null,
        pegawai: pegawai.data?.[0]?.updated_at || null,
        berita: berita.data?.[0]?.updated_at || null,
        prestasi: null,
        ekstrakurikuler: null,
        dokumen: null,
        profil: null,
        sambutan: sambutan.data?.updated_at || null,
        kontak: null,
        siswa: null
      },

      prestasi: [],
      ekstrakurikuler: [],
      dokumen: [],
      profil: defaultData.profil,
      kontak: defaultData.kontak,
      siswa: []
    };

  } catch (err) {
    console.error('FETCH ERROR:', err);
    return defaultData;
  }
}

/* ================= PROVIDER ================= */

export function SchoolProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SchoolData>(defaultData);

  useEffect(() => {
    fetchAll().then(setData);
  }, []);

  const updateFooter = async (form: any) => {
    const { error } = await supabase.from('footer').upsert({ id: 1 });
    if (error) return;

    setData(d => ({
      ...d,
      footer: form,
      lastModified: {
        ...d.lastModified,
        footer: d.lastModified.footer
      }
    }));
  };

  const updateLogo = (url: string, updatedAt?: string) => {
    setData(d => ({
      ...d,
      logo: url,
      lastModified: {
        ...d.lastModified,
        logo: updatedAt ?? d.lastModified.logo
      }
    }));
  };

  /* ================= SAMBUTAN CRUD ================= */

  const updateSambutan = async (form: any) => {
    const payload = {
      id: 1,
      nama: form.nama,
      foto: form.foto,
      teks_id: form.teks?.id || '',
      teks_en: form.teks?.en || ''
    };

    const { data: result, error } = await supabase
      .from('sambutan')
      .upsert(payload)
      .select()
      .single();

    if (error) {
      console.error('SAMBUTAN ERROR:', error);
      return;
    }

    setData(d => ({
      ...d,
      sambutan: form,
      lastModified: {
        ...d.lastModified,
        sambutan: result.updated_at
      }
    }));
  };

  return (
    <SchoolContext.Provider value={{
      data,
      updateFooter,
      updateLogo,
      updateSambutan
    }}>
      {children}
    </SchoolContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useSchool() {
  const ctx = useContext(SchoolContext);
  if (!ctx) throw new Error('useSchool must be used within SchoolProvider');
  return ctx;
}
