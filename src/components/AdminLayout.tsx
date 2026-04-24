import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';
import { LayoutDashboard, Users, Calendar, Star, FileText, School, MessageSquare, Phone, LogOut, GraduationCap, ImageIcon, LayoutTemplate, Award, UserCog, Shield, Trophy } from 'lucide-react';
import { useSchool } from '@/contexts/SchoolContext';

const menuItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Logo', url: '/admin/logo', icon: ImageIcon },
  { title: 'Hero', url: '/admin/hero', icon: ImageIcon },
  { title: 'Keunggulan', url: '/admin/keunggulan', icon: Award },
  { title: 'Pegawai', url: '/admin/pegawai', icon: Users },
  { title: 'Siswa', url: '/admin/siswa', icon: UserCog },
  { title: 'Berita', url: '/admin/berita', icon: Calendar },
  { title: 'Prestasi', url: '/admin/prestasi', icon: Trophy },
  { title: 'Ekstrakurikuler', url: '/admin/ekstrakurikuler', icon: Star },
  { title: 'Dokumen', url: '/admin/dokumen', icon: FileText },
  { title: 'Profil Sekolah', url: '/admin/profil', icon: School },
  { title: 'Sambutan', url: '/admin/sambutan', icon: MessageSquare },
  { title: 'Kontak', url: '/admin/kontak', icon: Phone },
  { title: 'Footer', url: '/admin/footer', icon: LayoutTemplate },
  { title: 'Akun Admin', url: '/admin/akun', icon: Shield },
];

function AdminSidebar() {
  const { logout } = useAuth();
  const { data } = useSchool();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4 flex items-center gap-2 border-b border-sidebar-border">
          {data.logo ? (
            <img src={data.logo} alt="Logo" className="w-8 h-8 rounded-full object-cover shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
          )}
          <span className="font-bold text-sm text-sidebar-foreground truncate">Admin Panel</span>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === '/admin'} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button onClick={logout} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-sidebar-accent/50 rounded-md">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function AdminLayout() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center border-b bg-background px-4">
            <SidebarTrigger />
            <span className="ml-4 font-semibold text-foreground text-sm">SDN Kalisari 02 Pagi - Admin</span>
          </header>
          <main className="flex-1 p-6 bg-muted/30">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
