import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Pegawai {
  id: string;
  nama: string;
  jabatan: string;
  foto: string;
}

export interface Kegiatan {
  id: string;
  judul: string;
  tanggal: string;
  foto: string;
  deskripsi: string;
}

export interface Ekstrakurikuler {
  id: string;
  nama: string;
  foto: string;
  deskripsi: string;
  galeri: string[];
}

export interface Dokumen {
  id: string;
  nama: string;
  tanggal: string;
  url: string;
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

export interface SchoolData {
  pegawai: Pegawai[];
  kegiatan: Kegiatan[];
  ekstrakurikuler: Ekstrakurikuler[];
  dokumen: Dokumen[];
  profil: ProfilSekolah;
  sambutan: Sambutan;
  kontak: KontakInfo;
}

const defaultData: SchoolData = {
  pegawai: [
    { id: '1', nama: 'Nuroyanah, M.Pd', jabatan: 'Kepala Sekolah', foto: 'https://ui-avatars.com/api/?name=Nuroyanah&background=2563EB&color=fff&size=200' },
    { id: '2', nama: 'Siti Aminah, S.Pd', jabatan: 'Guru Kelas 1', foto: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=F59E0B&color=fff&size=200' },
    { id: '3', nama: 'Ahmad Fauzi, S.Pd', jabatan: 'Guru Kelas 2', foto: 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=2563EB&color=fff&size=200' },
    { id: '4', nama: 'Dewi Lestari, S.Pd', jabatan: 'Guru Kelas 3', foto: 'https://ui-avatars.com/api/?name=Dewi+Lestari&background=F59E0B&color=fff&size=200' },
    { id: '5', nama: 'Budi Santoso, S.Pd', jabatan: 'Guru Kelas 4', foto: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=2563EB&color=fff&size=200' },
    { id: '6', nama: 'Rina Wati, S.Pd', jabatan: 'Guru Kelas 5', foto: 'https://ui-avatars.com/api/?name=Rina+Wati&background=F59E0B&color=fff&size=200' },
    { id: '7', nama: 'Joko Prasetyo, S.Pd', jabatan: 'Guru Kelas 6', foto: 'https://ui-avatars.com/api/?name=Joko+Prasetyo&background=2563EB&color=fff&size=200' },
    { id: '8', nama: 'Sri Mulyani', jabatan: 'Tata Usaha', foto: 'https://ui-avatars.com/api/?name=Sri+Mulyani&background=F59E0B&color=fff&size=200' },
    { id: '9', nama: 'Hendra Gunawan', jabatan: 'Penjaga Sekolah', foto: 'https://ui-avatars.com/api/?name=Hendra+G&background=2563EB&color=fff&size=200' },
    { id: '10', nama: 'Fatimah, S.Pd', jabatan: 'Guru Agama', foto: 'https://ui-avatars.com/api/?name=Fatimah&background=F59E0B&color=fff&size=200' },
  ],
  kegiatan: [
    { id: '1', judul: 'Upacara Bendera Hari Senin', tanggal: '2026-04-07', foto: 'https://placehold.co/600x400/2563EB/white?text=Upacara', deskripsi: 'Pelaksanaan upacara bendera rutin setiap hari Senin untuk meningkatkan kedisiplinan dan rasa nasionalisme siswa.' },
    { id: '2', judul: 'Lomba Mewarnai Tingkat Kecamatan', tanggal: '2026-03-25', foto: 'https://placehold.co/600x400/F59E0B/white?text=Lomba+Mewarnai', deskripsi: 'Siswa SDN Kalisari 02 Pagi berpartisipasi dalam lomba mewarnai tingkat kecamatan dan meraih juara 2.' },
    { id: '3', judul: 'Peringatan Hari Kartini', tanggal: '2026-04-01', foto: 'https://placehold.co/600x400/2563EB/white?text=Hari+Kartini', deskripsi: 'Peringatan Hari Kartini dengan kegiatan fashion show pakaian adat nusantara.' },
    { id: '4', judul: 'Kunjungan ke Museum Nasional', tanggal: '2026-03-15', foto: 'https://placehold.co/600x400/F59E0B/white?text=Kunjungan+Museum', deskripsi: 'Kunjungan edukatif ke Museum Nasional untuk siswa kelas 5 dan 6.' },
    { id: '5', judul: 'Pentas Seni Akhir Semester', tanggal: '2026-02-28', foto: 'https://placehold.co/600x400/2563EB/white?text=Pentas+Seni', deskripsi: 'Penampilan tari, musik, dan drama dari seluruh kelas dalam acara pentas seni akhir semester.' },
    { id: '6', judul: 'Senam Pagi Bersama', tanggal: '2026-04-05', foto: 'https://placehold.co/600x400/F59E0B/white?text=Senam+Pagi', deskripsi: 'Kegiatan senam pagi bersama setiap Jumat untuk menjaga kesehatan dan kebugaran siswa.' },
  ],
  ekstrakurikuler: [
    { id: '1', nama: 'Pramuka', foto: 'https://placehold.co/400x300/2563EB/white?text=Pramuka', deskripsi: 'Kegiatan Pramuka bertujuan membentuk karakter siswa yang mandiri, disiplin, dan bertanggung jawab melalui berbagai kegiatan outdoor dan indoor.', galeri: ['https://placehold.co/600x400/2563EB/white?text=Pramuka+1', 'https://placehold.co/600x400/1D4ED8/white?text=Pramuka+2', 'https://placehold.co/600x400/3B82F6/white?text=Pramuka+3'] },
    { id: '2', nama: 'Pantomim', foto: 'https://placehold.co/400x300/F59E0B/white?text=Pantomim', deskripsi: 'Seni pantomim melatih ekspresi tubuh dan kreativitas siswa dalam bercerita tanpa kata-kata.', galeri: ['https://placehold.co/600x400/F59E0B/white?text=Pantomim+1', 'https://placehold.co/600x400/D97706/white?text=Pantomim+2'] },
    { id: '3', nama: 'Tari', foto: 'https://placehold.co/400x300/2563EB/white?text=Tari', deskripsi: 'Ekstrakurikuler tari melestarikan budaya Indonesia melalui tarian tradisional dan modern.', galeri: ['https://placehold.co/600x400/2563EB/white?text=Tari+1', 'https://placehold.co/600x400/1D4ED8/white?text=Tari+2'] },
    { id: '4', nama: 'Qasidah', foto: 'https://placehold.co/400x300/F59E0B/white?text=Qasidah', deskripsi: 'Grup qasidah sekolah yang aktif tampil di berbagai acara keagamaan dan perayaan hari besar Islam.', galeri: ['https://placehold.co/600x400/F59E0B/white?text=Qasidah+1', 'https://placehold.co/600x400/D97706/white?text=Qasidah+2'] },
    { id: '5', nama: 'Marawis', foto: 'https://placehold.co/400x300/2563EB/white?text=Marawis', deskripsi: 'Seni musik Marawis sebagai wadah siswa mengekspresikan bakat seni musik islami.', galeri: ['https://placehold.co/600x400/2563EB/white?text=Marawis+1', 'https://placehold.co/600x400/1D4ED8/white?text=Marawis+2'] },
    { id: '6', nama: 'Menggambar', foto: 'https://placehold.co/400x300/F59E0B/white?text=Menggambar', deskripsi: 'Kegiatan menggambar dan melukis untuk mengembangkan kreativitas serta kemampuan seni rupa siswa.', galeri: ['https://placehold.co/600x400/F59E0B/white?text=Menggambar+1', 'https://placehold.co/600x400/D97706/white?text=Menggambar+2'] },
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
    fotoSekolah: 'https://placehold.co/800x400/2563EB/white?text=SDN+Kalisari+02+Pagi',
  },
  sambutan: {
    nama: 'Ibu Nuroyanah, M.Pd',
    foto: 'https://ui-avatars.com/api/?name=Nuroyanah&background=2563EB&color=fff&size=200&rounded=true',
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
};

interface SchoolContextType {
  data: SchoolData;
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

  const updatePegawai = (pegawai: Pegawai[]) => setData(d => ({ ...d, pegawai }));
  const updateKegiatan = (kegiatan: Kegiatan[]) => setData(d => ({ ...d, kegiatan }));
  const updateEkstrakurikuler = (ekstrakurikuler: Ekstrakurikuler[]) => setData(d => ({ ...d, ekstrakurikuler }));
  const updateDokumen = (dokumen: Dokumen[]) => setData(d => ({ ...d, dokumen }));
  const updateProfil = (profil: ProfilSekolah) => setData(d => ({ ...d, profil }));
  const updateSambutan = (sambutan: Sambutan) => setData(d => ({ ...d, sambutan }));
  const updateKontak = (kontak: KontakInfo) => setData(d => ({ ...d, kontak }));

  return (
    <SchoolContext.Provider value={{ data, updatePegawai, updateKegiatan, updateEkstrakurikuler, updateDokumen, updateProfil, updateSambutan, updateKontak }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const ctx = useContext(SchoolContext);
  if (!ctx) throw new Error('useSchool must be used within SchoolProvider');
  return ctx;
}
