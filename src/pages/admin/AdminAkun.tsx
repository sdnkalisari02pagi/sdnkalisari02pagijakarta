import { useState } from 'react';
import { useAuth, validatePasswordStrength } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Shield, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminAkun() {
  const { username, changeCredentials, logout } = useAuth();
  const [form, setForm] = useState({ oldPassword: '', newUsername: username, newPassword: '', confirmPassword: '' });
  const [show, setShow] = useState({ old: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);

  const checks = [
    { label: 'Minimal 8 karakter', ok: form.newPassword.length >= 8 },
    { label: 'Ada huruf besar (A-Z)', ok: /[A-Z]/.test(form.newPassword) },
    { label: 'Ada huruf kecil (a-z)', ok: /[a-z]/.test(form.newPassword) },
    { label: 'Ada angka (0-9)', ok: /[0-9]/.test(form.newPassword) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast({ title: 'Gagal', description: 'Konfirmasi password tidak cocok', variant: 'destructive' });
      return;
    }
    const strErr = validatePasswordStrength(form.newPassword);
    if (strErr) { toast({ title: 'Gagal', description: strErr, variant: 'destructive' }); return; }

    setLoading(true);
    const res = await changeCredentials(form.oldPassword, form.newUsername, form.newPassword);
    setLoading(false);
    if (!res.ok) {
      toast({ title: 'Gagal', description: res.error, variant: 'destructive' });
      return;
    }
    toast({ title: 'Berhasil', description: 'Kredensial diperbarui. Silakan login ulang.' });
    setTimeout(() => logout(), 1200);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /> Akun Admin</h1>
        <p className="text-sm text-muted-foreground">Ubah username dan password admin. Password disimpan dengan SHA-256 + salt.</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Username Saat Ini</CardTitle></CardHeader>
        <CardContent><p className="font-mono text-foreground">{username}</p></CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Ganti Kredensial</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Password Lama</Label>
              <div className="relative">
                <Input type={show.old ? 'text' : 'password'} value={form.oldPassword} onChange={e => setForm(f => ({ ...f, oldPassword: e.target.value }))} required autoComplete="current-password" />
                <button type="button" onClick={() => setShow(s => ({ ...s, old: !s.old }))} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show.old ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label>Username Baru</Label>
              <Input value={form.newUsername} onChange={e => setForm(f => ({ ...f, newUsername: e.target.value }))} minLength={3} required />
            </div>
            <div>
              <Label>Password Baru</Label>
              <div className="relative">
                <Input type={show.new ? 'text' : 'password'} value={form.newPassword} onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))} required autoComplete="new-password" />
                <button type="button" onClick={() => setShow(s => ({ ...s, new: !s.new }))} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <ul className="mt-2 space-y-1">
                {checks.map((c, i) => (
                  <li key={i} className={`text-xs flex items-center gap-1.5 ${c.ok ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
                    {c.ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />} {c.label}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Label>Konfirmasi Password Baru</Label>
              <div className="relative">
                <Input type={show.confirm ? 'text' : 'password'} value={form.confirmPassword} onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))} required autoComplete="new-password" />
                <button type="button" onClick={() => setShow(s => ({ ...s, confirm: !s.confirm }))} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.confirmPassword && form.newPassword !== form.confirmPassword && (
                <p className="text-xs text-destructive mt-1">Password tidak cocok</p>
              )}
            </div>
            <Button type="submit" disabled={loading} className="w-full">{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
