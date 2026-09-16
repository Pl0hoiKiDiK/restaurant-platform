import { createFileRoute } from '@tanstack/react-router';

import { CustomerLayout } from '@/app/layouts/customer-layout';
import { RestaurantsMapPlaceholder } from '@/features/restaurants/components/restaurants-map-placeholder';
import { RestaurantsSidebar } from '@/features/restaurants/components/restaurants-sidebar';
import { mockRestaurants } from '@/features/restaurants/data/mock-restaurants';

export const Route = createFileRoute('/restaurants')({
  component: RestaurantsPage,
});

function RestaurantsPage() {
  return (
    <CustomerLayout>
      <div className="flex h-[calc(100dvh-62px)] min-h-0">
        <RestaurantsSidebar restaurants={mockRestaurants} />

        <main className="min-w-0 flex-1 bg-white p-6 pt-[30px]">
          <RestaurantsMapPlaceholder restaurants={mockRestaurants} />
        </main>
      </div>
    </CustomerLayout>
  );
}