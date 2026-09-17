import type {
  Restaurant,
  RestaurantCuisine,
} from '@/features/restaurants/types/restaurant.types';

import { RestaurantCard } from './restaurant-card';
import { RestaurantFilterBar } from './restaurant-filter-bar';

interface RestaurantsSidebarProps {
  restaurants: Restaurant[];
  activeCuisines: RestaurantCuisine[];
  selectedRestaurantId: string | null;
  onRestaurantSelect: (restaurantId: string) => void;
  onCuisineToggle: (cuisine: RestaurantCuisine) => void;
  onCuisineRemove: (cuisine: RestaurantCuisine) => void;
  onClearFilters: () => void;
}

export function RestaurantsSidebar({
  restaurants,
  activeCuisines,
  selectedRestaurantId,
  onRestaurantSelect,
  onCuisineToggle,
  onCuisineRemove,
  onClearFilters,
}: RestaurantsSidebarProps) {
  return (
    <aside className="restaurant-list-panel flex min-h-0 flex-col bg-[#FAFAFA]">
      <RestaurantFilterBar
        activeCuisines={activeCuisines}
        onClearFilters={onClearFilters}
        onCuisineRemove={onCuisineRemove}
        onCuisineToggle={onCuisineToggle}
      />

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1 sm:mt-4 sm:pr-3">
        {restaurants.length === 0 ? (
          <div className="rounded-[8px] border border-dashed border-black/10 bg-white p-4 text-center">
            <p className="text-sm font-medium text-[#222222]">No restaurants found</p>

            <p className="mt-1 text-xs text-[#222222]/50">
              Try another search or remove filters.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 sm:gap-4">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                isSelected={restaurant.id === selectedRestaurantId}
                key={restaurant.id}
                onSelect={onRestaurantSelect}
                restaurant={restaurant}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
