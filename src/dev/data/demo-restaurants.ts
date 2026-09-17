import type { Restaurant } from '@/features/restaurants/types/restaurant.types';

export const demoRestaurants: Restaurant[] = [
  {
    id: 'mikado',
    name: 'Mikado',
    distance: '100ft',
    city: 'New York City',
    cuisines: ['Asian'],
    priceLevel: '$$',
    imageKeys: ['mikado-1', 'mikado-2', 'mikado-3', 'mikado-4'],
    coordinates: {
      latitude: 40.7568,
      longitude: -74.0142,
    },
  },
  {
    id: 'nana-thai-street',
    name: 'Nana Thai Street',
    distance: '500ft',
    city: 'New York City',
    cuisines: ['Asian Fusion'],
    priceLevel: '$$',
    imageKeys: ['nana-1', 'nana-2', 'nana-3', 'nana-4'],
    coordinates: {
      latitude: 40.7147,
      longitude: -73.9973,
    },
  },
  {
    id: 'up-thai',
    name: 'Up Thai',
    distance: '550ft',
    city: 'New York City',
    cuisines: ['Thai'],
    priceLevel: '$$',
    imageKeys: null,
    coordinates: {
      latitude: 40.7388,
      longitude: -74.0576,
    },
  },
  {
    id: 'mala-project',
    name: 'MaLa Project',
    distance: '900ft',
    city: 'New York City',
    cuisines: ['Chinese'],
    priceLevel: '$$',
    imageKeys: ['mala-1', 'mala-2', 'mala-3', 'mala-4'],
    coordinates: {
      latitude: 40.756,
      longitude: -74.1745,
    },
  },
  {
    id: 'thai-noodle-house',
    name: 'Thai Noodle House',
    distance: '900ft',
    city: 'New York City',
    cuisines: ['Thai'],
    priceLevel: '$$',
    imageKeys: ['thai-1', 'thai-2', 'thai-3', 'thai-4'],
    coordinates: {
      latitude: 40.6755,
      longitude: -74.1215,
    },
  },
];
