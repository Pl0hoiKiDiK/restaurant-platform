import { collection, getDocs } from 'firebase/firestore/lite';
import { parseTable } from '@/features/tables/lib/parse-table';
import type { RestaurantTable } from '@/features/tables/types/table.types';
import { db } from '@/lib/firebase';
import { firestoreCollections } from '@/lib/firestore-collections';

export async function getTables(): Promise<RestaurantTable[]> {
  const snapshot = await getDocs(collection(db, firestoreCollections.tables));
  return snapshot.docs
    .map((document) => parseTable(document.id, document.data()))
    .sort((first, second) => first.number - second.number);
}
