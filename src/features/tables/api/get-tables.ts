import { collection, getDocs } from 'firebase/firestore';

import type {
  RestaurantTable,
  TableStatus,
} from '@/features/tables/types/table.types';
import { db } from '@/lib/firebase';

interface FirestoreTableData {
  number: number;
  reservationTime: string | null;
  status: TableStatus;
}

function isTableStatus(value: unknown): value is TableStatus {
  return value === 'free' || value === 'occupied' || value === 'reserved';
}

function parseTable(
  tableId: string,
  data: FirestoreTableData,
): RestaurantTable {
  if (!Number.isInteger(data.number) || data.number < 1) {
    throw new Error(`Table "${tableId}" has an invalid number.`);
  }

  if (!isTableStatus(data.status)) {
    throw new Error(`Table "${tableId}" has an invalid status.`);
  }

  return {
    id: tableId,
    number: data.number,
    reservationTime: data.reservationTime ?? undefined,
    status: data.status,
  };
}

export async function getTables(): Promise<RestaurantTable[]> {
  const tablesSnapshot = await getDocs(collection(db, 'tables'));

  return tablesSnapshot.docs
    .map((tableDocument) => {
      const data = tableDocument.data() as FirestoreTableData;

      return parseTable(tableDocument.id, data);
    })
    .sort((firstTable, secondTable) => firstTable.number - secondTable.number);
}