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

/* ================= FETCH (STABLE) ================= */

async function fetchAll(): Promise<SchoolData> {
  try {
    const [
      hero,
      heroImages,
      keunggulan,
      pegawai,
      jabatan,
      berita,
      beritaGaleri,
      prestasi,
      prestasiGaleri,
      ekskul,
      ekskulGaleri,
      pelatih,
      dokumen,
      profil,
      profilMisi,
      sambutan,
      kontak,
      sosial,
      footer,
      siswa
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

    const heroData = hero.data || {};
    const heroImagesData = heroImages.data || [];
    const keunggulanData = keunggulan.data || [];
    const pegawaiData = pegawai.data || [];
    const jabatanData = jabatan.data || [];
    const beritaData = berita.data || [];
    const beritaGaleriData = beritaGaleri.data || [];
    const prestasiData = prestasi.data || [];
    const prestasiGaleriData = prestasiGaleri.data || [];
    const ekskulData = ekskul.data || [];
    const ekskulGaleriData = ekskulGaleri.data || [];
    const pelatihData = pelatih.data || [];
    const dokumenData = dokumen.data || [];
    const profilData = profil.data || {};
    const profilMisiData = profilMisi.data || [];
    const sambutanData = sambutan.data || {};
    const kontakData = kontak.data || {};
    const sosialData = sosial.data || {};
    const footerData = footer.data || {};
    const siswaData = siswa.data || [];

    return {
      ...defaultData,

      hero: {
        images: heroImagesData.map(i => i.url),
        judul: B(heroData.judul_id, heroData.judul_en),
        subtitle: B(heroData.subtitle_id, heroData.subtitle_en),
        tahunBerdiri: heroData.tahun || '',
        statsVisibility: {
          staff: heroData.staff ?? true,
          students: heroData.students ?? true,
          ekskul: heroData.ekskul ?? true,
          founded: heroData.founded ?? true
        }
      },

      keunggulan: keunggulanData.map(k => ({
        id: k.id,
        icon: k.icon,
        title: B(k.title_id, k.title_en),
        desc: B(k.desc_id, k.desc_en)
      })),

      pegawai: pegawaiData,

      jabatanList: jabatanData.map(j => B(j.nama_id, j.nama_en)),

      berita: beritaData.map(b => ({
        id: b.id,
        judul: B(b.judul_id, b.judul_en),
        tanggal: b.tanggal,
        tipe: b.tipe,
        fotoUtama: b.foto,
        thumbnail: b.thumbnail || '',
        videoUrl: b.video || '',
        galeri: beritaGaleriData
          .filter(g => g.berita_id === b.id)
          .map(g => g.url),
        deskripsi: B(b.deskripsi_id, b.deskripsi_en)
      })),

      prestasi: prestasiData.map(p => ({
        id: p.id,
        judul: B(p.judul_id, p.judul_en),
        tanggal: p.tanggal,
        tipe: p.tipe,
        fotoUtama: p.foto,
        thumbnail: p.thumbnail || '',
        videoUrl: p.video || '',
        galeri: prestasiGaleriData
          .filter(g => g.prestasi_id === p.id)
          .map(g => g.url),
        deskripsi: B(p.deskripsi_id, p.deskripsi_en)
      })),

      ekstrakurikuler: ekskulData.map(e => ({
        id: e.id,
        nama: B(e.nama_id, e.nama_en),
        foto: e.foto,
        fotoUtama: e.foto_utama,
        deskripsi: B(e.deskripsi_id, e.deskripsi_en),
        galeri: ekskulGaleriData
          .filter(g => g.ekskul_id === e.id)
          .map(g => g.url),
        pelatih: pelatihData
          .filter(p => p.ekskul_id === e.id)
          .map(p => ({
            nama: B(p.nama_id, p.nama_en),
            foto: p.foto
          }))
      })),

      dokumen: dokumenData.map(d => ({
        id: d.id,
        nama: B(d.nama_id, d.nama_en),
        tanggal: d.tanggal,
        url: d.url
      })),

      profil: {
        sejarah: B(profilData.sejarah_id, profilData.sejarah_en),
        visi: B(profilData.visi_id, profilData.visi_en),
        tujuan: B(profilData.tujuan_id, profilData.tujuan_en),
        fotoSekolah: profilData.foto || '',
        misi: profilMisiData.map(m => B(m.misi_id, m.misi_en))
      },

      sambutan: {
        nama: sambutanData.nama || '',
        foto: sambutanData.foto || '',
        teks: B(sambutanData.teks_id, sambutanData.teks_en)
      },

      kontak: {
        alamat: B(kontakData.alamat_id, kontakData.alamat_en),
        telepon: kontakData.telepon || '',
        email: kontakData.email || '',
        instagram: kontakData.instagram || '',
        youtube: kontakData.youtube || '',
        tiktok: kontakData.tiktok || '',
        mapsEmbed: kontakData.maps || ''
      },

      sosialMedia: {
        instagram: sosialData.instagram || '',
        youtube: sosialData.youtube || '',
        tiktok: sosialData.tiktok || '',
        email: sosialData.email || ''
      },

      footer: {
        namaSekolah: footerData.nama || '',
        deskripsi: B(footerData.deskripsi_id, footerData.deskripsi_en),
        instagram: footerData.instagram || '',
        youtube: footerData.youtube || '',
        tiktok: footerData.tiktok || '',
        copyright: footerData.copyright || ''
      },

      siswa: siswaData,
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
    <SchoolContext.Provider value={{ data }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const ctx = useContext(SchoolContext);
  if (!ctx) throw new Error('useSchool must be used within SchoolProvider');
  return ctx;
}
