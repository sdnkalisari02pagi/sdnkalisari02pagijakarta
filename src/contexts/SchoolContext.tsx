import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bilingual, toBilingual } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';

/* ================= TYPES (SAMA PERSIS) ================= */

export interface Pelatih {
  nama: Bilingual;
  foto: string;
}

export interface Pegawai {
  id: string;
  nama: string;
  jabatan: string;
  foto: string;
  lastModified?: string;
}

export type ContentTipe = 'foto' | 'video';

export interface Berita {
  id: string;
  judul: Bilingual;
  tanggal: string;
  tipe: ContentTipe;
  fotoUtama: string;
  thumbnail: string;
  videoUrl: string;
  galeri: string[];
  deskripsi: Bilingual;
  lastModified?: string;
}

export type Prestasi = Berita;

export interface Ekstrakurikuler {
  id: string;
  nama: Bilingual;
  foto: string;
  fotoUtama: string;
  deskripsi: Bilingual;
  galeri: string[];
  pelatih: Pelatih[];
  lastModified?: string;
}

export interface Dokumen {
  id: string;
  nama: Bilingual;
  tanggal: string;
  url: string;
  lastModified?: string;
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
  fotoSekolah: string;
}

export interface Sambutan {
  nama: string;
  foto: string;
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

export interface HeroStatsVisibility {
  staff: boolean;
  students: boolean;
  ekskul: boolean;
  founded: boolean;
}

export interface HeroData {
  images: string[];
  judul: Bilingual;
  subtitle: Bilingual;
  tahunBerdiri: string;
  statsVisibility: HeroStatsVisibility;
}

export interface SosialMedia {
  instagram: string;
  youtube: string;
  tiktok: string;
  email: string;
}

export interface FooterData {
  namaSekolah: string;
  deskripsi: Bilingual;
  instagram: string;
  youtube: string;
  tiktok: string;
  copyright: string;
}

export interface KelasSiswa {
  id: string;
  kelas: string;
  jumlah: number;
}

export interface LastModified {
  logo?: string;
  pegawai?: string;
  kegiatan?: string;
  berita?: string;
  prestasi?: string;
  ekstrakurikuler?: string;
  dokumen?: string;
  profil?: string;
  sambutan?: string;
  kontak?: string;
  hero?: string;
  sosialMedia?: string;
  keunggulan?: string;
  footer?: string;
  siswa?: string;
}

export interface SchoolData {
  logo: string;
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
  sosialMedia: SosialMedia;
  footer: FooterData;
  siswa: KelasSiswa[];
  lastModified: LastModified;
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
    statsVisibility: { staff: true, students: true, ekskul: true, founded: true },
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
    fotoSekolah: '',
  },
  sambutan: {
    nama: '',
    foto: '',
    teks: B('', ''),
  },
  kontak: {
    alamat: B('', ''),
    telepon: '',
    email: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    mapsEmbed: '',
  },
  sosialMedia: {
    instagram: '',
    youtube: '',
    tiktok: '',
    email: '',
  },
  footer: {
    namaSekolah: '',
    deskripsi: B('', ''),
    instagram: '',
    youtube: '',
    tiktok: '',
    copyright: '',
  },
  siswa: [],
  lastModified: {},
};

/* ================= CONTEXT ================= */

const SchoolContext = createContext<any>(undefined);

/* ================= FETCH ================= */

async function fetchAll(): Promise<SchoolData> {
  try {
    const [
      hero, heroImages, keunggulan, pegawai, jabatan,
      berita, beritaGaleri, prestasi, prestasiGaleri,
      ekskul, ekskulGaleri, pelatih,
      dokumen, profil, profilMisi,
      sambutan, kontak, sosial, footer, siswa
    ] = await Promise.all([
      supabase.from('hero').select('*').limit(1).maybeSingle(),
      supabase.from('hero_images').select('*'),
      supabase.from('keunggulan').select('*'),
      supabase.from('pegawai').select('*'),
      supabase.from('jabatan_list').select('*'),
      supabase.from('berita').select('*'),
      supabase.from('berita_galeri').select('*'),
      supabase.from('prestasi').select('*'),
      supabase.from('prestasi_galeri').select('*'),
      supabase.from('ekstrakurikuler').select('*'),
      supabase.from('ekstrakurikuler_galeri').select('*'),
      supabase.from('pelatih').select('*'),
      supabase.from('dokumen').select('*'),
      supabase.from('profil').select('*').limit(1).maybeSingle(),
      supabase.from('profil_misi').select('*'),
      supabase.from('sambutan').select('*').limit(1).maybeSingle(),
      supabase.from('kontak').select('*').limit(1).maybeSingle(),
      supabase.from('sosial_media').select('*').limit(1).maybeSingle(),
      supabase.from('footer').select('*').limit(1).maybeSingle(),
      supabase.from('siswa').select('*')
    ]);

    const d = (v: any, def: any) => v ?? def;

    return {
      ...defaultData,

      hero: {
        images: (heroImages.data || []).map(i => i.url),
        judul: B(d(hero.data?.judul_id, ''), d(hero.data?.judul_en, '')),
        subtitle: B(d(hero.data?.subtitle_id, ''), d(hero.data?.subtitle_en, '')),
        tahunBerdiri: d(hero.data?.tahun, ''),
        statsVisibility: {
          staff: hero.data?.staff ?? true,
          students: hero.data?.students ?? true,
          ekskul: hero.data?.ekskul ?? true,
          founded: hero.data?.founded ?? true
        }
      },

      keunggulan: (keunggulan.data || []).map(k => ({
        id: k.id,
        icon: k.icon,
        title: B(k.title_id, k.title_en),
        desc: B(k.desc_id, k.desc_en)
      })),

      pegawai: pegawai.data || [],

      jabatanList: (jabatan.data || []).map(j => B(j.nama_id, j.nama_en)),

      berita: (berita.data || []).map(b => ({
        id: b.id,
        judul: B(b.judul_id, b.judul_en),
        tanggal: b.tanggal,
        tipe: b.tipe,
        fotoUtama: b.foto,
        thumbnail: b.thumbnail || '',
        videoUrl: b.video || '',
        galeri: (beritaGaleri.data || []).filter(g => g.berita_id === b.id).map(g => g.url),
        deskripsi: B(b.deskripsi_id, b.deskripsi_en)
      })),

      prestasi: (prestasi.data || []).map(p => ({
        id: p.id,
        judul: B(p.judul_id, p.judul_en),
        tanggal: p.tanggal,
        tipe: p.tipe,
        fotoUtama: p.foto,
        thumbnail: p.thumbnail || '',
        videoUrl: p.video || '',
        galeri: (prestasiGaleri.data || []).filter(g => g.prestasi_id === p.id).map(g => g.url),
        deskripsi: B(p.deskripsi_id, p.deskripsi_en)
      })),

      ekstrakurikuler: (ekskul.data || []).map(e => ({
        id: e.id,
        nama: B(e.nama_id, e.nama_en),
        foto: e.foto,
        fotoUtama: e.foto_utama,
        deskripsi: B(e.deskripsi_id, e.deskripsi_en),
        galeri: (ekskulGaleri.data || []).filter(g => g.ekskul_id === e.id).map(g => g.url),
        pelatih: (pelatih.data || []).filter(p => p.ekskul_id === e.id).map(p => ({
          nama: B(p.nama_id, p.nama_en),
          foto: p.foto
        }))
      })),

      dokumen: (dokumen.data || []).map(d => ({
        id: d.id,
        nama: B(d.nama_id, d.nama_en),
        tanggal: d.tanggal,
        url: d.url
      })),

      profil: {
        sejarah: B(d(profil.data?.sejarah_id, ''), d(profil.data?.sejarah_en, '')),
        visi: B(d(profil.data?.visi_id, ''), d(profil.data?.visi_en, '')),
        tujuan: B(d(profil.data?.tujuan_id, ''), d(profil.data?.tujuan_en, '')),
        fotoSekolah: d(profil.data?.foto, ''),
        misi: (profilMisi.data || []).map(m => B(m.misi_id, m.misi_en))
      },

      sambutan: {
        nama: sambutan.data?.nama || '',
        foto: sambutan.data?.foto || '',
        teks: B(sambutan.data?.teks_id, sambutan.data?.teks_en)
      },

      kontak: {
        alamat: B(kontak.data?.alamat_id, kontak.data?.alamat_en),
        telepon: kontak.data?.telepon || '',
        email: kontak.data?.email || '',
        instagram: kontak.data?.instagram || '',
        youtube: kontak.data?.youtube || '',
        tiktok: kontak.data?.tiktok || '',
        mapsEmbed: kontak.data?.maps || ''
      },

      sosialMedia: {
        instagram: sosial.data?.instagram || '',
        youtube: sosial.data?.youtube || '',
        tiktok: sosial.data?.tiktok || '',
        email: sosial.data?.email || ''
      },

      footer: {
        namaSekolah: footer.data?.nama || '',
        deskripsi: B(footer.data?.deskripsi_id, footer.data?.deskripsi_en),
        instagram: footer.data?.instagram || '',
        youtube: footer.data?.youtube || '',
        tiktok: footer.data?.tiktok || '',
        copyright: footer.data?.copyright || ''
      },

      siswa: siswa.data || [],
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

  return (
    <SchoolContext.Provider value={{
      data,
      updateHero: async () => {},
      updateKeunggulan: async () => {},
      updatePegawai: async () => {},
      updateBerita: async () => {},
      updatePrestasi: async () => {},
      updateEkstrakurikuler: async () => {},
      updateDokumen: async () => {},
      updateProfil: async () => {},
      updateSambutan: async () => {},
      updateKontak: async () => {},
      updateFooter: async () => {},
      updateJabatanList: async () => {},
      updateSiswa: async () => {},
      updateLogo: async () => {},
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
