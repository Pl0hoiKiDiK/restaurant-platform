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
        'restaurant-card w-full shrink-0 overflow-hidden rounded-[8px] border bg-white text-left transition-colors',
        hasImages ? 'restaurant-card-with-images' : '',
        isSelected
          ? 'border-[#F34336] ring-1 ring-[#F34336]/20'
          : 'border-black/10 hover:border-black/20',
      ].join(' ')}
      onClick={() => onSelect(restaurant.id)}
      type="button"
    >
      {imageKeys !== null ? (
        <div className="restaurant-card-images grid w-full grid-cols-4 gap-1">
          {imageKeys.map((imageKey, index) => (
            <img
              alt={`${restaurant.name} dish ${index + 1}`}
              className="block h-full min-h-0 w-full min-w-0 rounded-[2px] object-cover"
              decoding="async"
              width={52}
              height={60}
              key={imageKey}
              src={getRestaurantImage(imageKey)}
            />
          ))}
        </div>
      ) : null}

      <div className={hasImages ? 'mt-2 sm:mt-4' : ''}>
        <div className="flex min-w-0 items-center justify-between gap-1 sm:gap-2">
          <h2 className="min-w-0 truncate text-[11px] font-bold leading-4 sm:text-base sm:leading-5 text-[#222222]">
            {restaurant.name}
          </h2>

          <span className="shrink-0 text-[9px] font-normal leading-4 sm:text-xs text-[#222222]/70">
            {restaurant.distance}
          </span>
        </div>

        <p className="mt-1 truncate text-[10px] sm:mt-2 sm:text-sm font-normal leading-5 text-[#222222]/70">
          {restaurant.city} • {cuisineText} • {restaurant.priceLevel}
        </p>
      </div>
    </button>
  );
}
