import { Clock } from 'lucide-react';

function formatDate(iso: string) {
  const date = new Date(iso);

  return date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

  // kalau somehow masih undefined / invalid
  if (formatted === 'Invalid Date') {
    const wib = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    return wib.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  return formatted;
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
