import type { Restaurant } from '@/features/restaurants/types/restaurant.types';

import { RestaurantCard } from './restaurant-card';
import { RestaurantFilterBar } from './restaurant-filter-bar';

interface RestaurantsSidebarProps {
  restaurants: Restaurant[];
}

export function RestaurantsSidebar({
  restaurants,
}: RestaurantsSidebarProps) {
  return (
    <aside className="flex h-full w-[300px] shrink-0 flex-col bg-[#FAFAFA] p-[30px]">
      <RestaurantFilterBar />

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-3">
        <div className="flex flex-col gap-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </aside>
  );
}