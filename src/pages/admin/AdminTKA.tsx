import { useState, useEffect, useRef } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, FileSpreadsheet, Download, Power } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

interface TKAData {
  id: string;
  nisn: string;
  nama_peserta: string;
  tanggal_lahir: string;
  matematika: string;
  bahasa_indonesia: string;
  created_at?: string;
}

export default function AdminTKA() {
  const { data, updateProfil } = useSchool();
  const [dataTKA, setDataTKA] = useState<TKAData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<TKAData | null>(null);
  
  const [form, setForm] = useState({
    nisn: '',
    nama_peserta: '',
    tanggal_lahir: '',
    matematika: '',
    bahasa_indonesia: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchTKA = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('hasil_tka')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setDataTKA(data || []);
    } catch (err: any) {
      toast({ title: 'Gagal Memuat Data', description: err.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTka = async () => {
    try {
      const newState = !data.profil.tkaActive;
      await updateProfil({ ...data.profil, tkaActive: newState });
      toast({ title: 'Berhasil', description: `Pengumuman TKA sekarang ${newState ? 'AKTIF' : 'NONAKTIF'}` });
    } catch (err: any) {
      toast({ variant: 'destructive', description: 'Gagal mengubah status: ' + err.message });
    }
  };

  useEffect(() => {
    fetchTKA();
  }, []);

  const openAdd = () => { 
    setEditItem(null); 
    setForm({ nisn: '', nama_peserta: '', tanggal_lahir: '', matematika: '', bahasa_indonesia: '' }); 
    setDialogOpen(true); 
  };
  
  const openEdit = (tka: TKAData) => { 
    setEditItem(tka); 
    setForm({
      nisn: tka.nisn || '',
      nama_peserta: tka.nama_peserta || '',
      tanggal_lahir: tka.tanggal_lahir || '',
      matematika: tka.matematika || '',
      bahasa_indonesia: tka.bahasa_indonesia || ''
    }); 
    setDialogOpen(true); 
  };

  const handleSave = async () => {
    if (!form.nisn.trim() || !form.nama_peserta.trim() || !form.tanggal_lahir.trim()) {
      toast({ title: 'Gagal', description: 'NISN, Nama Peserta, dan Tanggal Lahir wajib diisi', variant: 'destructive' });
      return;
    }
    
    setIsSaving(true);
    try {
      if (editItem) {
        const { error } = await supabase
          .from('hasil_tka')
          .update({ ...form })
          .eq('id', editItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('hasil_tka')
          .insert([{ ...form }]);
        if (error) throw error;
      }
      
      setDialogOpen(false);
      toast({ title: 'Berhasil', description: 'Data TKA berhasil disimpan.' });
      fetchTKA();
    } catch (err: any) {
      toast({ title: 'Gagal', description: err.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => { 
    if (confirm('Yakin ingin menghapus data TKA siswa ini?')) {
      try {
        const { error } = await supabase.from('hasil_tka').delete().eq('id', id);
        if (error) throw error;
        toast({ title: 'Berhasil', description: 'Data TKA dihapus' });
        fetchTKA();
      } catch (err: any) {
        toast({ title: 'Gagal', description: err.message, variant: 'destructive' });
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast({ title: 'Memproses...', description: 'Membaca file spreadsheet...' });
    
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        
        const formattedData = data.map((row: any) => ({
          nisn: String(row['NISN'] || row['nisn'] || ''),
          nama_peserta: String(row['Nama Peserta'] || row['nama_peserta'] || row['nama'] || ''),
          tanggal_lahir: String(row['Tanggal Lahir'] || row['tanggal_lahir'] || ''),
          matematika: String(row['Matematika'] || row['matematika'] || '').replace(/\n/g, ' ').trim(),
          bahasa_indonesia: String(row['Bahasa Indonesia'] || row['bahasa_indonesia'] || '').replace(/\n/g, ' ').trim()
        })).filter(row => row.nisn && row.nama_peserta); // Only import valid rows

        if (formattedData.length === 0) {
          throw new Error("Tidak ada data valid yang ditemukan. Pastikan kolom-kolomnya sesuai.");
        }

        const { error } = await supabase
          .from('hasil_tka')
          .upsert(formattedData, { onConflict: 'nisn' });

        if (error) throw error;
        
        toast({ title: 'Berhasil', description: `Berhasil mengimpor ${formattedData.length} data ke Supabase!` });
        fetchTKA();
      } catch (err: any) {
        toast({ title: 'Gagal Import', description: err.message, variant: 'destructive' });
      }
      
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    
    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([
      { 'NISN': '0135315764', 'Nama Peserta': 'Budi Santoso', 'Tanggal Lahir': '11 Juni 2013', 'Matematika': '85', 'Bahasa Indonesia': '90' }
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template_TKA");
    XLSX.writeFile(wb, "Template_Import_TKA.xlsx");
  };

  return (
    <div className="max-w-6xl w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kelola Hasil TKA</h1>
          <p className="text-muted-foreground text-sm mt-1 mb-3">Data ini ditampilkan pada halaman pencarian pengumuman Hasil TKA.</p>
          <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-md inline-flex border">
            <Switch id="tka-active" checked={data.profil.tkaActive} onCheckedChange={toggleTka} />
            <Label htmlFor="tka-active" className="cursor-pointer font-medium flex items-center gap-2">
              <Power className={`w-4 h-4 ${data.profil.tkaActive ? 'text-green-500' : 'text-muted-foreground'}`} />
              {data.profil.tkaActive ? 'Pengumuman Aktif (ON)' : 'Pengumuman Ditutup (OFF)'}
            </Label>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
            className="hidden" 
          />
          <Button variant="outline" onClick={downloadTemplate} className="gap-2">
            <Download className="w-4 h-4" /> Template Excel
          </Button>
          <Button variant="secondary" onClick={() => fileInputRef.current?.click()} className="gap-2 bg-green-600/10 text-green-700 hover:bg-green-600/20 border border-green-600/20">
            <FileSpreadsheet className="w-4 h-4" /> Import Excel/CSV
          </Button>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAdd} className="gap-2">
                <Plus className="w-4 h-4" /> Tambah Manual
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editItem ? 'Edit' : 'Tambah'} Hasil TKA</DialogTitle></DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label>NISN</Label>
                  <Input value={form.nisn} onChange={e => setForm(f => ({ ...f, nisn: e.target.value.replace(/\D/g, '') }))} placeholder="Contoh: 0135315764" />
                </div>
                <div>
                  <Label>Nama Peserta</Label>
                  <Input value={form.nama_peserta} onChange={e => setForm(f => ({ ...f, nama_peserta: e.target.value }))} placeholder="Nama lengkap siswa" />
                </div>
                <div>
                  <Label>Tanggal Lahir</Label>
                  <Input value={form.tanggal_lahir} onChange={e => setForm(f => ({ ...f, tanggal_lahir: e.target.value }))} placeholder="Contoh: 11 Juni 2013" />
                  <p className="text-xs text-muted-foreground mt-1">Format bebas sesuai dengan yang akan diketik siswa saat mencari.</p>
                </div>
                <div>
                  <Label>Nilai Matematika</Label>
                  <Input value={form.matematika} onChange={e => setForm(f => ({ ...f, matematika: e.target.value }))} />
                </div>
                <div>
                  <Label>Nilai Bahasa Indonesia</Label>
                  <Input value={form.bahasa_indonesia} onChange={e => setForm(f => ({ ...f, bahasa_indonesia: e.target.value }))} />
                </div>
                <Button onClick={handleSave} className="w-full mt-4" disabled={isSaving}>{isSaving ? 'Menyimpan...' : 'Simpan'}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-lg border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">NISN</th>
                  <th className="px-4 py-3 text-left font-medium">Nama Siswa</th>
                  <th className="px-4 py-3 text-left font-medium">Tgl Lahir</th>
                  <th className="px-4 py-3 text-left font-medium">Matematika</th>
                  <th className="px-4 py-3 text-left font-medium">B. Indonesia</th>
                  <th className="px-4 py-3 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={6} className="text-center py-10 text-muted-foreground">Memuat data...</td></tr>
                ) : dataTKA.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-10 text-muted-foreground">Belum ada data Hasil TKA</td></tr>
                ) : (
                  dataTKA.map((tka) => (
                    <tr key={tka.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{tka.nisn}</td>
                      <td className="px-4 py-3">{tka.nama_peserta}</td>
                      <td className="px-4 py-3 text-muted-foreground">{tka.tanggal_lahir}</td>
                      <td className="px-4 py-3">{tka.matematika}</td>
                      <td className="px-4 py-3">{tka.bahasa_indonesia}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 mr-2" onClick={() => openEdit(tka)}>
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10" onClick={() => handleDelete(tka.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
