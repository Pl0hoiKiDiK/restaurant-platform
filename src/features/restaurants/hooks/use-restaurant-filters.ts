import { useState } from 'react';
import type {
  Restaurant,
  RestaurantCuisine,
} from '@/features/restaurants/types/restaurant.types';

export function useRestaurantFilters(restaurants: Restaurant[]) {
  const [activeCuisines, setActiveCuisines] = useState<RestaurantCuisine[]>([
    'Asian',
    'Thai',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const search = searchQuery.trim().toLowerCase();
  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      (!activeCuisines.length ||
        restaurant.cuisines.some((cuisine) => activeCuisines.includes(cuisine))) &&
      [restaurant.name, restaurant.city, ...restaurant.cuisines]
        .join(' ')
        .toLowerCase()
        .includes(search),
  );
  return {
    activeCuisines,
    searchQuery,
    filteredRestaurants,
    setSearchQuery,
    selectedRestaurantId: filteredRestaurants.some(
      (restaurant) => restaurant.id === selectedId,
    )
      ? selectedId
      : null,
    selectRestaurant: setSelectedId,
    toggleCuisine: (cuisine: RestaurantCuisine) =>
      setActiveCuisines((current) =>
        current.includes(cuisine)
          ? current.filter((value) => value !== cuisine)
          : [...current, cuisine],
      ),
    removeCuisine: (cuisine: RestaurantCuisine) =>
      setActiveCuisines((current) => current.filter((value) => value !== cuisine)),
    clearFilters: () => setActiveCuisines([]),
  };
}
