import { collection, getDocs } from 'firebase/firestore';

import { parseRestaurant } from '@/features/restaurants/lib/parse-restaurant';
import { firestoreCollections } from '@/features/tables/lib/firestore-collections';
import type { Restaurant } from '@/features/restaurants/types/restaurant.types';
import { db } from '@/lib/firebase';

export async function getRestaurants(): Promise<Restaurant[]> {
  const restaurantsSnapshot = await getDocs(
    collection(db, firestoreCollections.restaurants),
  );

  return restaurantsSnapshot.docs
    .map((restaurantDocument) =>
      parseRestaurant(
        restaurantDocument.id,
        restaurantDocument.data() as Record<string, unknown>,
      ),
    )
    .sort((firstRestaurant, secondRestaurant) =>
      firstRestaurant.name.localeCompare(secondRestaurant.name),
    );
}