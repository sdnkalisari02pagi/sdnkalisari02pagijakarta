import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: boolean;
  required?: boolean;
  recommendedSize?: string;
}

export default function ImageUpload({ value, onChange, placeholder, required, recommendedSize }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const processFile = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: 'Gagal', description: 'Ukuran file maksimal 2MB.', variant: 'destructive' });
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast({ title: 'Gagal', description: 'Format file harus JPG, PNG, atau WebP.', variant: 'destructive' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const isMissing = required && !value;

  return (
    <div
      className="space-y-2"
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFile} />
      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
          <button onClick={() => onChange('')} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1">
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className={`w-full min-h-[8rem] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
            dragOver ? 'border-primary bg-primary/5' : isMissing ? 'border-destructive/60 hover:border-destructive' : 'border-muted-foreground/40 hover:border-primary/60'
          }`}
        >
          <Upload className="w-6 h-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">Seret foto ke sini atau klik untuk unggah</p>
          {required && <p className="text-xs text-destructive font-medium">* Wajib diisi</p>}
        </div>
      )}
      <div>
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} className="gap-2">
          <Upload className="w-4 h-4" /> Unggah Foto
        </Button>
        <p className="text-xs text-muted-foreground">
          Maksimal 2MB · JPG/PNG/WebP{recommendedSize ? ` · Disarankan: ${recommendedSize}` : ''}
        </p>
      </div>
    </div>
  );
}
