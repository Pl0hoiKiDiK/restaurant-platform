import { useQuery } from '@tanstack/react-query';

import { getRestaurants } from '@/features/restaurants/api/get-restaurants';

export const restaurantsQueryKey = ['restaurants'] as const;

export function useRestaurantsQuery() {
  return useQuery({
    queryKey: restaurantsQueryKey,
    queryFn: getRestaurants,
  });
}