import { Clock } from 'lucide-react';

export function formatDate(iso: string | undefined | null) {
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
    return 'Waktu tidak valid';
  }

  return date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export default function LastModifiedInfo({ timestamp }: { timestamp?: string }) {
  if (!timestamp) return null;

  return (
    <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
      <Clock className="w-3.5 h-3.5" />
      Terakhir diubah: {formatDate(timestamp)}
    </p>
  );
}
