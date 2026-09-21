import { useQuery } from '@tanstack/react-query';

import { getEmployees } from '@/features/employees/api/get-employees';

export function useEmployeesQuery() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });
}
