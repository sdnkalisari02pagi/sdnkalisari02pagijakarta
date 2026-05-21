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

export type KelasSiswa = { id: string; kelas: string; jumlah: number };
export type Pegawai = { id: string; nama: string; jabatan: string; foto: string; lastModified?: string };
export type ContentTipe = 'foto' | 'video';
export type Berita = { id: string; judul: Bilingual; tanggal: string; tipe: ContentTipe; fotoUtama: string; thumbnail?: string; videoUrl?: string; galeri?: string[]; deskripsi: Bilingual; lastModified?: string };
export type Prestasi = Berita;

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
    logo: null, footer: null, hero: null, keunggulan: null, pegawai: null, berita: null, prestasi: null, ekstrakurikuler: null, dokumen: null, profil: null, sambutan: null, kontak: null, siswa: null
  },
  siswa: []
};

/* ================= CONTEXT ================= */

const SchoolContext = createContext<any>(undefined);

/* ================= FETCH ================= */

async function fetchAll(): Promise<SchoolData> {
  try {
    const [
      logo, hero, heroImages, keunggulan, pegawai, jabatanList,
      berita, beritaGaleri, prestasi, prestasiGaleri,
      ekstrakurikuler, ekskulGaleri, dokumen, profil, profilMisi,
      sambutan, kontak, footer, siswa
    ] = await Promise.all([
      supabase.from('logo').select('*').limit(1).maybeSingle(),
      supabase.from('hero').select('*').limit(1).maybeSingle(),
      supabase.from('hero_images').select('*').order('id'),
      supabase.from('keunggulan').select('*'),
      supabase.from('pegawai').select('*'),
      supabase.from('jabatan_list').select('*'),
      supabase.from('berita').select('*'),
      supabase.from('berita_galeri').select('*'),
      supabase.from('prestasi').select('*'),
      supabase.from('prestasi_galeri').select('*'),
      supabase.from('ekstrakurikuler').select('*'),
      supabase.from('ekstrakurikuler_galeri').select('*'),
      supabase.from('dokumen').select('*'),
      supabase.from('profil').select('*').limit(1).maybeSingle(),
      supabase.from('profil_misi').select('*'),
      supabase.from('sambutan').select('*').limit(1).maybeSingle(),
      supabase.from('kontak').select('*').limit(1).maybeSingle(),
      supabase.from('footer').select('*').limit(1).maybeSingle(),
      supabase.from('siswa').select('*')
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
      keunggulan: (keunggulan.data || []).map(k => ({
        id: k.id, icon: k.icon, judul: B(k.title_id, k.title_en), deskripsi: B(k.desc_id, k.desc_en)
      })),
      pegawai: pegawai.data || [],
      jabatanList: (jabatanList.data || []).map(j => B(j.nama_id, j.nama_en)),
      berita: (berita.data || []).map(b => ({
        id: b.id, judul: B(b.judul_id, b.judul_en), tanggal: b.tanggal, tipe: b.tipe,
        fotoUtama: b.foto, thumbnail: b.thumbnail || '', videoUrl: b.video || '',
        deskripsi: B(b.deskripsi_id, b.deskripsi_en),
        galeri: (beritaGaleri.data || []).filter(g => g.berita_id === b.id).map(g => g.url)
      })),
      prestasi: (prestasi.data || []).map(p => ({
        id: p.id, judul: B(p.judul_id, p.judul_en), tanggal: p.tanggal, tipe: p.tipe,
        fotoUtama: p.foto, thumbnail: p.thumbnail || '', videoUrl: p.video || '',
        deskripsi: B(p.deskripsi_id, p.deskripsi_en),
        galeri: (prestasiGaleri.data || []).filter(g => g.prestasi_id === p.id).map(g => g.url)
      })),
      ekstrakurikuler: (ekstrakurikuler.data || []).map(e => ({
        id: e.id, nama: B(e.nama_id, e.nama_en), foto: e.foto, fotoUtama: e.foto_utama,
        deskripsi: B(e.deskripsi_id, e.deskripsi_en),
        galeri: (ekskulGaleri.data || []).filter(g => g.ekskul_id === e.id).map(g => g.url)
      })),
      dokumen: (dokumen.data || []).map(d => ({
        id: d.id, nama: B(d.nama_id, d.nama_en), tanggal: d.tanggal, url: d.url
      })),
      profil: profil.data ? {
        sejarah: B(profil.data.sejarah_id, profil.data.sejarah_en),
        visi: B(profil.data.visi_id, profil.data.visi_en),
        misi: (profilMisi.data || []).filter(m => m.profil_id === profil.data.id).map(m => B(m.misi_id, m.misi_en)),
        tujuan: B(profil.data.tujuan_id, profil.data.tujuan_en),
        fotoSekolah: profil.data.foto
      } : defaultData.profil,
      sambutan: sambutan.data ? {
        nama: sambutan.data.nama || '', foto: sambutan.data.foto || '', teks: B(sambutan.data.teks_id || '', sambutan.data.teks_en || '')
      } : defaultData.sambutan,
      kontak: kontak.data ? {
        alamat: B(kontak.data.alamat_id, kontak.data.alamat_en), telepon: kontak.data.telepon || '', email: kontak.data.email || '',
        instagram: kontak.data.instagram || '', youtube: kontak.data.youtube || '', tiktok: kontak.data.tiktok || '', mapsEmbed: kontak.data.maps || ''
      } : defaultData.kontak,
      footer: footer.data ? {
        namaSekolah: footer.data.nama || '', deskripsi: B(footer.data.deskripsi_id, footer.data.deskripsi_en),
        instagram: footer.data.instagram || '', youtube: footer.data.youtube || '', tiktok: footer.data.tiktok || '', copyright: footer.data.copyright || ''
      } : defaultData.footer,
      siswa: siswa.data || [],
      lastModified: {
        logo: logo.data?.updated_at || null, footer: footer.data?.updated_at || null, hero: hero.data?.updated_at || null,
        keunggulan: keunggulan.data?.[0]?.updated_at || null, pegawai: pegawai.data?.[0]?.updated_at || null,
        berita: berita.data?.[0]?.updated_at || null, prestasi: prestasi.data?.[0]?.updated_at || null,
        ekstrakurikuler: ekstrakurikuler.data?.[0]?.updated_at || null, dokumen: dokumen.data?.[0]?.updated_at || null,
        profil: profil.data?.updated_at || null, sambutan: sambutan.data?.updated_at || null, kontak: kontak.data?.updated_at || null, siswa: null
      }
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

  const updateLocal = (key: keyof SchoolData, value: any, timestampKey?: string) => {
    setData(d => ({
      ...d,
      [key]: value,
      lastModified: timestampKey ? { ...d.lastModified, [timestampKey]: new Date().toISOString() } : d.lastModified
    }));
  };

  const updateFooter = async (form: any) => {
    await supabase.from('footer').upsert({
      id: 1, nama: form.namaSekolah, deskripsi_id: form.deskripsi?.id || '', deskripsi_en: form.deskripsi?.en || '',
      instagram: form.instagram, youtube: form.youtube, tiktok: form.tiktok, copyright: form.copyright
    });
    updateLocal('footer', form, 'footer');
  };

  const updateLogo = async (url: string) => {
    await supabase.from('logo').upsert({ id: 1, url });
    updateLocal('logo', url, 'logo');
  };

  const updateHero = async (form: any) => {
  await supabase.from('hero').upsert({
    id: 1,
    judul_id: form.judul?.id || '',
    judul_en: form.judul?.en || '',
    subtitle_id: form.subtitle?.id || '',
    subtitle_en: form.subtitle?.en || '',
    tahun: form.tahunBerdiri || '',
    staff: form.statsVisibility?.staff ?? true,
    students: form.statsVisibility?.students ?? true,
    ekskul: form.statsVisibility?.ekskul ?? true,
    founded: form.statsVisibility?.founded ?? true
  });

  await supabase.from('hero_images').delete().eq('hero_id', 1);

  if (form.images?.length) {
    const uniqueImages = [
      ...new Set(
        form.images.filter(
          (url: string) => url && url.trim() !== ''
        )
      )
    ];

    await supabase.from('hero_images').insert(
      uniqueImages.map((url: string) => ({
        hero_id: 1,
        url
      }))
    );
  }

  updateLocal('hero', form, 'hero');
};

  const updateSambutan = async (form: any) => {
    await supabase.from('sambutan').upsert({ id: 1, nama: form.nama, foto: form.foto, teks_id: form.teks?.id || '', teks_en: form.teks?.en || '' });
    updateLocal('sambutan', form, 'sambutan');
  };

  const updateSiswa = async (form: any[]) => {
    const ids = form.map(f => f.id);
    if (ids.length > 0) await supabase.from('siswa').delete().not('id', 'in', `(${ids.map(id => `"${id}"`).join(',')})`);
    else await supabase.from('siswa').delete().neq('id', 'null'); // clear all
    if (form.length > 0) await supabase.from('siswa').upsert(form.map(f => ({ id: f.id, kelas: f.kelas, jumlah: f.jumlah })));
    updateLocal('siswa', form, 'siswa');
  };

  const updateKeunggulan = async (form: any[]) => {
    const ids = form.map(f => f.id);
    if (ids.length > 0) await supabase.from('keunggulan').delete().not('id', 'in', `(${ids.map(id => `"${id}"`).join(',')})`);
    else await supabase.from('keunggulan').delete().neq('id', 'null');
    if (form.length > 0) await supabase.from('keunggulan').upsert(form.map(f => ({
      id: f.id, icon: f.icon, title_id: f.judul?.id || '', title_en: f.judul?.en || '', desc_id: f.deskripsi?.id || '', desc_en: f.deskripsi?.en || ''
    })));
    updateLocal('keunggulan', form, 'keunggulan');
  };

  const updatePegawai = async (form: any[]) => {
    const ids = form.map(f => f.id);
    if (ids.length > 0) await supabase.from('pegawai').delete().not('id', 'in', `(${ids.map(id => `"${id}"`).join(',')})`);
    else await supabase.from('pegawai').delete().neq('id', 'null');
    if (form.length > 0) await supabase.from('pegawai').upsert(form.map(f => ({
      id: f.id, nama: f.nama, jabatan: f.jabatan, foto: f.foto
    })));
    updateLocal('pegawai', form, 'pegawai');
  };

  const updateJabatanList = async (form: Bilingual[]) => {
    await supabase.from('jabatan_list').delete().neq('id', -1);
    if (form.length > 0) await supabase.from('jabatan_list').insert(form.map(f => ({ nama_id: f.id, nama_en: f.en })));
    updateLocal('jabatanList', form);
  };

  const updateBerita = async (form: any[]) => {
    const ids = form.map(f => f.id);
    if (ids.length > 0) await supabase.from('berita').delete().not('id', 'in', `(${ids.map(id => `"${id}"`).join(',')})`);
    else await supabase.from('berita').delete().neq('id', 'null');
    
    if (form.length > 0) {
      await supabase.from('berita').upsert(form.map(f => ({
        id: f.id, judul_id: f.judul?.id || '', judul_en: f.judul?.en || '', tanggal: f.tanggal, tipe: f.tipe,
        foto: f.fotoUtama || '', thumbnail: f.thumbnail || null, video: f.videoUrl || null,
        deskripsi_id: f.deskripsi?.id || '', deskripsi_en: f.deskripsi?.en || ''
      })));
      
      await supabase.from('berita_galeri').delete().neq('id', -1); // simplifiy: drop all galeri and reinsert
      const galeriPayload = form.flatMap(f => (f.galeri || []).map((url: string) => ({ berita_id: f.id, url })));
      if (galeriPayload.length > 0) await supabase.from('berita_galeri').insert(galeriPayload);
    }
    updateLocal('berita', form, 'berita');
  };

  const updatePrestasi = async (form: any[]) => {
    const ids = form.map(f => f.id);
    if (ids.length > 0) await supabase.from('prestasi').delete().not('id', 'in', `(${ids.map(id => `"${id}"`).join(',')})`);
    else await supabase.from('prestasi').delete().neq('id', 'null');
    
    if (form.length > 0) {
      await supabase.from('prestasi').upsert(form.map(f => ({
        id: f.id, judul_id: f.judul?.id || '', judul_en: f.judul?.en || '', tanggal: f.tanggal, tipe: f.tipe,
        foto: f.fotoUtama || '', thumbnail: f.thumbnail || null, video: f.videoUrl || null,
        deskripsi_id: f.deskripsi?.id || '', deskripsi_en: f.deskripsi?.en || ''
      })));
      
      await supabase.from('prestasi_galeri').delete().neq('id', -1);
      const galeriPayload = form.flatMap(f => (f.galeri || []).map((url: string) => ({ prestasi_id: f.id, url })));
      if (galeriPayload.length > 0) await supabase.from('prestasi_galeri').insert(galeriPayload);
    }
    updateLocal('prestasi', form, 'prestasi');
  };

  const updateEkstrakurikuler = async (form: any[]) => {
    const ids = form.map(f => f.id);
    if (ids.length > 0) await supabase.from('ekstrakurikuler').delete().not('id', 'in', `(${ids.map(id => `"${id}"`).join(',')})`);
    else await supabase.from('ekstrakurikuler').delete().neq('id', 'null');
    
    if (form.length > 0) {
      await supabase.from('ekstrakurikuler').upsert(form.map(f => ({
        id: f.id, nama_id: f.nama?.id || '', nama_en: f.nama?.en || '', foto: f.foto || '', foto_utama: f.fotoUtama || '',
        deskripsi_id: f.deskripsi?.id || '', deskripsi_en: f.deskripsi?.en || ''
      })));
      
      await supabase.from('ekstrakurikuler_galeri').delete().neq('id', -1);
      const galeriPayload = form.flatMap(f => (f.galeri || []).map((url: string) => ({ ekskul_id: f.id, url })));
      if (galeriPayload.length > 0) await supabase.from('ekstrakurikuler_galeri').insert(galeriPayload);
    }
    updateLocal('ekstrakurikuler', form, 'ekstrakurikuler');
  };

  const updateDokumen = async (form: any[]) => {
    const ids = form.map(f => f.id);
    if (ids.length > 0) await supabase.from('dokumen').delete().not('id', 'in', `(${ids.map(id => `"${id}"`).join(',')})`);
    else await supabase.from('dokumen').delete().neq('id', 'null');
    
    if (form.length > 0) {
      await supabase.from('dokumen').upsert(form.map(f => ({
        id: f.id, nama_id: f.nama?.id || '', nama_en: f.nama?.en || '', tanggal: f.tanggal, url: f.url
      })));
    }
    updateLocal('dokumen', form, 'dokumen');
  };

  const updateProfil = async (form: any) => {
    await supabase.from('profil').upsert({
      id: 1, sejarah_id: form.sejarah?.id || '', sejarah_en: form.sejarah?.en || '',
      visi_id: form.visi?.id || '', visi_en: form.visi?.en || '',
      tujuan_id: form.tujuan?.id || '', tujuan_en: form.tujuan?.en || '',
      foto: form.fotoSekolah || ''
    });
    await supabase.from('profil_misi').delete().eq('profil_id', 1);
    if (form.misi?.length) {
      await supabase.from('profil_misi').insert(form.misi.map((m: any) => ({ profil_id: 1, misi_id: m.id || '', misi_en: m.en || '' })));
    }
    updateLocal('profil', form, 'profil');
  };

  const updateKontak = async (form: any) => {
    await supabase.from('kontak').upsert({
      id: 1, alamat_id: form.alamat?.id || '', alamat_en: form.alamat?.en || '',
      telepon: form.telepon || '', email: form.email || '', instagram: form.instagram || '',
      youtube: form.youtube || '', tiktok: form.tiktok || '', maps: form.mapsEmbed || ''
    });
    updateLocal('kontak', form, 'kontak');
  };

  return (
    <SchoolContext.Provider value={{
      data, updateFooter, updateLogo, updateSambutan, updateHero,
      updateSiswa, updateKeunggulan, updatePegawai, updateJabatanList,
      updateBerita, updatePrestasi, updateEkstrakurikuler, updateDokumen,
      updateProfil, updateKontak
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
