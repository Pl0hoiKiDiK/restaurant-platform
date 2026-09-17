import { getRestaurantImage } from '@/features/restaurants/lib/restaurant-images';
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
  const imageKeys = restaurant.imageKeys;
  const hasImages = imageKeys !== null;

  return (
    <button
      aria-pressed={isSelected}
      className={[
        'w-full overflow-hidden rounded-[8px] border bg-white text-left transition-colors',
        hasImages ? 'min-h-[152px] p-4' : 'min-h-[110px] p-4',
        isSelected
          ? 'border-[#F34336] ring-1 ring-[#F34336]/20'
          : 'border-black/10 hover:border-black/20',
      ].join(' ')}
      onClick={() => onSelect(restaurant.id)}
      type="button"
    >
      {imageKeys !== null ? (
        <div className="grid h-[60px] w-full grid-cols-4 gap-1">
          {imageKeys.map((imageKey, index) => (
            <img
              alt={`${restaurant.name} dish ${index + 1}`}
              className="h-full w-full rounded-[2px] object-cover"
              key={imageKey}
              src={getRestaurantImage(imageKey)}
            />
          ))}
        </div>
      ) : null}

      <div className={hasImages ? 'mt-4' : ''}>
        <div className="flex min-w-0 items-center justify-between gap-2">
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
      </div>
    </button>
  );
}