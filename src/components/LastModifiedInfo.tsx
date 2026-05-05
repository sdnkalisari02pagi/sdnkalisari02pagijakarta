import { Clock } from 'lucide-react';

function formatDate(iso: string) {
  if (!iso) return '';

  // 🔥 Fix parsing: ubah "2026-05-05 08:07:00" → ISO valid + WIB
  const fixed = iso.replace(' ', 'T') + '+07:00';
  const date = new Date(fixed);

  const formatted = date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  // fallback kalau parsing gagal
  if (formatted === 'Invalid Date') {
    const d = new Date(iso);
    return d.toLocaleString('id-ID', {
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
