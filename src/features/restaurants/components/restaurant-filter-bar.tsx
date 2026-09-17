import { useRef, useState } from "react";

import crossIcon from "@/assets/icons/cross-icon.svg";
import filterBlackIcon from "@/assets/icons/filter-black-icon.svg";
import filterRedIcon from "@/assets/icons/filter-red-icon.svg";
import { useClickOutside } from "@/hooks/use-click-outside";
import type { RestaurantCuisine } from "@/features/restaurants/types/restaurant.types";

const availableCuisines: RestaurantCuisine[] = [
  "Asian",
  "Thai",
  "Asian Fusion",
  "Chinese",
];

interface RestaurantFilterBarProps {
  activeCuisines: RestaurantCuisine[];
  onCuisineToggle: (cuisine: RestaurantCuisine) => void;
  onCuisineRemove: (cuisine: RestaurantCuisine) => void;
  onClearFilters: () => void;
}

export function RestaurantFilterBar({
  activeCuisines,
  onCuisineToggle,
  onCuisineRemove,
  onClearFilters,
}: RestaurantFilterBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useClickOutside(filterRef, () => setIsMenuOpen(false));

  const hasActiveFilters = activeCuisines.length > 0;

  function handleFilterButtonClick() {
    setIsMenuOpen((currentValue) => !currentValue);
  }

  function handleCuisineClick(cuisine: RestaurantCuisine) {
    onCuisineToggle(cuisine);
  }

  function handleClearFilters() {
    onClearFilters();
    setIsMenuOpen(false);
  }

  return (
    <div className="relative" ref={filterRef}>
      <div className="flex min-h-9 w-full items-center rounded-[4px] bg-[#EEEEEE] px-2 py-1">
        <button
          aria-controls="cuisine-filters-menu"
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          aria-label="Open cuisine filters"
          className="grid size-6 shrink-0 place-items-center self-center cursor-pointer"
          onClick={handleFilterButtonClick}
          type="button"
        >
          <img
            alt=""
            aria-hidden="true"
            className="size-6"
            src={hasActiveFilters ? filterRedIcon : filterBlackIcon}
          />
        </button>

        {hasActiveFilters ? (
          <div className="ml-3 flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
            {activeCuisines.map((cuisine) => (
              <div className="flex items-center gap-2" key={cuisine}>
                <span className="text-sm font-medium leading-5 text-[#222222]">
                  {cuisine}
                </span>

                <button
                  aria-label={`Remove ${cuisine} filter`}
                  className="grid size-[10px] shrink-0 place-items-center"
                  onClick={() => onCuisineRemove(cuisine)}
                  type="button"
                >
                  <img
                    alt=""
                    aria-hidden="true"
                    className="size-[10px]"
                    src={crossIcon}
                  />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <span className="ml-3 select-none text-sm font-medium leading-5 text-[#222222]/50">
            Filter restaurants
          </span>
        )}
      </div>

      {isMenuOpen ? (
        <div
          aria-label="Cuisine filters"
          className="absolute left-0 top-[calc(100%+8px)] z-30 w-full rounded-[8px] border border-black/10 bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          id="cuisine-filters-menu"
          role="menu"
        >
          <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-[#222222]/50">
            Cuisine
          </p>

          <div className="flex flex-col">
            {availableCuisines.map((cuisine) => {
              const isActive = activeCuisines.includes(cuisine);

              return (
                <label
                  className="flex cursor-pointer items-center gap-3 rounded-[4px] px-1 py-2 hover:bg-[#F4F4F4]"
                  key={cuisine}
                >
                  <input
                    checked={isActive}
                    className="size-4 accent-[#F34336]"
                    onChange={() => handleCuisineClick(cuisine)}
                    type="checkbox"
                  />

                  <span className="text-sm font-medium text-[#222222]">
                    {cuisine}
                  </span>
                </label>
              );
            })}
          </div>

          {hasActiveFilters ? (
            <button
              className="mt-2 text-xs font-medium text-[#F34336] hover:underline"
              onClick={handleClearFilters}
              type="button"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}