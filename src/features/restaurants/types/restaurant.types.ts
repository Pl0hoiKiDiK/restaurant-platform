export type RestaurantCuisine =
  | 'Asian'
  | 'Thai'
  | 'Asian Fusion'
  | 'Chinese';

export interface RestaurantCoordinates {
  latitude: number;
  longitude: number;
}

export interface Restaurant {
  id: string;
  name: string;
  distance: string;
  city: string;
  cuisines: RestaurantCuisine[];
  priceLevel: '$' | '$$' | '$$$';
  imageColors: [string, string, string, string];
  coordinates: RestaurantCoordinates;
  isFeatured?: boolean;
}