import { useState } from 'react';
import { useSchool } from '@/contexts/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { GraduationCap, ArrowLeft, Loader2 } from 'lucide-react';

interface TKAResult {
  nama: string;
  kelas: string;
  bahasaIndonesia: string;
  matematika: string;
}

export default function HasilTKA() {
  const { data } = useSchool();
  const [nisn, setNisn] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<TKAResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const cleanNisn = nisn.trim();
    if (!/^\d+$/.test(cleanNisn)) {
      setError('NISN hanya boleh berisi angka.');
      return;
    }

    if (!tanggalLahir) {
      setError('Tanggal Lahir wajib diisi.');
      return;
    }

    // Format the date picker value (yyyy-mm-dd) to dd/mm/yyyy
    const [year, month, day] = tanggalLahir.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    setLoading(true);
    try {
      const response = await fetch('/api/tka', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nisn: cleanNisn, tanggalLahir: formattedDate })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Terjadi kesalahan pada server');
      }

      setResult(resData);
    } catch (err: any) {
      setError(err.message || 'Data tidak ditemukan.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setNisn('');
    setTanggalLahir('');
    setError('');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10">
      <Card className="w-full max-w-md mx-4 shadow-lg border-primary/10">
        <CardHeader className="text-center pb-4">
          {data.logo ? (
            <img src={data.logo} alt="Logo" className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border shadow-sm" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center shadow-sm">
              <GraduationCap className="w-10 h-10 text-primary-foreground" />
            </div>
          )}
          
          {!result ? (
            <>
              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">PENGUMUMAN HASIL TKA</CardTitle>
              <CardDescription className="text-sm mt-2 font-medium">SDN KALISARI 02 PAGI</CardDescription>
              <p className="text-xs text-muted-foreground mt-4">Masukkan NISN dan Tanggal Lahir untuk melihat hasil TKA</p>
            </>
          ) : (
            <CardTitle className="text-2xl font-bold text-primary">Hasil TKA Ditemukan</CardTitle>
          )}
        </CardHeader>

        <CardContent>
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-md text-center border border-destructive/20 font-medium">
                  {error}
                </div>
              )}

              <div className="space-y-2 text-left">
                <Label htmlFor="nisn" className="font-semibold text-foreground/80">NISN</Label>
                <Input
                  id="nisn"
                  type="text"
                  inputMode="numeric"
                  value={nisn}
                  onChange={e => setNisn(e.target.value.replace(/\D/g, ''))}
                  placeholder="Masukkan NISN (Hanya Angka)"
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="tanggalLahir" className="font-semibold text-foreground/80">Tanggal Lahir</Label>
                <Input
                  id="tanggalLahir"
                  type="date"
                  value={tanggalLahir}
                  onChange={e => setTanggalLahir(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full h-11 text-base mt-2">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Mencari Data...
                  </>
                ) : (
                  'Lihat Hasil'
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-6 animate-in zoom-in-95 duration-400">
              <div className="bg-muted/30 p-5 rounded-lg border">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Nama Siswa</p>
                    <p className="font-bold text-foreground text-lg">{result.nama}</p>
                  </div>
                  <div className="h-px bg-border w-full"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">B. Indonesia</p>
                      <p className="font-bold text-primary text-2xl">{result.bahasaIndonesia}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Matematika</p>
                      <p className="font-bold text-primary text-2xl">{result.matematika}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleReset} variant="outline" className="w-full gap-2">
                <ArrowLeft className="w-4 h-4" />
                Cari Data Lain
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
