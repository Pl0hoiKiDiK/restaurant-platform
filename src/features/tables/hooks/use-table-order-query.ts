import { useQuery } from '@tanstack/react-query';

import { getTableOrder } from '@/features/tables/api/get-table-order';
import { tableOrderQueryKeys } from '@/features/tables/lib/query-keys';

export function useTableOrderQuery(tableId: string) {
  return useQuery({
    queryKey: tableOrderQueryKeys.detail(tableId),
    queryFn: () => getTableOrder(tableId),
  });
}
