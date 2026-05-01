import { supabase } from '@/lib/supabase.ts';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bilingual, toBilingual } from '@/lib/i18n';

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
  fotoUtama: string;        // for tipe=foto, used as card image
  thumbnail: string;        // for tipe=video, used as card image
  videoUrl: string;
  galeri: string[];
  deskripsi: Bilingual;
  lastModified?: string;
}

export type Prestasi = Berita;

// Legacy alias kept for compatibility (read-only). Maps to Berita shape.
export type Kegiatan = Berita;

export interface Ekstrakurikuler {
  id: string;
  nama: Bilingual;
  foto: string;          // legacy, kept as fallback
  fotoUtama: string;     // main card image (required)
  deskripsi: Bilingual;
  galeri: string[];
  pelatih: Pelatih[];    // max 3
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

const B = (id: string, en = ''): Bilingual => ({ id, en });

const defaultData: SchoolData = {
  hero: {
    images: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=400&fit=crop',
    ],
    judul: B('SDN Kalisari 02 Pagi', 'SDN Kalisari 02 Pagi'),
    subtitle: B('Mewujudkan Generasi Cerdas, Berkarakter, dan Berprestasi', 'Building a Smart, Strong-Charactered, and Achieving Generation'),
    tahunBerdiri: '1985',
    statsVisibility: { staff: true, students: true, ekskul: true, founded: true },
  },
  logo: '',
  keunggulan: [
    { id: '1', icon: 'BookOpen', title: B('Kurikulum Berkualitas', 'Quality Curriculum'), desc: B('Menerapkan kurikulum merdeka yang inovatif dan menyenangkan.', 'Applying an innovative and enjoyable Merdeka curriculum.') },
    { id: '2', icon: 'Users', title: B('Guru Profesional', 'Professional Teachers'), desc: B('Tenaga pendidik berpengalaman dan bersertifikasi.', 'Experienced and certified educators.') },
    { id: '3', icon: 'Star', title: B('Prestasi Gemilang', 'Outstanding Achievements'), desc: B('Siswa berprestasi di berbagai kompetisi akademik dan non-akademik.', 'Students excel in various academic and non-academic competitions.') },
    { id: '4', icon: 'Shield', title: B('Lingkungan Aman', 'Safe Environment'), desc: B('Lingkungan sekolah yang aman, bersih, dan nyaman.', 'A safe, clean, and comfortable school environment.') },
  ],
  jabatanList: [
    B('Kepala Sekolah', 'Principal'),
    B('Guru Kelas 1', 'Grade 1 Teacher'),
    B('Guru Kelas 2', 'Grade 2 Teacher'),
    B('Guru Kelas 3', 'Grade 3 Teacher'),
    B('Guru Kelas 4', 'Grade 4 Teacher'),
    B('Guru Kelas 5', 'Grade 5 Teacher'),
    B('Guru Kelas 6', 'Grade 6 Teacher'),
    B('Tata Usaha', 'Administration'),
    B('Penjaga Sekolah', 'School Caretaker'),
    B('Guru Agama', 'Religion Teacher'),
  ],
  pegawai: [
    { id: '1', nama: 'Nuroyanah, M.Pd', jabatan: 'Kepala Sekolah', foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face' },
    { id: '2', nama: 'Siti Aminah, S.Pd', jabatan: 'Guru Kelas 1', foto: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=200&h=200&fit=crop&crop=face' },
    { id: '3', nama: 'Ahmad Fauzi, S.Pd', jabatan: 'Guru Kelas 2', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
    { id: '4', nama: 'Dewi Lestari, S.Pd', jabatan: 'Guru Kelas 3', foto: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face' },
    { id: '5', nama: 'Budi Santoso, S.Pd', jabatan: 'Guru Kelas 4', foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
    { id: '6', nama: 'Rina Wati, S.Pd', jabatan: 'Guru Kelas 5', foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
    { id: '7', nama: 'Joko Prasetyo, S.Pd', jabatan: 'Guru Kelas 6', foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
    { id: '8', nama: 'Sri Mulyani', jabatan: 'Tata Usaha', foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face' },
    { id: '9', nama: 'Hendra Gunawan', jabatan: 'Penjaga Sekolah', foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face' },
    { id: '10', nama: 'Fatimah, S.Pd', jabatan: 'Guru Agama', foto: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=face' },
  ],
  berita: [
    { id: '1', judul: B('Upacara Bendera Hari Senin', 'Monday Flag Ceremony'), tanggal: '2026-04-07', tipe: 'foto', fotoUtama: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop', thumbnail: '', videoUrl: '', galeri: [], deskripsi: B('Pelaksanaan upacara bendera rutin setiap hari Senin untuk meningkatkan kedisiplinan dan rasa nasionalisme siswa.', 'Routine flag ceremony every Monday to enhance student discipline and nationalism.') },
    { id: '2', judul: B('Lomba Mewarnai Tingkat Kecamatan', 'Sub-District Coloring Contest'), tanggal: '2026-03-25', tipe: 'foto', fotoUtama: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop', thumbnail: '', videoUrl: '', galeri: [], deskripsi: B('Siswa SDN Kalisari 02 Pagi berpartisipasi dalam lomba mewarnai tingkat kecamatan dan meraih juara 2.', 'SDN Kalisari 02 Pagi students participated in the sub-district coloring contest and won 2nd place.') },
    { id: '3', judul: B('Peringatan Hari Kartini', 'Kartini Day Commemoration'), tanggal: '2026-04-01', tipe: 'foto', fotoUtama: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600&h=400&fit=crop', thumbnail: '', videoUrl: '', galeri: [], deskripsi: B('Peringatan Hari Kartini dengan kegiatan fashion show pakaian adat nusantara.', 'Kartini Day commemoration with traditional Indonesian costume fashion show.') },
    { id: '4', judul: B('Kunjungan ke Museum Nasional', 'National Museum Visit'), tanggal: '2026-03-15', tipe: 'foto', fotoUtama: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=400&fit=crop', thumbnail: '', videoUrl: '', galeri: [], deskripsi: B('Kunjungan edukatif ke Museum Nasional untuk siswa kelas 5 dan 6.', 'Educational visit to the National Museum for grade 5 and 6 students.') },
    { id: '5', judul: B('Pentas Seni Akhir Semester', 'End of Semester Art Performance'), tanggal: '2026-02-28', tipe: 'foto', fotoUtama: 'https://images.unsplash.com/photo-1514533212735-5df27d970db0?w=600&h=400&fit=crop', thumbnail: '', videoUrl: '', galeri: [], deskripsi: B('Penampilan tari, musik, dan drama dari seluruh kelas dalam acara pentas seni akhir semester.', 'Dance, music, and drama performances from all classes in the end of semester art event.') },
    { id: '6', judul: B('Senam Pagi Bersama', 'Morning Exercise Together'), tanggal: '2026-04-05', tipe: 'foto', fotoUtama: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop', thumbnail: '', videoUrl: '', galeri: [], deskripsi: B('Kegiatan senam pagi bersama setiap Jumat untuk menjaga kesehatan dan kebugaran siswa.', 'Morning exercise every Friday to maintain student health and fitness.') },
  ],
  prestasi: [
    { id: 'p1', judul: B('Juara 1 Lomba Cerdas Cermat', '1st Place Quiz Competition'), tanggal: '2026-02-10', tipe: 'foto', fotoUtama: 'https://images.unsplash.com/photo-1546058256-47154de4046c?w=600&h=400&fit=crop', thumbnail: '', videoUrl: '', galeri: [], deskripsi: B('Tim cerdas cermat sekolah berhasil meraih juara 1 tingkat kecamatan.', 'Our quiz team won 1st place at the sub-district level.') },
  ],
  ekstrakurikuler: [
    { id: '1', nama: B('Pramuka', 'Scouts'), foto: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop', fotoUtama: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop', deskripsi: B('Kegiatan Pramuka bertujuan membentuk karakter siswa yang mandiri, disiplin, dan bertanggung jawab melalui berbagai kegiatan outdoor dan indoor.', 'Scouts activities aim to build independent, disciplined, and responsible student character through various outdoor and indoor activities.'), galeri: ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=600&h=400&fit=crop'], pelatih: [{ nama: B('Pak Budi', 'Mr. Budi'), foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' }] },
    { id: '2', nama: B('Pantomim', 'Pantomime'), foto: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop', fotoUtama: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop', deskripsi: B('Seni pantomim melatih ekspresi tubuh dan kreativitas siswa dalam bercerita tanpa kata-kata.', 'Pantomime art trains body expression and student creativity in storytelling without words.'), galeri: ['https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop'], pelatih: [] },
    { id: '3', nama: B('Tari', 'Dance'), foto: 'https://images.unsplash.com/photo-1547153760-18fc86c0acf7?w=400&h=300&fit=crop', fotoUtama: 'https://images.unsplash.com/photo-1547153760-18fc86c0acf7?w=600&h=400&fit=crop', deskripsi: B('Ekstrakurikuler tari melestarikan budaya Indonesia melalui tarian tradisional dan modern.', 'Dance extracurricular preserves Indonesian culture through traditional and modern dances.'), galeri: ['https://images.unsplash.com/photo-1547153760-18fc86c0acf7?w=600&h=400&fit=crop'], pelatih: [] },
    { id: '4', nama: B('Qasidah', 'Qasidah'), foto: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop', fotoUtama: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop', deskripsi: B('Grup qasidah sekolah yang aktif tampil di berbagai acara keagamaan.', 'School qasidah group actively performing at various religious events.'), galeri: ['https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop'], pelatih: [] },
    { id: '5', nama: B('Marawis', 'Marawis'), foto: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', fotoUtama: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop', deskripsi: B('Seni musik Marawis sebagai wadah siswa mengekspresikan bakat seni musik islami.', 'Marawis music art as a place for students to express their Islamic music talent.'), galeri: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop'], pelatih: [] },
    { id: '6', nama: B('Menggambar', 'Drawing'), foto: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop', fotoUtama: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop', deskripsi: B('Kegiatan menggambar dan melukis untuk mengembangkan kreativitas serta kemampuan seni rupa siswa.', 'Drawing and painting activities to develop creativity and student visual arts skills.'), galeri: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop'], pelatih: [] },
  ],
  dokumen: [
    { id: '1', nama: B('Formulir Pendaftaran Siswa Baru 2026', 'New Student Registration Form 2026'), tanggal: '2026-01-15', url: '#' },
    { id: '2', nama: B('Kalender Akademik 2025/2026', 'Academic Calendar 2025/2026'), tanggal: '2025-07-01', url: '#' },
    { id: '3', nama: B('Tata Tertib Siswa', 'Student Code of Conduct'), tanggal: '2025-08-01', url: '#' },
    { id: '4', nama: B('Surat Keterangan Aktif', 'Active Status Letter'), tanggal: '2026-03-01', url: '#' },
  ],
  profil: {
    sejarah: B(
      'SDN Kalisari 02 Pagi didirikan pada tahun 1985 dan telah menjadi salah satu sekolah dasar unggulan di wilayah Kalisari, Jakarta Timur.',
      'SDN Kalisari 02 Pagi was founded in 1985 and has become one of the leading elementary schools in Kalisari, East Jakarta.'
    ),
    visi: B('Mewujudkan peserta didik yang beriman, berakhlak mulia, cerdas, terampil, dan berwawasan lingkungan.', 'Building students who are faithful, noble, smart, skilled, and environmentally conscious.'),
    misi: [
      B('Melaksanakan pembelajaran yang aktif, kreatif, efektif, dan menyenangkan.', 'Implement active, creative, effective, and enjoyable learning.'),
      B('Menumbuhkan semangat keunggulan dan budaya berprestasi.', 'Foster a spirit of excellence and achievement.'),
      B('Membiasakan perilaku yang terpuji dan berakhlak mulia.', 'Cultivate praiseworthy and noble behavior.'),
    ],
    tujuan: B('Menghasilkan lulusan yang berkarakter, berprestasi, dan siap melanjutkan pendidikan.', 'Produce graduates with strong character ready for higher education.'),
    fotoSekolah: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop',
  },
  sambutan: {
    nama: 'Ibu Nuroyanah, M.Pd',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
    teks: B(
      'Assalamualaikum Warahmatullahi Wabarakatuh.\n\nSelamat datang di website resmi SDN Kalisari 02 Pagi.',
      'Assalamualaikum Warahmatullahi Wabarakatuh.\n\nWelcome to the official website of SDN Kalisari 02 Pagi.'
    ),
  },
  kontak: {
    alamat: B('Jl. Kalisari Raya No. 2, Jakarta Timur 13790', 'Jl. Kalisari Raya No. 2, East Jakarta 13790'),
    telepon: '(021) 8401234',
    email: 'kalisari02pagi@gmail.com',
    instagram: 'https://www.instagram.com/sdnegerikalisari02pagi/',
    youtube: 'https://www.youtube.com/@kalisaritimur2027',
    tiktok: '',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.2!2d106.87!3d-6.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjAnUyAxMDbCsDUyJ0U!5e0!3m2!1sen!2sid!4v1234567890',
  },
  sosialMedia: {
    instagram: 'https://www.instagram.com/sdnegerikalisari02pagi/',
    youtube: 'https://www.youtube.com/@kalisaritimur2027',
    tiktok: '',
    email: 'kalisari02pagi@gmail.com',
  },
  footer: {
    namaSekolah: 'SDN Kalisari 02 Pagi',
    deskripsi: B('Mewujudkan generasi cerdas, berkarakter, dan berprestasi.', 'Building a smart, strong-charactered, and achieving generation.'),
    instagram: 'https://www.instagram.com/sdnegerikalisari02pagi/',
    youtube: 'https://www.youtube.com/@kalisaritimur2027',
    tiktok: '',
    copyright: `© ${new Date().getFullYear()} SDN Kalisari 02 Pagi. All rights reserved.`,
  },
  siswa: [
    { id: '1', kelas: 'Kelas 1A', jumlah: 28 },
    { id: '2', kelas: 'Kelas 1B', jumlah: 27 },
    { id: '3', kelas: 'Kelas 2A', jumlah: 30 },
    { id: '4', kelas: 'Kelas 2B', jumlah: 29 },
    { id: '5', kelas: 'Kelas 3A', jumlah: 30 },
    { id: '6', kelas: 'Kelas 3B', jumlah: 28 },
    { id: '7', kelas: 'Kelas 4A', jumlah: 29 },
    { id: '8', kelas: 'Kelas 4B', jumlah: 30 },
    { id: '9', kelas: 'Kelas 5A', jumlah: 28 },
    { id: '10', kelas: 'Kelas 5B', jumlah: 29 },
    { id: '11', kelas: 'Kelas 6A', jumlah: 30 },
    { id: '12', kelas: 'Kelas 6B', jumlah: 28 },
  ],
  lastModified: {},
};

interface SchoolContextType {
  data: SchoolData;
  updateLogo: (logo: string) => void;
  updateKeunggulan: (keunggulan: Keunggulan[]) => void;
  updateHero: (hero: HeroData) => void;
  updatePegawai: (pegawai: Pegawai[]) => void;
  updateBerita: (berita: Berita[]) => void;
  updatePrestasi: (prestasi: Prestasi[]) => void;
  updateEkstrakurikuler: (ekskul: Ekstrakurikuler[]) => void;
  updateDokumen: (dokumen: Dokumen[]) => void;
  updateProfil: (profil: ProfilSekolah) => void;
  updateSambutan: (sambutan: Sambutan) => void;
  updateKontak: (kontak: KontakInfo) => void;
  updateFooter: (footer: FooterData) => void;
  updateJabatanList: (jabatanList: Bilingual[]) => void;
  updateSiswa: (siswa: KelasSiswa[]) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

function migrateBerita(items: any[]): Berita[] {
  return (items || []).map((k: any) => ({
    id: k.id || Date.now().toString(),
    judul: toBilingual(k.judul),
    tanggal: k.tanggal || '',
    tipe: (k.tipe === 'video' ? 'video' : 'foto') as ContentTipe,
    fotoUtama: k.fotoUtama || k.foto || '',
    thumbnail: k.thumbnail || '',
    videoUrl: k.videoUrl || '',
    galeri: Array.isArray(k.galeri) ? k.galeri : [],
    deskripsi: toBilingual(k.deskripsi),
    lastModified: k.lastModified,
  }));
}

function migrate(data: any): SchoolData {
  const m = (v: any) => toBilingual(v);
  const mArr = (a: any[]) => Array.isArray(a) ? a.map(m) : [];

  // Migrate jabatanList: support legacy string[] -> Bilingual[]
  let jabatanList: Bilingual[];
  if (Array.isArray(data.jabatanList) && data.jabatanList.length > 0) {
    jabatanList = data.jabatanList.map((j: any) => toBilingual(j));
  } else {
    jabatanList = defaultData.jabatanList;
  }

  // Migrate berita from legacy kegiatan if not already present
  let berita: Berita[];
  if (Array.isArray(data.berita) && data.berita.length > 0) {
    berita = migrateBerita(data.berita);
  } else if (Array.isArray(data.kegiatan) && data.kegiatan.length > 0) {
    berita = migrateBerita(data.kegiatan);
  } else {
    berita = defaultData.berita;
  }

  const prestasi = Array.isArray(data.prestasi) && data.prestasi.length > 0
    ? migrateBerita(data.prestasi)
    : defaultData.prestasi;

  return {
    ...defaultData,
    ...data,
    hero: {
      ...defaultData.hero,
      ...(data.hero || {}),
      judul: m(data.hero?.judul ?? defaultData.hero.judul),
      subtitle: m(data.hero?.subtitle ?? defaultData.hero.subtitle),
      tahunBerdiri: data.hero?.tahunBerdiri || defaultData.hero.tahunBerdiri,
      statsVisibility: { ...defaultData.hero.statsVisibility, ...(data.hero?.statsVisibility || {}) },
      images: data.hero?.images || defaultData.hero.images,
    },
    keunggulan: (data.keunggulan || defaultData.keunggulan).map((k: any) => ({
      ...k, title: m(k.title), desc: m(k.desc),
    })),
    berita,
    prestasi,
    ekstrakurikuler: (data.ekstrakurikuler || defaultData.ekstrakurikuler).map((e: any) => ({
      id: e.id,
      nama: m(e.nama),
      foto: e.foto || '',
      fotoUtama: e.fotoUtama || e.foto || '',
      deskripsi: m(e.deskripsi),
      galeri: e.galeri || [],
      pelatih: Array.isArray(e.pelatih)
        ? e.pelatih.slice(0, 3).map((p: any) => ({ nama: toBilingual(p.nama), foto: p.foto || '' }))
        : [],
      lastModified: e.lastModified,
    })),
    dokumen: (data.dokumen || defaultData.dokumen).map((d: any) => ({
      ...d, nama: m(d.nama),
    })),
    profil: {
      ...defaultData.profil,
      ...(data.profil || {}),
      sejarah: m(data.profil?.sejarah ?? defaultData.profil.sejarah),
      visi: m(data.profil?.visi ?? defaultData.profil.visi),
      tujuan: m(data.profil?.tujuan ?? defaultData.profil.tujuan),
      misi: mArr(data.profil?.misi ?? defaultData.profil.misi),
    },
    sambutan: {
      ...defaultData.sambutan,
      ...(data.sambutan || {}),
      teks: m(data.sambutan?.teks ?? defaultData.sambutan.teks),
    },
    kontak: {
      ...defaultData.kontak,
      ...(data.kontak || {}),
      alamat: m(data.kontak?.alamat ?? defaultData.kontak.alamat),
      tiktok: data.kontak?.tiktok || '',
    },
    sosialMedia: { ...defaultData.sosialMedia, ...(data.sosialMedia || {}), tiktok: data.sosialMedia?.tiktok || '' },
    footer: {
      ...defaultData.footer,
      ...(data.footer || {}),
      deskripsi: m(data.footer?.deskripsi ?? defaultData.footer.deskripsi),
      tiktok: data.footer?.tiktok || '',
    },
    siswa: data.siswa || defaultData.siswa,
    jabatanList,
    pegawai: data.pegawai || defaultData.pegawai,
    lastModified: data.lastModified || {},
  };
}

function loadData(): SchoolData {
  try {
    const saved = localStorage.getItem('school-data');
    if (saved) return migrate(JSON.parse(saved));
  } catch {}
  return defaultData;
}

export function SchoolProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SchoolData>(loadData);

  useEffect(() => {
    try {
      localStorage.setItem('school-data', JSON.stringify(data));
    } catch (err) {
      console.error('Gagal menyimpan data ke localStorage:', err);
      if (err instanceof DOMException && (err.name === 'QuotaExceededError' || err.code === 22)) {
        // Defer toast to avoid render-phase side effects
        setTimeout(() => {
          try {
            // Lazy import to avoid circular deps
            const { toast } = require('@/hooks/use-toast');
            toast({
              title: 'Penyimpanan Penuh',
              description: 'Data terlalu besar untuk disimpan di browser. Coba kompres/kurangi gambar atau hapus konten lama.',
              variant: 'destructive',
            });
          } catch {}
        }, 0);
      }
    }
  }, [data]);

  const now = () => new Date().toISOString();
  const updateLogo = (logo: string) => setData(d => ({ ...d, logo, lastModified: { ...d.lastModified, logo: now() } }));
  const updateHero = (hero: HeroData) => setData(d => ({ ...d, hero, lastModified: { ...d.lastModified, hero: now() } }));
  const updateKeunggulan = (keunggulan: Keunggulan[]) => setData(d => ({ ...d, keunggulan, lastModified: { ...d.lastModified, keunggulan: now() } }));
  const updatePegawai = (pegawai: Pegawai[]) => setData(d => ({ ...d, pegawai, lastModified: { ...d.lastModified, pegawai: now() } }));
  const updateBerita = (berita: Berita[]) => setData(d => ({ ...d, berita, lastModified: { ...d.lastModified, berita: now() } }));
  const updatePrestasi = (prestasi: Prestasi[]) => setData(d => ({ ...d, prestasi, lastModified: { ...d.lastModified, prestasi: now() } }));
  const updateEkstrakurikuler = (ekstrakurikuler: Ekstrakurikuler[]) => setData(d => ({ ...d, ekstrakurikuler, lastModified: { ...d.lastModified, ekstrakurikuler: now() } }));
  const updateDokumen = (dokumen: Dokumen[]) => setData(d => ({ ...d, dokumen, lastModified: { ...d.lastModified, dokumen: now() } }));
  const updateProfil = (profil: ProfilSekolah) => setData(d => ({ ...d, profil, lastModified: { ...d.lastModified, profil: now() } }));
  const updateSambutan = (sambutan: Sambutan) => setData(d => ({ ...d, sambutan, lastModified: { ...d.lastModified, sambutan: now() } }));
  const updateKontak = (kontak: KontakInfo) => setData(d => ({ ...d, kontak, lastModified: { ...d.lastModified, kontak: now() } }));
  const updateFooter = (footer: FooterData) => setData(d => ({ ...d, footer, lastModified: { ...d.lastModified, footer: now() } }));
  const updateJabatanList = (jabatanList: Bilingual[]) => setData(d => ({ ...d, jabatanList }));
  const updateSiswa = (siswa: KelasSiswa[]) => setData(d => ({ ...d, siswa, lastModified: { ...d.lastModified, siswa: now() } }));

  return (
    <SchoolContext.Provider value={{ data, updateLogo, updateHero, updateKeunggulan, updatePegawai, updateBerita, updatePrestasi, updateEkstrakurikuler, updateDokumen, updateProfil, updateSambutan, updateKontak, updateFooter, updateJabatanList, updateSiswa }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const ctx = useContext(SchoolContext);
  if (!ctx) throw new Error('useSchool must be used within SchoolProvider');
  return ctx;
}
