import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSchool } from '@/contexts/SchoolContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // 🔥 dipakai sekarang
  const { data } = useSchool();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const u = username.trim();
    const p = password.trim();

    try {
      // 🔍 ambil user dari Supabase
      const { data: users, error } = await supabase
        .from('akun')
        .select('*')
        .eq('username', u)
        .limit(1);

      if (error) throw error;

      if (!users || users.length === 0) {
        setError('User tidak ditemukan');
        setLoading(false);
        return;
      }

      const user = users[0];

      // 🔐 cek password
      if (user.password !== p) {
        setError('Password salah');
        setLoading(false);
        return;
      }

      // 🔥 WAJIB: update AuthContext
      await login(user.username);

      // 🚀 redirect
      navigate('/admin');

    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat login');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          {data.logo ? (
            <img src={data.logo} alt="Logo" className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
          )}
          <CardTitle className="text-2xl">Login Admin</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <p className="text-sm text-destructive text-center">
                {error}
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Masukkan username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Memproses...' : 'Login'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <button
                type="button"
                onClick={() =>
                  toast('Silakan hubungi administrator untuk mereset password Anda.')
                }
                className="text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </p>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
