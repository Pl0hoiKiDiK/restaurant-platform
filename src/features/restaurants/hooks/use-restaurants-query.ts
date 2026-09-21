import { useQuery } from '@tanstack/react-query';

import { getRestaurants } from '@/features/restaurants/api/get-restaurants';

export function useRestaurantsQuery() {
  return useQuery({ queryKey: ['restaurants'], queryFn: getRestaurants });
}
