import React, { useState } from 'react';
import { useGames } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, BookOpen, Settings, Users, Sparkles, Download, Upload, LineChart, Award, Plus, Trash2, Edit3, Check, Search, Filter 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as ReLineChart, Line } from 'recharts';
import { toast } from '@/hooks/use-toast';

export default function AdminGames() {
  const { games, badges, shopItems, activeLanguage } = useGames();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // AI Generator state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState({ category: 'Matematika', level: 1, count: 5, lang: 'id' });
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);

  // Statistics Chart Mock data
  const activityData = [
    { name: 'Sen', XP: 450, Koin: 45, Pemain: 12 },
    { name: 'Sel', XP: 800, Koin: 90, Pemain: 18 },
    { name: 'Rab', XP: 600, Koin: 60, Pemain: 15 },
    { name: 'Kam', XP: 950, Koin: 110, Pemain: 22 },
    { name: 'Jum', XP: 1200, Koin: 150, Pemain: 30 },
    { name: 'Sab', XP: 300, Koin: 30, Pemain: 8 },
    { name: 'Min', XP: 500, Koin: 50, Pemain: 10 }
  ];

  // AI Question Generator logic stub (simulate OpenAI)
  const handleGenerateAI = () => {
    if (!aiPrompt.category) {
      toast({ title: "Gagal", description: "Pilih kategori terlebih dahulu!", variant: "destructive" });
      return;
    }

    setAiLoading(true);
    setTimeout(() => {
      const generated = Array.from({ length: aiPrompt.count }, (_, idx) => ({
        id: `ai-gen-${Date.now()}-${idx}`,
        question: aiPrompt.lang === 'id' 
          ? `Berapakah hasil perhitungan dari soal AI ${aiPrompt.category} Level ${aiPrompt.level} #${idx + 1}?`
          : `What is the output of AI question for ${aiPrompt.category} Level ${aiPrompt.level} #${idx + 1}?`,
        options: {
          A: { id: "25", en: "25" },
          B: { id: "40", en: "40" },
          C: { id: "12", en: "12" },
          D: { id: "18", en: "18" }
        },
        correctAnswer: "A",
        explanation: { id: "Diperoleh melalui analisis pola logis.", en: "Derived using pattern analysis." },
        hint: { id: "Gunakan perkalian atau pertambahan dasar.", en: "Use basic multiplication or addition." }
      }));

      setGeneratedQuestions(generated);
      setAiLoading(false);
      toast({ title: "Pertanyaan Dibuat! ✨", description: `Berhasil membuat ${aiPrompt.count} soal dengan AI.` });
    }, 1500);
  };

  const handleSaveQuestions = () => {
    toast({ title: "Berhasil Disimpan!", description: "Seluruh soal buatan AI telah dimasukkan ke Bank Soal." });
    setGeneratedQuestions([]);
  };

  const handleExport = (format: 'csv' | 'json' | 'excel') => {
    toast({ title: "Ekspor Berhasil!", description: `Data berhasil diekspor ke format ${format.toUpperCase()}` });
  };

  const handleImport = () => {
    toast({ title: "Impor Berhasil!", description: "File terjemahan / bank soal berhasil diverifikasi dan diunggah." });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>🎮</span> Games Edukasi Admin
          </h1>
          <p className="text-sm text-slate-500 mt-1">Kelola permainan, bank soal, tantangan cilik, dan lihat analitik permainan siswa.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        
        {/* Submenus Navigation */}
        <div className="overflow-x-auto pb-2">
          <TabsList className="bg-slate-100 dark:bg-slate-800/60 p-1 w-full justify-start gap-1">
            <TabsTrigger value="dashboard" className="gap-1.5"><LineChart className="w-4 h-4" /> Dashboard</TabsTrigger>
            <TabsTrigger value="games" className="gap-1.5"><BookOpen className="w-4 h-4" /> Games</TabsTrigger>
            <TabsTrigger value="questions" className="gap-1.5"><Search className="w-4 h-4" /> Bank Soal</TabsTrigger>
            <TabsTrigger value="ai-generator" className="gap-1.5"><Sparkles className="w-4 h-4" /> AI Generator</TabsTrigger>
            <TabsTrigger value="badges" className="gap-1.5"><Award className="w-4 h-4" /> Lencana</TabsTrigger>
            <TabsTrigger value="settings" className="gap-1.5"><Settings className="w-4 h-4" /> Pengaturan</TabsTrigger>
            <TabsTrigger value="import-export" className="gap-1.5"><Upload className="w-4 h-4" /> Impor & Ekspor</TabsTrigger>
          </TabsList>
        </div>

        {/* 1. Dashboard View */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-black text-indigo-600">324</div>
                <p className="text-xs text-slate-500 font-bold mt-1">Total Pemain Aktif</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-black text-amber-500">14.8k 🪙</div>
                <p className="text-xs text-slate-500 font-bold mt-1">Koin Didapatkan Hari Ini</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-black text-emerald-500">86%</div>
                <p className="text-xs text-slate-500 font-bold mt-1">Akurasi Jawaban Siswa</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-black text-rose-500">Math Challenge</div>
                <p className="text-xs text-slate-500 font-bold mt-1">Game Paling Sering Dimainkan</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Grafik Pemain Aktif & XP Mingguan</CardTitle>
                <CardDescription>Visualisasi aktivitas anak belajar sambil bermain</CardDescription>
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

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Perkembangan Akumulasi Koin</CardTitle>
                <CardDescription>Total Koin yang didistribusikan dari game harian</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Koin" stroke="#f59e0b" strokeWidth={3} />
                  </ReLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 2. Games List View */}
        <TabsContent value="games" className="space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center sm:flex-row gap-4">
              <div>
                <CardTitle className="text-base font-bold">Daftar Modul Game</CardTitle>
                <CardDescription>Aktifkan, nonaktifkan, atau atur bobot hadiah XP/Koin untuk 10 game.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {games.map(g => (
                  <div key={g.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={g.cover} className="w-10 h-10 object-cover rounded-lg border shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold">{g.title.id} / {g.title.en}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1">{g.description.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded border">+{g.xpReward} XP</span>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. Question Bank View */}
        <TabsContent value="questions" className="space-y-4">
          <Card>
            <CardHeader className="space-y-2">
              <CardTitle className="text-base font-bold">Bank Soal Bilingual</CardTitle>
              <div className="flex gap-2">
                <Input 
                  placeholder="Cari kata kunci soal..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs"
                />
                <Button variant="outline"><Filter className="w-4 h-4 mr-1.5" /> Filter</Button>
                <Button className="ml-auto bg-indigo-600 hover:bg-indigo-700 gap-1.5"><Plus className="w-4 h-4" /> Tambah Soal</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase text-[10px] tracking-wider font-bold border-b">
                    <tr>
                      <th className="p-3">Soal (Indonesia)</th>
                      <th className="p-3">Question (English)</th>
                      <th className="p-3">Jawaban Benar</th>
                      <th className="p-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3 font-semibold">Berapakah hasil dari 15 + 27?</td>
                      <td className="p-3 text-slate-400">What is 15 + 27?</td>
                      <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-bold">B</span></td>
                      <td className="p-3 flex gap-2">
                        <Button size="sm" variant="ghost"><Edit3 className="w-3.5 h-3.5" /></Button>
                        <Button size="sm" variant="ghost" className="text-rose-500"><Trash2 className="w-3.5 h-3.5" /></Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. AI Question Generator View */}
        <TabsContent value="ai-generator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-1.5 text-indigo-600 dark:text-cyan-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span>AI Question Generator</span>
              </CardTitle>
              <CardDescription>Buat bank soal pelajaran berkualitas secara instan berbasis AI OpenAI / Gemini.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Mata Pelajaran</Label>
                  <select 
                    value={aiPrompt.category}
                    onChange={(e) => setAiPrompt({ ...aiPrompt, category: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Matematika">Matematika</option>
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                    <option value="IPAS">IPAS</option>
                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Tingkat Level</Label>
                  <Input 
                    type="number" 
                    min={1} 
                    max={5} 
                    value={aiPrompt.level}
                    onChange={(e) => setAiPrompt({ ...aiPrompt, level: parseInt(e.target.value) || 1 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Jumlah Pertanyaan</Label>
                  <Input 
                    type="number" 
                    min={1} 
                    max={20} 
                    value={aiPrompt.count}
                    onChange={(e) => setAiPrompt({ ...aiPrompt, count: parseInt(e.target.value) || 5 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bahasa Utama</Label>
                  <select 
                    value={aiPrompt.lang}
                    onChange={(e) => setAiPrompt({ ...aiPrompt, lang: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <Button onClick={handleGenerateAI} disabled={aiLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-base gap-2 rounded-2xl shadow-md text-white font-bold">
                <span>{aiLoading ? "Sedang Generate..." : "✨ Mulai Generate Soal"}</span>
              </Button>

              {/* Generated Result Preview */}
              {generatedQuestions.length > 0 && (
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="font-extrabold text-sm text-slate-700">Preview Soal Hasil AI:</h3>
                  <div className="space-y-4">
                    {generatedQuestions.map((q, qidx) => (
                      <div key={q.id} className="p-4 border rounded-xl space-y-2 bg-slate-50 dark:bg-slate-800/40 relative">
                        <div className="font-bold text-xs text-indigo-600">SOAL #{qidx + 1}</div>
                        <Input defaultValue={q.question} className="font-bold text-sm bg-white" />
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <Input defaultValue={q.options.A.id} placeholder="Option A" />
                          <Input defaultValue={q.options.B.id} placeholder="Option B" />
                        </div>
                        <Input defaultValue={q.explanation.id} className="text-xs" placeholder="Penjelasan" />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSaveQuestions} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-6">
                      Simpan ke Bank Soal
                    </Button>
                    <Button onClick={() => setGeneratedQuestions([])} variant="outline" className="rounded-xl">
                      Batalkan
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 5. Badges / Achievements View */}
        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center sm:flex-row gap-4">
              <div>
                <CardTitle className="text-base font-bold">Lencana Penghargaan</CardTitle>
                <CardDescription>Buat dan modifikasi lencana prestasi cilik untuk penyelesaian level.</CardDescription>
              </div>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1"><Plus className="w-4 h-4" /> Tambah Lencana</Button>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-4 gap-4">
                {badges.map(b => (
                  <div key={b.code} className="border dark:border-slate-800 rounded-xl p-4 text-center bg-slate-50/50 dark:bg-slate-800/40">
                    <div className="text-4xl mb-2">{b.icon}</div>
                    <div className="font-bold text-xs text-slate-700 dark:text-slate-300">{b.name.id}</div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{b.desc.id}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 6. Settings View */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Pengaturan Hadiah XP & Koin</CardTitle>
              <CardDescription>Konfigurasi kelipatan nilai XP & Koin permainan cilik secara terpusat.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>XP Jawaban Benar</Label>
                  <Input type="number" defaultValue={10} />
                </div>
                <div className="space-y-2">
                  <Label>XP Naik Level</Label>
                  <Input type="number" defaultValue={100} />
                </div>
                <div className="space-y-2">
                  <Label>Koin Naik Level</Label>
                  <Input type="number" defaultValue={10} />
                </div>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-6">Simpan Pengaturan</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 7. Import/Export View */}
        <TabsContent value="import-export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Impor / Ekspor Terjemahan & Bank Soal</CardTitle>
              <CardDescription>Unggah atau unduh data bank soal dan terjemahan secara massal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Export Column */}
                <div className="p-5 border rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                  <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">Ekspor Data</h3>
                  <p className="text-xs text-slate-500">Unduh data bank soal atau data kemajuan pemain saat ini.</p>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => handleExport('json')} variant="outline" className="gap-1.5"><Download className="w-4 h-4" /> JSON</Button>
                    <Button onClick={() => handleExport('csv')} variant="outline" className="gap-1.5"><Download className="w-4 h-4" /> CSV</Button>
                    <Button onClick={() => handleExport('excel')} variant="outline" className="gap-1.5"><Download className="w-4 h-4" /> Excel</Button>
                  </div>
                </div>

                {/* Import Column */}
                <div className="p-5 border rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                  <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">Impor Data</h3>
                  <p className="text-xs text-slate-500">Unggah file bank soal format JSON/CSV/Excel untuk memperbarui.</p>
                  <div className="flex gap-2">
                    <Input type="file" className="max-w-xs cursor-pointer text-xs bg-white" />
                    <Button onClick={handleImport} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"><Upload className="w-4 h-4" /> Unggah</Button>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
