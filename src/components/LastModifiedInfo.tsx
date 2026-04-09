import { Clock } from 'lucide-react';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
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
