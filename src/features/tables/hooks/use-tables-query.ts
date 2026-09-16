import { useQuery } from '@tanstack/react-query';

import { getTables } from '@/features/tables/api/get-tables';

export const tablesQueryKey = ['tables'] as const;

export function useTablesQuery() {
  return useQuery({
    queryKey: tablesQueryKey,
    queryFn: getTables,
  });
}