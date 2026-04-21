import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bilingual, toBilingual } from '@/lib/i18n';

interface Props {
  label?: string;
  value: Bilingual;
  onChange: (v: { id: string; en: string }) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}

export default function BilingualInput({ label, value, onChange, multiline, rows = 3, placeholder }: Props) {
  const v = toBilingual(value);
  const Comp = multiline ? Textarea : Input;
  return (
    <div className="space-y-2">
      {label && <Label className="text-sm font-medium">{label}</Label>}
      <div className="grid sm:grid-cols-2 gap-2">
        <div>
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">🇮🇩 Indonesia</span>
          <Comp value={v.id} onChange={(e: any) => onChange({ id: e.target.value, en: v.en })} rows={rows} placeholder={placeholder} />
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">🇬🇧 English</span>
          <Comp value={v.en} onChange={(e: any) => onChange({ id: v.id, en: e.target.value })} rows={rows} placeholder="(optional, fallback to ID)" />
        </div>
      </div>
    </div>
  );
}
