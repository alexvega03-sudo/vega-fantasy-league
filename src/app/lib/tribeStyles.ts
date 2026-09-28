/** Badge colors for tribe labels. Toka is always yellow; Savu is always purple. */
export function tribeBadgeClass(tribe: string) {
  switch (tribe) {
    case 'Toka':
      return 'bg-yellow-100 text-yellow-800';
    case 'Savu':
    case 'Vatu':
      return 'bg-purple-100 text-purple-800';
    case 'Cila':
      return 'bg-orange-100 text-orange-800';
    case 'Kalo':
      return 'bg-teal-100 text-teal-800';
    case 'Blue':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-red-100 text-red-800';
  }
}

export const TRIBE_SORT_ORDER: Record<string, number> = {
  Toka: 0,
  Savu: 1,
  Cila: 2,
  Kalo: 3,
  Vatu: 4,
};
