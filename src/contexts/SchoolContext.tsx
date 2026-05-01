import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bilingual, toBilingual } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';

/* ================= TYPES (TIDAK DIUBAH) ================= */

export interface Pelatih {
  nama: Bilingual;
  foto: any;
}

export interface Pegawai {
  id: string;
  nama: string;
  jabatan: string;
  foto: any;
}

export type ContentTipe = 'foto' | 'video';

export interface Berita {
  id: string;
  judul: Bilingual;
  tanggal: string;
  tipe: ContentTipe;
  fotoUtama: any;
  thumbnail: any;
  videoUrl: string;
  galeri: any[];
  deskripsi: Bilingual;
}

export type Prestasi = Berita;

export interface Ekstrakurikuler {
  id: string;
  nama: Bilingual;
  foto: any;
  fotoUtama: any;
  deskripsi: Bilingual;
  galeri: any[];
  pelatih: Pelatih[];
}

export interface Dokumen {
  id: string;
  nama: Bilingual;
  tanggal: string;
  url: string;
}

export interface Keunggulan {
  id: string;
  icon: string;
  title: Bilingual;
  desc: Bilingual;
}

export interface ProfilSekolah {
  sejarah: Bilingual;
  visi: Bilingual;
  misi: Bilingual[];
  tujuan: Bilingual;
  fotoSekolah: any;
}

export interface Sambutan {
  nama: string;
  foto: any;
  teks: Bilingual;
}

export interface KontakInfo {
  alamat: Bilingual;
  telepon: string;
  email: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  mapsEmbed: string;
}

export interface HeroData {
  images: any[];
  judul: Bilingual;
  subtitle: Bilingual;
  tahunBerdiri: string;
  statsVisibility: {
    staff: boolean;
    students: boolean;
    ekskul: boolean;
    founded: boolean;
  };
}

export interface FooterData {
  namaSekolah: string;
  deskripsi: Bilingual;
  instagram: string;
  youtube: string;
  tiktok: string;
  copyright: string;
}

export interface SchoolData {
  logo: any;
  hero: HeroData;
  keunggulan: Keunggulan[];
  pegawai: Pegawai[];
  jabatanList: Bilingual[];
  berita: Berita[];
  prestasi: Prestasi[];
  ekstrakurikuler: Ekstrakurikuler[];
  dokumen: Dokumen[];
  profil: ProfilSekolah;
  sambutan: Sambutan;
  kontak: KontakInfo;
  footer: FooterData;
  siswa: any[];
}

/* ================= DEFAULT ================= */

const B = (id: string, en = ''): Bilingual => ({ id, en });

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
  siswa: []
};

/* ================= CONTEXT ================= */

const SchoolContext = createContext<any>(undefined);

/* ================= FETCH (ANTI CRASH TOTAL) ================= */

async function fetchAll(): Promise<SchoolData> {
  try {
    const [
      logo,
      hero, heroImages, keunggulan, pegawai, jabatan,
      berita, beritaGaleri
    ] = await Promise.all([
      supabase.from('logo').select('*').limit(1).maybeSingle(),
      supabase.from('hero').select('*').limit(1).maybeSingle(),
      supabase.from('hero_images').select('*'),
      supabase.from('keunggulan').select('*'),
      supabase.from('pegawai').select('*'),
      supabase.from('jabatan_list').select('*'),
      supabase.from('berita').select('*'),
      supabase.from('berita_galeri').select('*')
    ]);

    return {
      ...defaultData,

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
        galeri: beritaGaleri.data?.filter(g => g.berita_id === b.id).map(g => g.url) || [],
        deskripsi: B(b.deskripsi_id || '', b.deskripsi_en || '')
      })) || [],

      // ⚠️ Footer fallback biar ga undefined
      footer: defaultData.footer
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
    fetchAll()
      .then(res => {
        if (!res) return;
        setData(res);
      })
      .catch(err => console.error(err));
  }, []);

  /* ================= HELPER ================= */

  const resetTable = async (table: string) => {
    await supabase.from(table).delete().neq('id', '');
  };

  const uploadIfFile = async (fileOrUrl: any, bucket: string) => {
    if (!fileOrUrl) return '';
    if (typeof fileOrUrl === 'string') return fileOrUrl;

    const file = fileOrUrl as File;
    const name = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage.from(bucket).upload(name, file);
    if (error) return '';

    const { data } = supabase.storage.from(bucket).getPublicUrl(name);
    return data.publicUrl;
  };

  /* ================= UPDATE ================= */

  const updateLogo = async (file: any) => {
    const url = await uploadIfFile(file, 'logo');
    await supabase.from('logo').upsert({ id: 1, url });
    setData(d => ({ ...d, logo: url }));
  };

  const updatePegawai = async (items: Pegawai[]) => {
    await resetTable('pegawai');

    const processed = await Promise.all(items.map(async p => ({
      ...p,
      foto: await uploadIfFile(p.foto, 'pegawai')
    })));

    await supabase.from('pegawai').insert(processed);
    setData(d => ({ ...d, pegawai: processed }));
  };

  const updateBerita = async (items: Berita[]) => {
    await resetTable('berita');
    await resetTable('berita_galeri');

    const processed = await Promise.all(items.map(async b => ({
      ...b,
      fotoUtama: await uploadIfFile(b.fotoUtama, 'berita'),
      galeri: await Promise.all(b.galeri.map(g => uploadIfFile(g, 'berita')))
    })));

    await supabase.from('berita').insert(
      processed.map(b => ({
        id: b.id,
        judul_id: b.judul.id,
        judul_en: b.judul.en,
        tanggal: b.tanggal,
        tipe: b.tipe,
        foto: b.fotoUtama,
        thumbnail: b.thumbnail,
        video: b.videoUrl,
        deskripsi_id: b.deskripsi.id,
        deskripsi_en: b.deskripsi.en
      }))
    );

    await supabase.from('berita_galeri').insert(
      processed.flatMap(b =>
        b.galeri.map(url => ({
          berita_id: b.id,
          url
        }))
      )
    );

    setData(d => ({ ...d, berita: processed }));
  };

  return (
    <SchoolContext.Provider value={{
      data,
      updateLogo,
      updatePegawai,
      updateBerita,
      updatePrestasi: updateBerita,
      updateHero: async () => {},
      updateKeunggulan: async () => {},
      updateEkstrakurikuler: async () => {},
      updateDokumen: async () => {},
      updateProfil: async () => {},
      updateSambutan: async () => {},
      updateKontak: async () => {},
      updateFooter: async () => {},
      updateJabatanList: async () => {},
      updateSiswa: async () => {}
    }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const ctx = useContext(SchoolContext);
  if (!ctx) throw new Error('useSchool must be used within SchoolProvider');
  return ctx;
}
