import type { Restaurant } from '@/features/restaurants/types/restaurant.types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onSelect: (restaurantId: string) => void;
}

export function RestaurantCard({
  restaurant,
  isSelected,
  onSelect,
}: RestaurantCardProps) {
  const cuisineText = restaurant.cuisines.join(' • ');

  return (
    <button
      aria-pressed={isSelected}
      className={[
        'min-h-[152px] w-full rounded-[8px] border bg-white p-4 text-left transition-colors',
        isSelected
          ? 'border-[#F34336] ring-1 ring-[#F34336]/20'
          : 'border-black/10 hover:border-black/20',
      ].join(' ')}
      onClick={() => onSelect(restaurant.id)}
      type="button"
    >
      <div className="grid w-full grid-cols-4 gap-1">
        {restaurant.imageColors.map((color, index) => (
          <div
            className="w-full rounded-[2px] [aspect-ratio:52/60]"
            key={`${restaurant.id}-${index}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="mt-4 flex min-w-0 items-center justify-between gap-2">
        <h2 className="min-w-0 truncate text-base font-bold leading-5 text-[#222222]">
          {restaurant.name}
        </h2>

        <span className="shrink-0 text-xs font-normal leading-4 text-[#222222]/50">
          {restaurant.distance}
        </span>
      </div>

      <p className="mt-2 truncate text-sm font-normal leading-5 text-[#222222]/50">
        {restaurant.city} • {cuisineText} • {restaurant.priceLevel}
      </p>
    </button>
  );
}