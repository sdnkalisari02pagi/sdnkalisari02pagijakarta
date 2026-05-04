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

      footer: footer.data ? {
        namaSekolah: footer.data.nama || '',
        deskripsi: B(footer.data.deskripsi_id || '', footer.data.deskripsi_en || ''),
        instagram: footer.data.instagram || '',
        youtube: footer.data.youtube || '',
        tiktok: footer.data.tiktok || '',
        copyright: footer.data.copyright || ''
      } : defaultData.footer
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

  /* ================= STORAGE ================= */

  const uploadFile = async (file: File, prefix: string) => {
    const fileName = `${prefix}-${Date.now()}-${Math.random()}`;

    const { error } = await supabase.storage
      .from('berita')
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('berita')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  /* ================= BERITA ================= */

  const updateBerita = async (items: any[]) => {
    try {
      await supabase.from('berita').delete().neq('id', '');
      await supabase.from('berita_galeri').delete().neq('id', 0);

      for (const item of items) {
        const id = item.id || crypto.randomUUID();

        // 🔥 AMBIL FILE ATAU URL
        let foto = item._fotoFile || item.fotoUtama;
        let thumbnail = item._thumbnailFile || item.thumbnail;
        let galeri = item._galeriFiles || item.galeri || [];

        // 🔥 UPLOAD FOTO
        if (foto instanceof File) {
          foto = await uploadFile(foto, 'foto');
        }

        // 🔥 UPLOAD THUMBNAIL
        if (thumbnail instanceof File) {
          thumbnail = await uploadFile(thumbnail, 'thumb');
        }

        // 🔥 UPLOAD GALERI
        const finalGaleri: string[] = [];

        for (const g of galeri) {
          if (g instanceof File) {
            const url = await uploadFile(g, 'galeri');
            finalGaleri.push(url);
          } else {
            finalGaleri.push(g);
          }
        }

        // 🔥 INSERT BERITA
        await supabase.from('berita').insert({
          id,
          judul_id: item.judul?.id || '',
          judul_en: item.judul?.en || '',
          tanggal: item.tanggal || '',
          tipe: item.tipe || '',
          foto,
          thumbnail,
          video: item.videoUrl || '',
          deskripsi_id: item.deskripsi?.id || '',
          deskripsi_en: item.deskripsi?.en || ''
        });

        // 🔥 INSERT GALERI
        if (finalGaleri.length > 0) {
          await supabase.from('berita_galeri').insert(
            finalGaleri.map(url => ({
              berita_id: id,
              url
            }))
          );
        }
      }

      setData(d => ({ ...d, berita: items }));

    } catch (err) {
      console.error('UPDATE BERITA ERROR:', err);
    }
  };

  return (
    <SchoolContext.Provider value={{ data, updateBerita }}>
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
