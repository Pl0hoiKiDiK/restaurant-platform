import { collection, getDocs } from 'firebase/firestore';

import { firestoreCollections } from '@/features/tables/lib/firestore-collections';
import {
  parseTable,
  type FirestoreTableData,
} from '@/features/tables/lib/parse-table';
import type { RestaurantTable } from '@/features/tables/types/table.types';
import { db } from '@/lib/firebase';

export async function getTables(): Promise<RestaurantTable[]> {
  const tablesSnapshot = await getDocs(
    collection(db, firestoreCollections.tables),
  );

  return tablesSnapshot.docs
    .map((tableDocument) => {
      const data = tableDocument.data() as FirestoreTableData;

      return parseTable(tableDocument.id, data);
    })
    .sort((firstTable, secondTable) => firstTable.number - secondTable.number);
}
