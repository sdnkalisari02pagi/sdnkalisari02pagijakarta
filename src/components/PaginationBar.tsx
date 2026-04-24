import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export type PerPage = number | 'all';

interface Props {
  total: number;
  page: number;
  perPage: PerPage;
  onPageChange: (p: number) => void;
  onPerPageChange: (pp: PerPage) => void;
  options?: PerPage[];
}

export default function PaginationBar({ total, page, perPage, onPageChange, onPerPageChange, options = [10, 20, 30, 'all'] }: Props) {
  const { t } = useLanguage();
  const isAll = perPage === 'all';
  const pageSize = isAll ? total : (perPage as number);
  const totalPages = isAll ? 1 : Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = isAll ? total : Math.min(safePage * pageSize, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{t('per_halaman')}:</span>
        <Select value={String(perPage)} onValueChange={v => onPerPageChange(v === 'all' ? 'all' : Number(v))}>
          <SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger>
          <SelectContent>
            {options.map(opt => (
              <SelectItem key={String(opt)} value={String(opt)}>{opt === 'all' ? t('semua') : opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-muted-foreground hidden sm:inline">{start}–{end} / {total}</span>
      </div>
      {!isAll && totalPages > 1 && (
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" onClick={() => onPageChange(Math.max(1, safePage - 1))} disabled={safePage === 1}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="px-3 text-foreground font-medium">{safePage} / {totalPages}</span>
          <Button size="sm" variant="outline" onClick={() => onPageChange(Math.min(totalPages, safePage + 1))} disabled={safePage === totalPages}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

/** Helper: slice items based on page+perPage */
export function paginate<T>(items: T[], page: number, perPage: PerPage): T[] {
  if (perPage === 'all') return items;
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}
