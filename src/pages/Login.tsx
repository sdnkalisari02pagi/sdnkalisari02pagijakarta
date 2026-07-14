import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { data } = useSchool();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const u = username.trim();
    const p = password.trim();

    try {
      const { data: users, error } = await supabase
        .from('akun')
        .select('*')
        .eq('username', u)
        .limit(1);

      if (error) throw error;

      if (!users || users.length === 0) {
        setError(t('login_err_not_found'));
        setLoading(false);
        return;
      }

      const user = users[0];

      if (user.password !== p) {
        setError(t('login_err_wrong_pass'));
        setLoading(false);
        return;
      }

      await login(user.username);
      navigate('/admin');

    } catch (err) {
      console.error(err);
      setError(t('login_err_generic'));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10">
      <SEO title={t('login_title')} noindex={true} />
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          {data.logo ? (
            <img src={data.logo} alt="Logo" className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
          )}
          <CardTitle className="text-2xl">{t('login_title')}</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <p className="text-sm text-destructive text-center">
                {error}
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">{t('login_username')}</Label>
              <Input
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder={t('login_username_placeholder')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('login_password')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={t('login_password_placeholder')}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t('login_processing') : t('login_submit')}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <button
                type="button"
                onClick={() =>
                  toast(t('login_forgot_toast'))
                }
                className="text-primary hover:underline"
              >
                {t('login_forgot')}
              </button>
            </p>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
