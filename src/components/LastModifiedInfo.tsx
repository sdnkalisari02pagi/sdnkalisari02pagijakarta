import { Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function formatDate(iso: string | undefined | null, lang: string = 'id') {
  if (!iso) return '';

  // Convert ' ' to 'T' just in case
  let fixed = iso.replace(' ', 'T');
  
  // Supabase returns timestamps without timezone (like "2026-05-21T08:17:00.123") which are implicitly UTC.
  // If the string doesn't explicitly contain a timezone indicator (+, -, or Z) in the time part, we append 'Z'.
  const timePart = fixed.split('T')[1] || '';
  if (!timePart.includes('+') && !timePart.includes('-') && !timePart.endsWith('Z')) {
    fixed += 'Z';
  }

  const date = new Date(fixed);
  
  if (isNaN(date.getTime())) {
    return lang === 'en' ? 'Invalid date' : 'Waktu tidak valid';
  }

  const dateStr = date.toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const timeStr = date.toLocaleTimeString(lang === 'en' ? 'en-US' : 'id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  if (lang === 'en') {
    return `${dateStr} at ${timeStr}`;
  } else {
    return `${dateStr} pukul ${timeStr.replace(':', '.')}`;
  }
}

export default function LastModifiedInfo({ timestamp, className = '' }: { timestamp?: string; className?: string }) {
  const langCtx = useLanguage();
  const lang = langCtx?.lang || 'id';

  if (!timestamp) return null;

  return (
    <p className={`flex items-center gap-1.5 text-sm text-muted-foreground mb-4 ${className}`}>
      <Clock className="w-3.5 h-3.5" />
      {lang === 'en' ? 'Last modified:' : 'Terakhir diubah:'} {formatDate(timestamp, lang)}
    </p>
  );
}
