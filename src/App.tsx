import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SchoolProvider } from "@/contexts/SchoolContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

import PublicLayout from "@/components/PublicLayout";
import AdminLayout from "@/components/AdminLayout";

import Index from "./pages/Index";
import Profil from "./pages/Profil";
import { BeritaPage, BeritaDetail, PrestasiPage, PrestasiDetail } from "./pages/ContentPages";
import EkstrakurikulerPage from "./pages/EkstrakurikulerPage";
import EkstrakurikulerDetail from "./pages/EkstrakurikulerDetail";
import Layanan from "./pages/Layanan";
import Kontak from "./pages/Kontak";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPegawai from "./pages/admin/AdminPegawai";
import AdminBerita from "./pages/admin/AdminBerita";
import AdminPrestasi from "./pages/admin/AdminPrestasi";
import AdminEkskul from "./pages/admin/AdminEkskul";
import AdminDokumen from "./pages/admin/AdminDokumen";
import AdminProfil from "./pages/admin/AdminProfil";
import AdminSambutan from "./pages/admin/AdminSambutan";
import AdminKontak from "./pages/admin/AdminKontak";
import AdminLogo from "./pages/admin/AdminLogo";
import AdminHero from "./pages/admin/AdminHero";
import AdminKeunggulan from "./pages/admin/AdminKeunggulan";
import AdminFooter from "./pages/admin/AdminFooter";
import AdminSiswa from "./pages/admin/AdminSiswa";
import AdminAkun from "./pages/admin/AdminAkun";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
      <AuthProvider>
        <SchoolProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/berita" element={<BeritaPage />} />
                <Route path="/berita/:id" element={<BeritaDetail />} />
                <Route path="/prestasi" element={<PrestasiPage />} />
                <Route path="/prestasi/:id" element={<PrestasiDetail />} />
                <Route path="/kegiatan" element={<Navigate to="/berita" replace />} />
                <Route path="/ekstrakurikuler" element={<EkstrakurikulerPage />} />
                <Route path="/ekstrakurikuler/:id" element={<EkstrakurikulerDetail />} />
                <Route path="/dokumen" element={<Layanan />} />
                <Route path="/layanan" element={<Navigate to="/dokumen" replace />} />
                <Route path="/kontak" element={<Kontak />} />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="logo" element={<AdminLogo />} />
                <Route path="hero" element={<AdminHero />} />
                <Route path="keunggulan" element={<AdminKeunggulan />} />
                <Route path="pegawai" element={<AdminPegawai />} />
                <Route path="siswa" element={<AdminSiswa />} />
                <Route path="berita" element={<AdminBerita />} />
                <Route path="prestasi" element={<AdminPrestasi />} />
                <Route path="kegiatan" element={<Navigate to="/admin/berita" replace />} />
                <Route path="ekstrakurikuler" element={<AdminEkskul />} />
                <Route path="dokumen" element={<AdminDokumen />} />
                <Route path="profil" element={<AdminProfil />} />
                <Route path="sambutan" element={<AdminSambutan />} />
                <Route path="kontak" element={<AdminKontak />} />
                <Route path="footer" element={<AdminFooter />} />
                <Route path="akun" element={<AdminAkun />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SchoolProvider>
      </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
