import { doc, getDoc } from 'firebase/firestore/lite';
import { parseTable } from '@/features/tables/lib/parse-table';
import type { RestaurantTable } from '@/features/tables/types/table.types';
import { db } from '@/lib/firebase';
import { firestoreCollections } from '@/lib/firestore-collections';

export async function getTable(tableId: string): Promise<RestaurantTable> {
  const snapshot = await getDoc(doc(db, firestoreCollections.tables, tableId));
  if (!snapshot.exists()) throw new Error('Table was not found.');
  return parseTable(snapshot.id, snapshot.data());
}
