import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SchoolProvider } from "@/contexts/SchoolContext";
import { AuthProvider } from "@/contexts/AuthContext";

import PublicLayout from "@/components/PublicLayout";
import AdminLayout from "@/components/AdminLayout";

import Index from "./pages/Index";
import Profil from "./pages/Profil";
import KegiatanPage from "./pages/KegiatanPage";
import EkstrakurikulerPage from "./pages/EkstrakurikulerPage";
import EkstrakurikulerDetail from "./pages/EkstrakurikulerDetail";
import Layanan from "./pages/Layanan";
import Kontak from "./pages/Kontak";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPegawai from "./pages/admin/AdminPegawai";
import AdminKegiatan from "./pages/admin/AdminKegiatan";
import AdminEkskul from "./pages/admin/AdminEkskul";
import AdminDokumen from "./pages/admin/AdminDokumen";
import AdminProfil from "./pages/admin/AdminProfil";
import AdminSambutan from "./pages/admin/AdminSambutan";
import AdminKontak from "./pages/admin/AdminKontak";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <SchoolProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/kegiatan" element={<KegiatanPage />} />
                <Route path="/ekstrakurikuler" element={<EkstrakurikulerPage />} />
                <Route path="/ekstrakurikuler/:id" element={<EkstrakurikulerDetail />} />
                <Route path="/layanan" element={<Layanan />} />
                <Route path="/kontak" element={<Kontak />} />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="pegawai" element={<AdminPegawai />} />
                <Route path="kegiatan" element={<AdminKegiatan />} />
                <Route path="ekstrakurikuler" element={<AdminEkskul />} />
                <Route path="dokumen" element={<AdminDokumen />} />
                <Route path="profil" element={<AdminProfil />} />
                <Route path="sambutan" element={<AdminSambutan />} />
                <Route path="kontak" element={<AdminKontak />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SchoolProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
