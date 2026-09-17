import { useMemo, useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';

import { CustomerLayout } from '@/app/layouts/customer-layout';
import { RestaurantsMapPlaceholder } from '@/features/restaurants/components/restaurants-map-placeholder';
import { RestaurantsSidebar } from '@/features/restaurants/components/restaurants-sidebar';
import { useRestaurantsQuery } from '@/features/restaurants/hooks/use-restaurants-query';
import type { RestaurantCuisine } from '@/features/restaurants/types/restaurant.types';

export const Route = createFileRoute("/restaurants")({
  component: RestaurantsPage,
});

function RestaurantsPage() {
  const [activeCuisines, setActiveCuisines] = useState<RestaurantCuisine[]>([
    "Asian",
    "Thai",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    string | null
  >(null);

  const {
    data: restaurants = [],
    error,
    isError,
    isPending,
    refetch,
  } = useRestaurantsQuery();

  const filteredRestaurants = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    return restaurants.filter((restaurant) => {
      const matchesCuisine =
        activeCuisines.length === 0 ||
        restaurant.cuisines.some((cuisine) => activeCuisines.includes(cuisine));

      const searchText = [
        restaurant.name,
        restaurant.city,
        ...restaurant.cuisines,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearchQuery === "" ||
        searchText.includes(normalizedSearchQuery);

      return matchesCuisine && matchesSearch;
    });
  }, [activeCuisines, restaurants, searchQuery]);

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
      currentCuisines.filter((currentCuisine) => currentCuisine !== cuisine),
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
        {isPending ? <RestaurantsLoadingState /> : null}

        {isError ? (
          <RestaurantsErrorState
            errorMessage={getErrorMessage(error)}
            onRetry={() => {
              void refetch();
            }}
          />
        ) : null}

        {!isPending && !isError ? (
          <>
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
              {restaurants.length === 0 ? (
                <RestaurantsEmptyState />
              ) : (
                <RestaurantsMapPlaceholder
                  onRestaurantSelect={setSelectedRestaurantId}
                  restaurants={filteredRestaurants}
                  selectedRestaurantId={visibleSelectedRestaurantId}
                />
              )}
            </main>
          </>
        ) : null}
      </div>
    </CustomerLayout>
  );
}

function RestaurantsLoadingState() {
  return (
    <div className="flex w-full min-w-0">
      <aside className="hidden w-[300px] shrink-0 bg-[#FAFAFA] p-[30px] lg:block">
        <div className="h-9 animate-pulse rounded-[4px] bg-[#EEEEEE]" />

        <div className="mt-4 flex flex-col gap-4">
          <div className="h-[152px] animate-pulse rounded-[8px] bg-white" />
          <div className="h-[152px] animate-pulse rounded-[8px] bg-white" />
          <div className="h-[152px] animate-pulse rounded-[8px] bg-white" />
        </div>
      </aside>

      <main className="min-w-0 flex-1 bg-white p-6 pt-[30px]">
        <div className="h-full animate-pulse rounded-[4px] bg-[#F1F1F1]" />
      </main>
    </div>
  );
}

interface RestaurantsErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
}

function RestaurantsErrorState({
  errorMessage,
  onRetry,
}: RestaurantsErrorStateProps) {
  return (
    <main className="grid w-full place-items-center bg-white p-6">
      <section className="w-full max-w-md rounded-[8px] border border-[#FF5858]/30 bg-[#FFE8E8] p-5">
        <h1 className="text-base font-semibold text-[#222222]">
          Failed to load restaurants
        </h1>

        <p className="mt-2 text-sm leading-5 text-[#222222]/70">
          {errorMessage}
        </p>

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
        <h1 className="text-lg font-semibold text-[#222222]">
          No restaurants yet
        </h1>

        <p className="mt-2 text-sm text-[#222222]/50">
          Add restaurant documents to the Firestore collection to display them
          on the map.
        </p>
      </div>
    </section>
  );
}

function getErrorMessage(error: Error | null): string {
  if (error === null) {
    return "An unknown error occurred.";
  }

  return error.message;
}
