import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export default function ImageUpload({ value, onChange, placeholder }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: 'Gagal', description: 'Ukuran file maksimal 2MB.', variant: 'destructive' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-2">
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFile} />
      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
          <button onClick={() => onChange('')} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1">
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : placeholder ? (
        <div className="w-32 h-32 rounded-lg border border-dashed border-muted-foreground/40 flex items-center justify-center text-muted-foreground text-xs">
          Belum ada foto
        </div>
      ) : null}
      <div>
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} className="gap-2">
          <Upload className="w-4 h-4" /> Unggah Foto
        </Button>
      </div>
    </div>
  );
}
