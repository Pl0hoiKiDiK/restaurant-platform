import { doc, getDoc } from 'firebase/firestore';

import { firestoreCollections } from '@/features/tables/lib/firestore-collections';
import {
  parseTable,
  type FirestoreTableData,
} from '@/features/tables/lib/parse-table';
import type { RestaurantTable } from '@/features/tables/types/table.types';
import { db } from '@/lib/firebase';

export async function getTable(tableId: string): Promise<RestaurantTable> {
  const tableReference = doc(db, firestoreCollections.tables, tableId);
  const tableSnapshot = await getDoc(tableReference);

  if (!tableSnapshot.exists()) {
    throw new Error(`Table "${tableId}" was not found.`);
  }

  return parseTable(
    tableSnapshot.id,
    tableSnapshot.data() as FirestoreTableData,
  );
}
