// Helper for bilingual content fields
export type Bilingual = string | { id: string; en?: string };

export function tr(value: Bilingual | undefined | null, lang: 'id' | 'en'): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (lang === 'en' && value.en && value.en.trim()) return value.en;
  return value.id || value.en || '';
}

export function trArray(arr: Bilingual[] | undefined, lang: 'id' | 'en'): string[] {
  if (!arr) return [];
  return arr.map(v => tr(v, lang));
}

export function toBilingual(v: any): { id: string; en: string } {
  if (typeof v === 'string') return { id: v, en: '' };
  if (v && typeof v === 'object') return { id: v.id || '', en: v.en || '' };
  return { id: '', en: '' };
}
