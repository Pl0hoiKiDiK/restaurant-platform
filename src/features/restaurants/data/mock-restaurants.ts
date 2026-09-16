import type { Restaurant } from '@/features/restaurants/types/restaurant.types';

export const mockRestaurants: Restaurant[] = [
  {
    id: 'mikado',
    name: 'Mikado',
    distance: '100ft',
    city: 'New York City',
    cuisines: ['Asian'],
    priceLevel: '$$',
    imageColors: ['#D6782D', '#D94D48', '#A91F3D', '#B96A35'],
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
    imageColors: ['#CF6B36', '#E0AA42', '#B18A31', '#9C513D'],
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
    imageColors: ['#D4A14C', '#C88534', '#DEB33D', '#A67432'],
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
    imageColors: ['#7F9224', '#D5A42E', '#D49A20', '#5D4C26'],
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
    imageColors: ['#D69728', '#AA4D2C', '#C86A25', '#9B4A2D'],
    coordinates: {
      latitude: 40.6755,
      longitude: -74.1215,
    },
  },
];