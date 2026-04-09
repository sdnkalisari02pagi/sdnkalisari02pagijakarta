import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Pegawai {
  id: string;
  nama: string;
  jabatan: string;
  foto: string;
  lastModified?: string;
}

export interface Kegiatan {
  id: string;
  judul: string;
  tanggal: string;
  foto: string;
  deskripsi: string;
  lastModified?: string;
}

export interface Ekstrakurikuler {
  id: string;
  nama: string;
  foto: string;
  deskripsi: string;
  galeri: string[];
  lastModified?: string;
}

export interface Dokumen {
  id: string;
  nama: string;
  tanggal: string;
  url: string;
  lastModified?: string;
}

export interface ProfilSekolah {
  sejarah: string;
  visi: string;
  misi: string[];
  tujuan: string;
  fotoSekolah: string;
}

export interface Sambutan {
  nama: string;
  foto: string;
  teks: string;
}

export interface KontakInfo {
  alamat: string;
  telepon: string;
  email: string;
  instagram: string;
  youtube: string;
  mapsEmbed: string;
}

export interface HeroData {
  images: string[];
  judul: string;
  subtitle: string;
}

export interface LastModified {
  logo?: string;
  pegawai?: string;
  kegiatan?: string;
  ekstrakurikuler?: string;
  dokumen?: string;
  profil?: string;
  sambutan?: string;
  kontak?: string;
  hero?: string;
}

export interface SchoolData {
  logo: string;
  hero: HeroData;
  pegawai: Pegawai[];
  kegiatan: Kegiatan[];
  ekstrakurikuler: Ekstrakurikuler[];
  dokumen: Dokumen[];
  profil: ProfilSekolah;
  sambutan: Sambutan;
  kontak: KontakInfo;
  lastModified: LastModified;
}

const defaultData: SchoolData = {
  hero: {
    images: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=400&fit=crop',
    ],
    judul: 'SDN Kalisari 02 Pagi',
    subtitle: 'Mewujudkan Generasi Cerdas, Berkarakter, dan Berprestasi',
  },
  logo: '',
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
  kegiatan: [
    { id: '1', judul: 'Upacara Bendera Hari Senin', tanggal: '2026-04-07', foto: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop', deskripsi: 'Pelaksanaan upacara bendera rutin setiap hari Senin untuk meningkatkan kedisiplinan dan rasa nasionalisme siswa.' },
    { id: '2', judul: 'Lomba Mewarnai Tingkat Kecamatan', tanggal: '2026-03-25', foto: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop', deskripsi: 'Siswa SDN Kalisari 02 Pagi berpartisipasi dalam lomba mewarnai tingkat kecamatan dan meraih juara 2.' },
    { id: '3', judul: 'Peringatan Hari Kartini', tanggal: '2026-04-01', foto: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600&h=400&fit=crop', deskripsi: 'Peringatan Hari Kartini dengan kegiatan fashion show pakaian adat nusantara.' },
    { id: '4', judul: 'Kunjungan ke Museum Nasional', tanggal: '2026-03-15', foto: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=400&fit=crop', deskripsi: 'Kunjungan edukatif ke Museum Nasional untuk siswa kelas 5 dan 6.' },
    { id: '5', judul: 'Pentas Seni Akhir Semester', tanggal: '2026-02-28', foto: 'https://images.unsplash.com/photo-1514533212735-5df27d970db0?w=600&h=400&fit=crop', deskripsi: 'Penampilan tari, musik, dan drama dari seluruh kelas dalam acara pentas seni akhir semester.' },
    { id: '6', judul: 'Senam Pagi Bersama', tanggal: '2026-04-05', foto: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop', deskripsi: 'Kegiatan senam pagi bersama setiap Jumat untuk menjaga kesehatan dan kebugaran siswa.' },
  ],
  ekstrakurikuler: [
    { id: '1', nama: 'Pramuka', foto: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop', deskripsi: 'Kegiatan Pramuka bertujuan membentuk karakter siswa yang mandiri, disiplin, dan bertanggung jawab melalui berbagai kegiatan outdoor dan indoor.', galeri: ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=600&h=400&fit=crop'] },
    { id: '2', nama: 'Pantomim', foto: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop', deskripsi: 'Seni pantomim melatih ekspresi tubuh dan kreativitas siswa dalam bercerita tanpa kata-kata.', galeri: ['https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1547153760-18fc86c0acf7?w=600&h=400&fit=crop'] },
    { id: '3', nama: 'Tari', foto: 'https://images.unsplash.com/photo-1547153760-18fc86c0acf7?w=400&h=300&fit=crop', deskripsi: 'Ekstrakurikuler tari melestarikan budaya Indonesia melalui tarian tradisional dan modern.', galeri: ['https://images.unsplash.com/photo-1547153760-18fc86c0acf7?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop'] },
    { id: '4', nama: 'Qasidah', foto: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop', deskripsi: 'Grup qasidah sekolah yang aktif tampil di berbagai acara keagamaan dan perayaan hari besar Islam.', galeri: ['https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop'] },
    { id: '5', nama: 'Marawis', foto: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', deskripsi: 'Seni musik Marawis sebagai wadah siswa mengekspresikan bakat seni musik islami.', galeri: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop'] },
    { id: '6', nama: 'Menggambar', foto: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop', deskripsi: 'Kegiatan menggambar dan melukis untuk mengembangkan kreativitas serta kemampuan seni rupa siswa.', galeri: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop'] },
  ],
  dokumen: [
    { id: '1', nama: 'Formulir Pendaftaran Siswa Baru 2026', tanggal: '2026-01-15', url: '#' },
    { id: '2', nama: 'Kalender Akademik 2025/2026', tanggal: '2025-07-01', url: '#' },
    { id: '3', nama: 'Tata Tertib Siswa', tanggal: '2025-08-01', url: '#' },
    { id: '4', nama: 'Surat Keterangan Aktif', tanggal: '2026-03-01', url: '#' },
  ],
  profil: {
    sejarah: 'SDN Kalisari 02 Pagi didirikan pada tahun 1985 dan telah menjadi salah satu sekolah dasar unggulan di wilayah Kalisari, Jakarta Timur. Selama lebih dari 40 tahun, sekolah ini telah meluluskan ribuan siswa yang berhasil melanjutkan ke jenjang pendidikan yang lebih tinggi. Dengan fasilitas yang terus diperbarui dan tenaga pendidik yang profesional, SDN Kalisari 02 Pagi berkomitmen untuk memberikan pendidikan terbaik bagi anak-anak Indonesia.',
    visi: 'Mewujudkan peserta didik yang beriman, berakhlak mulia, cerdas, terampil, dan berwawasan lingkungan.',
    misi: [
      'Melaksanakan pembelajaran yang aktif, kreatif, efektif, dan menyenangkan.',
      'Menumbuhkan semangat keunggulan dan budaya berprestasi.',
      'Membiasakan perilaku yang terpuji dan berakhlak mulia.',
      'Menciptakan lingkungan sekolah yang bersih, sehat, dan nyaman.',
      'Mengembangkan potensi siswa melalui kegiatan ekstrakurikuler.',
    ],
    tujuan: 'Menghasilkan lulusan yang berkarakter, berprestasi, dan siap melanjutkan ke jenjang pendidikan yang lebih tinggi serta menjadi warga negara yang bertanggung jawab.',
    fotoSekolah: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop',
  },
  sambutan: {
    nama: 'Ibu Nuroyanah, M.Pd',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
    teks: 'Assalamualaikum Warahmatullahi Wabarakatuh.\n\nSelamat datang di website resmi SDN Kalisari 02 Pagi. Puji syukur kita panjatkan ke hadirat Allah SWT atas segala nikmat dan karunia-Nya.\n\nSDN Kalisari 02 Pagi berkomitmen untuk memberikan pendidikan yang berkualitas dan membentuk generasi penerus bangsa yang beriman, berilmu, dan berakhlak mulia. Kami percaya bahwa setiap anak memiliki potensi yang luar biasa dan tugas kami adalah membantu mereka menemukan dan mengembangkan potensi tersebut.\n\nSemoga website ini dapat menjadi sarana informasi dan komunikasi yang bermanfaat bagi seluruh warga sekolah dan masyarakat.\n\nWassalamualaikum Warahmatullahi Wabarakatuh.',
  },
  kontak: {
    alamat: 'Jl. Kalisari Raya No. 2, Kelurahan Kalisari, Kecamatan Pasar Rebo, Jakarta Timur 13790',
    telepon: '(021) 8401234',
    email: 'kalisari02pagi@gmail.com',
    instagram: 'https://www.instagram.com/sdnegerikalisari02pagi/',
    youtube: 'https://www.youtube.com/@kalisaritimur2027',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.2!2d106.87!3d-6.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjAnUyAxMDbCsDUyJ0U!5e0!3m2!1sen!2sid!4v1234567890',
  },
  lastModified: {},
};

interface SchoolContextType {
  data: SchoolData;
  updateLogo: (logo: string) => void;
  updateHero: (hero: HeroData) => void;
  updatePegawai: (pegawai: Pegawai[]) => void;
  updateKegiatan: (kegiatan: Kegiatan[]) => void;
  updateEkstrakurikuler: (ekskul: Ekstrakurikuler[]) => void;
  updateDokumen: (dokumen: Dokumen[]) => void;
  updateProfil: (profil: ProfilSekolah) => void;
  updateSambutan: (sambutan: Sambutan) => void;
  updateKontak: (kontak: KontakInfo) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

function loadData(): SchoolData {
  try {
    const saved = localStorage.getItem('school-data');
    if (saved) return JSON.parse(saved);
  } catch {}
  return defaultData;
}

export function SchoolProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SchoolData>(loadData);

  useEffect(() => {
    localStorage.setItem('school-data', JSON.stringify(data));
  }, [data]);

  const now = () => new Date().toISOString();
  const updateLogo = (logo: string) => setData(d => ({ ...d, logo, lastModified: { ...d.lastModified, logo: now() } }));
  const updateHero = (hero: HeroData) => setData(d => ({ ...d, hero, lastModified: { ...d.lastModified, hero: now() } }));
  const updatePegawai = (pegawai: Pegawai[]) => setData(d => ({ ...d, pegawai, lastModified: { ...d.lastModified, pegawai: now() } }));
  const updateKegiatan = (kegiatan: Kegiatan[]) => setData(d => ({ ...d, kegiatan, lastModified: { ...d.lastModified, kegiatan: now() } }));
  const updateEkstrakurikuler = (ekstrakurikuler: Ekstrakurikuler[]) => setData(d => ({ ...d, ekstrakurikuler, lastModified: { ...d.lastModified, ekstrakurikuler: now() } }));
  const updateDokumen = (dokumen: Dokumen[]) => setData(d => ({ ...d, dokumen, lastModified: { ...d.lastModified, dokumen: now() } }));
  const updateProfil = (profil: ProfilSekolah) => setData(d => ({ ...d, profil, lastModified: { ...d.lastModified, profil: now() } }));
  const updateSambutan = (sambutan: Sambutan) => setData(d => ({ ...d, sambutan, lastModified: { ...d.lastModified, sambutan: now() } }));
  const updateKontak = (kontak: KontakInfo) => setData(d => ({ ...d, kontak, lastModified: { ...d.lastModified, kontak: now() } }));

  return (
    <SchoolContext.Provider value={{ data, updateLogo, updateHero, updatePegawai, updateKegiatan, updateEkstrakurikuler, updateDokumen, updateProfil, updateSambutan, updateKontak }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const ctx = useContext(SchoolContext);
  if (!ctx) throw new Error('useSchool must be used within SchoolProvider');
  return ctx;
}
