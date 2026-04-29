import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // cek session dari supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  const login = async (username: string, password: string) => {
    // 1. cek ke table akun
    const { data, error } = await supabase.rpc('login_akun', {
      input_username: username,
      input_password: password,
    });

    if (error || !data) {
      return { ok: false, error: 'Username atau password salah' };
    }

    // 2. login ke supabase auth (buat session)
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@system.local',
      password: 'supersecret123',
    });

    if (authError) {
      return { ok: false, error: 'Gagal membuat session' };
    }

    setIsLoggedIn(true);
    setUsername(username);

    return { ok: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function validatePasswordStrength(password: string): string | null {
  if (password.length < 8) return "Password minimal 8 karakter";
  if (!/[A-Z]/.test(password)) return "Harus ada huruf besar (A-Z)";
  if (!/[a-z]/.test(password)) return "Harus ada huruf kecil (a-z)";
  if (!/[0-9]/.test(password)) return "Harus ada angka (0-9)";
  return null;
}
