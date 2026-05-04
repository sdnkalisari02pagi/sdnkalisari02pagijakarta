import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => Promise<{ ok: boolean }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // 🔥 cek login dari localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('admin_user');
    if (savedUser) {
      setIsLoggedIn(true);
      setUsername(savedUser);
    }
  }, []);

  const login = async (username: string) => {
    localStorage.setItem('admin_user', username);
    setIsLoggedIn(true);
    setUsername(username);
    return { ok: true };
  };

  const logout = async () => {
    localStorage.removeItem('admin_user');
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
