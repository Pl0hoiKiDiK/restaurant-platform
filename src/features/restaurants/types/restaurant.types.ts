export type RestaurantCuisine = 'Asian' | 'Thai' | 'Asian Fusion' | 'Chinese';

export interface RestaurantCoordinates {
  latitude: number;
  longitude: number;
}

export type RestaurantImageKeys = [string, string, string, string] | null;

export interface Restaurant {
  id: string;
  name: string;
  distance: string;
  city: string;
  cuisines: RestaurantCuisine[];
  priceLevel: '$' | '$$' | '$$$';
  imageKeys: RestaurantImageKeys;
  coordinates: RestaurantCoordinates;
  isFeatured?: boolean;
}
