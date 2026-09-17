import { doc, writeBatch } from 'firebase/firestore';

import { firestoreCollections } from '@/features/tables/lib/firestore-collections';
import { mockRestaurants } from '@/features/restaurants/data/mock-restaurants';
import { db } from '@/lib/firebase';

export async function seedRestaurantsData(): Promise<void> {
  const batch = writeBatch(db);

  mockRestaurants.forEach((restaurant) => {
    batch.set(doc(db, firestoreCollections.restaurants, restaurant.id), {
      name: restaurant.name,
      distance: restaurant.distance,
      city: restaurant.city,
      cuisines: restaurant.cuisines,
      priceLevel: restaurant.priceLevel,
      imageKeys: restaurant.imageKeys,
      coordinates: restaurant.coordinates,
      isFeatured: restaurant.isFeatured ?? false,
    });
  });

  await batch.commit();
}