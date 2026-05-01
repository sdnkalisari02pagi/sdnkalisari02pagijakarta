import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bilingual } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';

/* ================= TYPES (SAMA) ================= */

export interface Pelatih {
  nama: Bilingual;
  foto: string;
}

export interface Pegawai {
  id: string;
  nama: string;
  jabatan: string;
  foto: string;
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

export interface HeroData {
  images: string[];
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
}

/* ================= DEFAULT SAFE ================= */

const emptyBilingual = { id: '', en: '' };

const defaultData: SchoolData = {
  logo: '',
  hero: {
    images: [],
    judul: emptyBilingual,
    subtitle: emptyBilingual,
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
    sejarah: emptyBilingual,
    visi: emptyBilingual,
    misi: [],
    tujuan: emptyBilingual,
    fotoSekolah: ''
  },
  sambutan: {
    nama: '',
    foto: '',
    teks: emptyBilingual
  },
  kontak: {
    alamat: emptyBilingual,
    telepon: '',
    email: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    mapsEmbed: ''
  },
  sosialMedia: {
    instagram: '',
    youtube: '',
    tiktok: '',
    email: ''
  },
  footer: {
    namaSekolah: '',
    deskripsi: emptyBilingual,
    instagram: '',
    youtube: '',
    tiktok: '',
    copyright: ''
  },
  siswa: []
};

const SchoolContext = createContext<any>(undefined);

/* ================= FETCH ================= */

async function fetchAll(): Promise<SchoolData> {
  try {
    const [
      hero, heroImages, keunggulan, pegawai,
      jabatan,
      berita, beritaGaleri,
      prestasi, prestasiGaleri,
      ekskul, ekskulGaleri, pelatih,
      dokumen,
      profil, profilMisi,
      sambutan,
      kontak,
      sosial,
      footer,
      siswa
    ] = await Promise.all([
      supabase.from('hero').select('*').single(),
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
      supabase.from('profil').select('*').single(),
      supabase.from('profil_misi').select('*'),
      supabase.from('sambutan').select('*').single(),
      supabase.from('kontak').select('*').single(),
      supabase.from('sosial_media').select('*').single(),
      supabase.from('footer').select('*').single(),
      supabase.from('siswa').select('*')
    ]);

    return {
      logo: '',
      hero: {
        images: heroImages.data?.map(i => i.url) || [],
        judul: { id: hero.data?.judul_id || '', en: hero.data?.judul_en || '' },
        subtitle: { id: hero.data?.subtitle_id || '', en: hero.data?.subtitle_en || '' },
        tahunBerdiri: hero.data?.tahun || '',
        statsVisibility: {
          staff: hero.data?.staff ?? true,
          students: hero.data?.students ?? true,
          ekskul: hero.data?.ekskul ?? true,
          founded: hero.data?.founded ?? true
        }
      },

      keunggulan: keunggulan.data?.map(k => ({
        id: k.id,
        icon: k.icon,
        title: { id: k.title_id, en: k.title_en },
        desc: { id: k.desc_id, en: k.desc_en }
      })) || [],

      pegawai: pegawai.data || [],

      jabatanList: jabatan.data?.map(j => ({
        id: j.nama_id,
        en: j.nama_en
      })) || [],

      berita: berita.data?.map(b => ({
        id: b.id,
        judul: { id: b.judul_id, en: b.judul_en },
        tanggal: b.tanggal,
        tipe: b.tipe,
        fotoUtama: b.foto,
        thumbnail: b.thumbnail || '',
        videoUrl: b.video || '',
        galeri: beritaGaleri.data?.filter(g => g.berita_id === b.id).map(g => g.url) || [],
        deskripsi: { id: b.deskripsi_id, en: b.deskripsi_en }
      })) || [],

      prestasi: prestasi.data?.map(p => ({
        id: p.id,
        judul: { id: p.judul_id, en: p.judul_en },
        tanggal: p.tanggal,
        tipe: p.tipe,
        fotoUtama: p.foto,
        thumbnail: p.thumbnail || '',
        videoUrl: p.video || '',
        galeri: prestasiGaleri.data?.filter(g => g.prestasi_id === p.id).map(g => g.url) || [],
        deskripsi: { id: p.deskripsi_id, en: p.deskripsi_en }
      })) || [],

      ekstrakurikuler: ekskul.data?.map(e => ({
        id: e.id,
        nama: { id: e.nama_id, en: e.nama_en },
        foto: e.foto,
        fotoUtama: e.foto_utama,
        deskripsi: { id: e.deskripsi_id, en: e.deskripsi_en },
        galeri: ekskulGaleri.data?.filter(g => g.ekskul_id === e.id).map(g => g.url) || [],
        pelatih: pelatih.data?.filter(p => p.ekskul_id === e.id).map(p => ({
          nama: { id: p.nama_id, en: p.nama_en },
          foto: p.foto
        })) || []
      })) || [],

      dokumen: dokumen.data?.map(d => ({
        id: d.id,
        nama: { id: d.nama_id, en: d.nama_en },
        tanggal: d.tanggal,
        url: d.url
      })) || [],

      profil: {
        sejarah: { id: profil.data?.sejarah_id || '', en: profil.data?.sejarah_en || '' },
        visi: { id: profil.data?.visi_id || '', en: profil.data?.visi_en || '' },
        tujuan: { id: profil.data?.tujuan_id || '', en: profil.data?.tujuan_en || '' },
        fotoSekolah: profil.data?.foto || '',
        misi: profilMisi.data?.map(m => ({ id: m.misi_id, en: m.misi_en })) || []
      },

      sambutan: {
        nama: sambutan.data?.nama || '',
        foto: sambutan.data?.foto || '',
        teks: { id: sambutan.data?.teks_id || '', en: sambutan.data?.teks_en || '' }
      },

      kontak: {
        alamat: { id: kontak.data?.alamat_id || '', en: kontak.data?.alamat_en || '' },
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
        deskripsi: { id: footer.data?.deskripsi_id || '', en: footer.data?.deskripsi_en || '' },
        instagram: footer.data?.instagram || '',
        youtube: footer.data?.youtube || '',
        tiktok: footer.data?.tiktok || '',
        copyright: footer.data?.copyright || ''
      },

      siswa: siswa.data || []
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
