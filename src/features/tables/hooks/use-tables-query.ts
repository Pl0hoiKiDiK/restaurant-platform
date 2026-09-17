import { useQuery } from '@tanstack/react-query';

import { getTables } from '@/features/tables/api/get-tables';
import { tableQueryKeys } from '@/features/tables/lib/query-keys';

export function useTablesQuery() {
  return useQuery({
    queryKey: tableQueryKeys.all,
    queryFn: getTables,
  });
}
