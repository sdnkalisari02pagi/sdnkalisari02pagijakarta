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
    footer: string | null;
    logo: string | null;
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
    footer: null,
    logo: null
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
      hero, heroImages, keunggulan, pegawai, jabatan,
      berita, beritaGaleri,
      footer
    ] = await Promise.all([
      supabase.from('logo').select('*').limit(1).maybeSingle(),
      supabase.from('hero').select('*').limit(1).maybeSingle(),
      supabase.from('hero_images').select('*'),
      supabase.from('keunggulan').select('*'),
      supabase.from('pegawai').select('*'),
      supabase.from('jabatan_list').select('*'),
      supabase.from('berita').select('*'),
      supabase.from('berita_galeri').select('*'),
      supabase.from('footer').select('*').limit(1).maybeSingle()
    ]);

    return {

      logo: logo.data?.url || '',

      hero: hero.data ? {
        images: heroImages.data?.map(i => i.url) || [],
        judul: B(hero.data.judul_id || '', hero.data.judul_en || ''),
        subtitle: B(hero.data.subtitle_id || '', hero.data.subtitle_en || ''),
        tahunBerdiri: hero.data.tahun || '',
        statsVisibility: {
          staff: hero.data.staff ?? true,
          students: hero.data.students ?? true,
          ekskul: hero.data.ekskul ?? true,
          founded: hero.data.founded ?? true
        }
      } : defaultData.hero,

      keunggulan: keunggulan.data || [],
      pegawai: pegawai.data || [],
      jabatanList: jabatan.data?.map(j => B(j.nama_id || '', j.nama_en || '')) || [],

      berita: berita.data?.map(b => ({
        id: b.id,
        judul: B(b.judul_id || '', b.judul_en || ''),
        tanggal: b.tanggal,
        tipe: b.tipe,
        fotoUtama: b.foto,
        thumbnail: b.thumbnail,
        videoUrl: b.video,
        galeri: beritaGaleri.data
          ?.filter(g => String(g.berita_id) === String(b.id))
          .sort((a, b) => a.id - b.id)
          .map(g => g.url) || [],
        deskripsi: B(b.deskripsi_id || '', b.deskripsi_en || '')
      })) || [],

      footer: footer.data ? {
        namaSekolah: footer.data.nama || '',
        deskripsi: B(footer.data.deskripsi_id || '', footer.data.deskripsi_en || ''),
        instagram: footer.data.instagram || '',
        youtube: footer.data.youtube || '',
        tiktok: footer.data.tiktok || '',
        copyright: footer.data.copyright || ''
      } : defaultData.footer,

      lastModified: {
        footer: footer.data?.updated_at || null,
        logo: logo.data?.updated_at || null
      },

      prestasi: [],
      ekstrakurikuler: [],
      dokumen: [],
      profil: defaultData.profil,
      sambutan: defaultData.sambutan,
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

  /* ================= BERITA ================= */

  const updateBerita = async (items: any[]) => {
    try {
      for (const item of items) {
        const id = item.id || crypto.randomUUID();

        await supabase.from('berita').upsert({
          id,
          judul_id: item.judul?.id || '',
          judul_en: item.judul?.en || '',
          tanggal: item.tanggal || '',
          tipe: item.tipe || '',
          foto: item.fotoUtama,
          thumbnail: item.thumbnail,
          video: item.videoUrl || '',
          deskripsi_id: item.deskripsi?.id || '',
          deskripsi_en: item.deskripsi?.en || ''
        });
      }

      setData(d => ({ ...d, berita: items }));

    } catch (err) {
      console.error('UPDATE BERITA ERROR:', err);
    }
  };

  /* ================= FOOTER ================= */

  const updateFooter = async (form: any) => {
    try {
      const { error } = await supabase
        .from('footer')
        .upsert({
          id: 1,
          nama: form.namaSekolah,
          deskripsi_id: form.deskripsi?.id || '',
          deskripsi_en: form.deskripsi?.en || '',
          instagram: form.instagram,
          youtube: form.youtube,
          tiktok: form.tiktok,
          copyright: form.copyright,
        });

      if (error) throw error;

      setData(d => ({
        ...d,
        footer: form,
        lastModified: {
          ...d.lastModified,
          footer: new Date().toISOString()
        }
      }));

    } catch (err) {
      console.error('UPDATE FOOTER ERROR:', err);
    }
  };

  /* ================= LOGO ================= */

  const updateLogo = (url: string, updatedAt?: string) => {
    setData(d => ({
      ...d,
      logo: url,
      lastModified: {
        ...d.lastModified,
        logo: updatedAt ?? d.lastModified.logo ?? null
      }
    }));
  };

  return (
    <SchoolContext.Provider value={{ data, updateBerita, updateFooter, updateLogo }}>
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
