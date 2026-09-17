import { isRecord } from '@/lib/validation';
import type {
  Restaurant,
  RestaurantCoordinates,
  RestaurantCuisine,
  RestaurantImageKeys,
} from '@/features/restaurants/types/restaurant.types';

function isRestaurantCuisine(value: unknown): value is RestaurantCuisine {
  return (
    value === 'Asian' ||
    value === 'Thai' ||
    value === 'Asian Fusion' ||
    value === 'Chinese'
  );
}

function isPriceLevel(value: unknown): value is '$' | '$$' | '$$$' {
  return value === '$' || value === '$$' || value === '$$$';
}

function parseCoordinates(value: unknown): RestaurantCoordinates {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('latitude' in value) ||
    !('longitude' in value) ||
    typeof value.latitude !== 'number' ||
    typeof value.longitude !== 'number' ||
    !Number.isFinite(value.latitude) ||
    Math.abs(value.latitude) > 90 ||
    !Number.isFinite(value.longitude) ||
    Math.abs(value.longitude) > 180
  ) {
    throw new Error('Restaurant has invalid coordinates.');
  }

  return {
    latitude: value.latitude,
    longitude: value.longitude,
  };
}

function parseCuisines(value: unknown): RestaurantCuisine[] {
  if (!Array.isArray(value) || !value.every(isRestaurantCuisine)) {
    throw new Error('Restaurant has invalid cuisines.');
  }

  return value;
}

function parseImageKeys(value: unknown): RestaurantImageKeys {
  if (value === null) {
    return null;
  }

  if (
    !Array.isArray(value) ||
    value.length !== 4 ||
    !value.every((imageKey) => typeof imageKey === 'string')
  ) {
    throw new Error('Restaurant has invalid image keys.');
  }

  return [value[0], value[1], value[2], value[3]];
}

export function parseRestaurant(restaurantId: string, data: unknown): Restaurant {
  if (!isRecord(data)) throw new Error('Restaurant has invalid data.');

  const {
    city,
    coordinates,
    cuisines,
    distance,
    imageKeys,
    isFeatured,
    name,
    priceLevel,
  } = data;

  if (
    typeof name !== 'string' ||
    typeof distance !== 'string' ||
    typeof city !== 'string' ||
    !isPriceLevel(priceLevel)
  ) {
    throw new Error(`Restaurant "${restaurantId}" has invalid data.`);
  }

  if (isFeatured !== undefined && typeof isFeatured !== 'boolean') {
    throw new Error(`Restaurant "${restaurantId}" has invalid featured flag.`);
  }

  return {
    id: restaurantId,
    name,
    distance,
    city,
    cuisines: parseCuisines(cuisines),
    priceLevel,
    imageKeys: parseImageKeys(imageKeys),
    coordinates: parseCoordinates(coordinates),
    isFeatured,
  };
}
