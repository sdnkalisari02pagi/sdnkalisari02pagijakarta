import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
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
    <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-4 border-t gap-4 mt-6">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground font-medium">{t('per_halaman')}:</span>
        <Select value={String(perPage)} onValueChange={v => onPerPageChange(v === 'all' ? 'all' : Number(v))}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={perPage === 'all' ? t('semua') : perPage} />
          </SelectTrigger>
          <SelectContent side="top">
            {options.map(opt => (
              <SelectItem key={String(opt)} value={String(opt)}>{opt === 'all' ? t('semua') : opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
        <div className="flex items-center justify-center text-sm font-medium text-muted-foreground">
          {start} – {end} / {total}
        </div>
        
        {(!isAll && totalPages > 1) && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(1)}
              disabled={safePage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(Math.max(1, safePage - 1))}
              disabled={safePage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center justify-center text-sm font-medium px-2">
              {safePage} / {totalPages}
            </div>
            
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
              disabled={safePage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(totalPages)}
              disabled={safePage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/** Helper: slice items based on page+perPage */
export function paginate<T>(items: T[], page: number, perPage: PerPage): T[] {
  if (perPage === 'all') return items;
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}
