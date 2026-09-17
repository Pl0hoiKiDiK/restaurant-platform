import { useQuery } from '@tanstack/react-query';

import { getEmployees } from '@/features/employees/api/get-employees';

export const employeesQueryKey = ['employees'] as const;

export function useEmployeesQuery() {
  return useQuery({
    queryKey: employeesQueryKey,
    queryFn: getEmployees,
  });
}
