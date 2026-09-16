import { useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { CustomerLayout } from '@/app/layouts/customer-layout';
import { RestaurantsMapPlaceholder } from '@/features/restaurants/components/restaurants-map-placeholder';
import { RestaurantsSidebar } from '@/features/restaurants/components/restaurants-sidebar';
import { mockRestaurants } from '@/features/restaurants/data/mock-restaurants';
import type { RestaurantCuisine } from '@/features/restaurants/types/restaurant.types';

export const Route = createFileRoute('/restaurants')({
  component: RestaurantsPage,
});

function RestaurantsPage() {
  const [activeCuisines, setActiveCuisines] = useState<RestaurantCuisine[]>([
    'Asian',
    'Thai',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    string | null
  >(null);

  const filteredRestaurants = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    return mockRestaurants.filter((restaurant) => {
      const matchesCuisine =
        activeCuisines.length === 0 ||
        restaurant.cuisines.some((cuisine) =>
          activeCuisines.includes(cuisine),
        );

      const searchText = [
        restaurant.name,
        restaurant.city,
        ...restaurant.cuisines,
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        normalizedSearchQuery === '' ||
        searchText.includes(normalizedSearchQuery);

      return matchesCuisine && matchesSearch;
    });
  }, [activeCuisines, searchQuery]);

  const visibleSelectedRestaurantId = filteredRestaurants.some(
    (restaurant) => restaurant.id === selectedRestaurantId,
  )
    ? selectedRestaurantId
    : null;

  function handleCuisineToggle(cuisine: RestaurantCuisine) {
    setActiveCuisines((currentCuisines) => {
      if (currentCuisines.includes(cuisine)) {
        return currentCuisines.filter(
          (currentCuisine) => currentCuisine !== cuisine,
        );
      }

      return [...currentCuisines, cuisine];
    });
  }

  function handleCuisineRemove(cuisine: RestaurantCuisine) {
    setActiveCuisines((currentCuisines) =>
      currentCuisines.filter(
        (currentCuisine) => currentCuisine !== cuisine,
      ),
    );
  }

  function handleClearFilters() {
    setActiveCuisines([]);
  }

  return (
    <CustomerLayout
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
    >
      <div className="flex h-[calc(100dvh-62px)] min-h-0">
        <RestaurantsSidebar
          activeCuisines={activeCuisines}
          onClearFilters={handleClearFilters}
          onCuisineRemove={handleCuisineRemove}
          onCuisineToggle={handleCuisineToggle}
          onRestaurantSelect={setSelectedRestaurantId}
          restaurants={filteredRestaurants}
          selectedRestaurantId={visibleSelectedRestaurantId}
        />

        <main className="min-w-0 flex-1 bg-white p-6 pt-[30px]">
          <RestaurantsMapPlaceholder
            onRestaurantSelect={setSelectedRestaurantId}
            restaurants={filteredRestaurants}
            selectedRestaurantId={visibleSelectedRestaurantId}
          />
        </main>
      </div>
    </CustomerLayout>
  );
}