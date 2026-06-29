import React, { useState } from 'react';
import { useGames } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, LineChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminGames() {
  const { games, activeLanguage } = useGames();
  const [activeTab, setActiveTab] = useState('dashboard');

  const t = (idText: string, enText: string) => {
    return activeLanguage === 'id' ? idText : enText;
  };

  // Statistics Chart Mock data
  const activityData = [
    { name: 'Sen', Pemain: 12 },
    { name: 'Sel', Pemain: 18 },
    { name: 'Rab', Pemain: 15 },
    { name: 'Kam', Pemain: 22 },
    { name: 'Jum', Pemain: 30 },
    { name: 'Sab', Pemain: 8 },
    { name: 'Min', Pemain: 10 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>🎮</span> Games Edukasi Admin
          </h1>
          <p className="text-sm text-slate-500 mt-1">Lihat statistik aktivitas bermain dan daftar modul game edukasi siswa.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        
        {/* Simplified Submenus Navigation */}
        <div className="overflow-x-auto pb-2">
          <TabsList className="bg-slate-100 dark:bg-slate-800/60 p-1 max-w-md justify-start gap-1">
            <TabsTrigger value="dashboard" className="gap-1.5"><LineChart className="w-4 h-4" /> Dashboard</TabsTrigger>
            <TabsTrigger value="games" className="gap-1.5"><BookOpen className="w-4 h-4" /> Daftar Games</TabsTrigger>
          </TabsList>
        </div>

        {/* 1. Dashboard View */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-black text-indigo-600">324</div>
                <p className="text-xs text-slate-500 font-bold mt-1">Total Pemain Aktif</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-black text-emerald-500">86%</div>
                <p className="text-xs text-slate-500 font-bold mt-1">Akurasi Jawaban Rata-rata</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-black text-rose-500">Math Challenge</div>
                <p className="text-xs text-slate-500 font-bold mt-1">Game Paling Sering Dimainkan</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold">Grafik Pemain Aktif Mingguan</CardTitle>
              <CardDescription>Aktivitas belajar sambil bermain siswa sepanjang minggu</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Pemain" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. Games List View */}
        <TabsContent value="games" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Daftar Modul Game</CardTitle>
              <CardDescription>Daftar lengkap 10 modul game pembelajaran aktif di website sekolah.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {games.map(g => (
                  <div key={g.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={g.cover} className="w-12 h-12 object-cover rounded-lg border shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold">{g.title.id} / {g.title.en}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1">{g.description.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">{g.totalLevels} Levels</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
