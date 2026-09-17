import { useQuery } from '@tanstack/react-query';

import { getTable } from '@/features/tables/api/get-table';
import { tableQueryKeys } from '@/features/tables/lib/query-keys';

export function useTableQuery(tableId: string) {
  return useQuery({
    queryKey: tableQueryKeys.detail(tableId),
    queryFn: () => getTable(tableId),
  });
}
