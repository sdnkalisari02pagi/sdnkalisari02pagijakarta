import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Credentials {
  username: string;
  salt: string;
  hash: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  changeCredentials: (oldPassword: string, newUsername: string, newPassword: string) => Promise<{ ok: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'admin-credentials';
const SESSION_KEY = 'admin-session';
const ATTEMPTS_KEY = 'admin-login-attempts';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60 * 1000; // 1 minute

async function sha256(text: string): Promise<string> {
  const buffer = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function randomSalt(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password: string, salt: string): Promise<string> {
  return sha256(`${salt}::${password}`);
}

async function getCredentials(): Promise<Credentials> {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }
  // Initialize with default admin/admin123
  const salt = randomSalt();
  const hash = await hashPassword('admin123', salt);
  const creds: Credentials = { username: 'admin', salt, hash };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
  return creds;
}

function getAttempts(): { count: number; lockedUntil: number } {
  try {
    const v = localStorage.getItem(ATTEMPTS_KEY);
    if (v) return JSON.parse(v);
  } catch {}
  return { count: 0, lockedUntil: 0 };
}

function setAttempts(a: { count: number; lockedUntil: number }) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(a));
}

export function validatePasswordStrength(password: string): string | null {
  if (password.length < 8) return 'Password minimal 8 karakter';
  if (!/[A-Z]/.test(password)) return 'Password harus ada huruf besar';
  if (!/[a-z]/.test(password)) return 'Password harus ada huruf kecil';
  if (!/[0-9]/.test(password)) return 'Password harus ada angka';
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true' || localStorage.getItem('admin-logged-in') === 'true');
  const [username, setUsername] = useState<string>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}').username || 'admin'; } catch { return 'admin'; }
  });

  const login = async (u: string, p: string) => {
    const attempts = getAttempts();
    if (attempts.lockedUntil > Date.now()) {
      const sec = Math.ceil((attempts.lockedUntil - Date.now()) / 1000);
      return { ok: false, error: `Terlalu banyak percobaan. Coba lagi dalam ${sec} detik.` };
    }
    const creds = await getCredentials();
    const hash = await hashPassword(p, creds.salt);
    if (u === creds.username && hash === creds.hash) {
      setAttempts({ count: 0, lockedUntil: 0 });
      setIsLoggedIn(true);
      setUsername(creds.username);
      sessionStorage.setItem(SESSION_KEY, 'true');
      localStorage.setItem('admin-logged-in', 'true');
      return { ok: true };
    }
    const newCount = attempts.count + 1;
    const next = newCount >= MAX_ATTEMPTS
      ? { count: 0, lockedUntil: Date.now() + LOCKOUT_MS }
      : { count: newCount, lockedUntil: 0 };
    setAttempts(next);
    if (next.lockedUntil > 0) {
      return { ok: false, error: `Terlalu banyak percobaan. Akun terkunci selama 1 menit.` };
    }
    return { ok: false, error: `Username atau password salah! (sisa percobaan: ${MAX_ATTEMPTS - newCount})` };
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('admin-logged-in');
  };

  const changeCredentials = async (oldPassword: string, newUsername: string, newPassword: string) => {
    const creds = await getCredentials();
    const oldHash = await hashPassword(oldPassword, creds.salt);
    if (oldHash !== creds.hash) return { ok: false, error: 'Password lama salah' };
    if (!newUsername.trim() || newUsername.length < 3) return { ok: false, error: 'Username minimal 3 karakter' };
    const strengthErr = validatePasswordStrength(newPassword);
    if (strengthErr) return { ok: false, error: strengthErr };
    const salt = randomSalt();
    const hash = await hashPassword(newPassword, salt);
    const next: Credentials = { username: newUsername.trim(), salt, hash };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setUsername(next.username);
    return { ok: true };
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout, changeCredentials }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
