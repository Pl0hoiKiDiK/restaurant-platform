import { getErrorMessage } from '@/lib/get-error-message';
import { CustomerLayout } from '@/app/layouts/customer-layout';
import { RestaurantsMap } from '@/features/restaurants/components/restaurants-map';
import { RestaurantsSidebar } from '@/features/restaurants/components/restaurants-sidebar';
import { useRestaurantsQuery } from '@/features/restaurants/hooks/use-restaurants-query';
import { useRestaurantFilters } from '@/features/restaurants/hooks/use-restaurant-filters';

export function RestaurantsPage() {
  const {
    data: restaurants = [],
    error,
    isError,
    isPending,
    refetch,
  } = useRestaurantsQuery();
  const {
    activeCuisines,
    searchQuery,
    filteredRestaurants,
    setSearchQuery,
    selectedRestaurantId: visibleSelectedRestaurantId,
    selectRestaurant: setSelectedRestaurantId,
    toggleCuisine: handleCuisineToggle,
    removeCuisine: handleCuisineRemove,
    clearFilters: handleClearFilters,
  } = useRestaurantFilters(restaurants);

  return (
    <CustomerLayout onSearchQueryChange={setSearchQuery} searchQuery={searchQuery}>
      <div className="flex min-h-0 flex-1">
        {isError ? (
          <RestaurantsErrorState
            errorMessage={getErrorMessage(error)}
            onRetry={() => {
              void refetch();
            }}
          />
        ) : (
          <>
            {isPending ? (
              <RestaurantsLoadingState />
            ) : (
              <RestaurantsSidebar
                activeCuisines={activeCuisines}
                onClearFilters={handleClearFilters}
                onCuisineRemove={handleCuisineRemove}
                onCuisineToggle={handleCuisineToggle}
                onRestaurantSelect={setSelectedRestaurantId}
                restaurants={filteredRestaurants}
                selectedRestaurantId={visibleSelectedRestaurantId}
              />
            )}
            <main className="restaurant-map-panel">
              {!isPending && restaurants.length === 0 ? (
                <RestaurantsEmptyState />
              ) : (
                <RestaurantsMap
                  onRestaurantSelect={setSelectedRestaurantId}
                  restaurants={filteredRestaurants}
                  selectedRestaurantId={visibleSelectedRestaurantId}
                />
              )}
            </main>
          </>
        )}
      </div>
    </CustomerLayout>
  );
}

function RestaurantsLoadingState() {
  return (
    <aside
      className="restaurant-list-panel bg-[#FAFAFA]"
      aria-label="Loading restaurants"
      aria-busy="true"
    >
      <div className="h-9 animate-pulse rounded-[4px] bg-[#EEEEEE]" />
      <div className="mt-4 flex flex-col gap-4">
        <div className="h-[152px] animate-pulse rounded-[8px] bg-white" />
        <div className="h-[152px] animate-pulse rounded-[8px] bg-white" />
        <div className="h-[152px] animate-pulse rounded-[8px] bg-white" />
      </div>
    </aside>
  );
}

interface RestaurantsErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
}

function RestaurantsErrorState({ errorMessage, onRetry }: RestaurantsErrorStateProps) {
  return (
    <main className="grid w-full place-items-center bg-white p-6">
      <section className="w-full max-w-md rounded-[8px] border border-[#FF5858]/30 bg-[#FFE8E8] p-5">
        <h1 className="text-base font-semibold text-[#222222]">
          Failed to load restaurants
        </h1>

        <p className="mt-2 text-sm leading-5 text-[#222222]/70">{errorMessage}</p>

        <button
          className="mt-4 rounded-[4px] bg-[#222222] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#444444]"
          onClick={onRetry}
          type="button"
        >
          Try again
        </button>
      </section>
    </main>
  );
}

function RestaurantsEmptyState() {
  return (
    <section className="grid h-full place-items-center rounded-[4px] border border-dashed border-black/15 bg-[#F9F9F9] p-6 text-center">
      <div>
        <h1 className="text-lg font-semibold text-[#222222]">No restaurants yet</h1>

        <p className="mt-2 text-sm text-[#222222]/50">
          Add restaurant documents to the Firestore collection to display them on the map.
        </p>
      </div>
    </section>
  );
}
