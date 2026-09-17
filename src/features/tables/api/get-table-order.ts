import { doc, getDoc } from 'firebase/firestore/lite';
import {
  createEmptyOrder,
  parseTableOrder,
} from '@/features/tables/lib/parse-table-order';
import { db } from '@/lib/firebase';
import { firestoreCollections } from '@/lib/firestore-collections';
import type { TableOrder } from '@/features/tables/types/order.types';

export async function getTableOrder(tableId: string): Promise<TableOrder> {
  const snapshot = await getDoc(doc(db, firestoreCollections.tableOrders, tableId));
  return snapshot.exists()
    ? parseTableOrder(tableId, snapshot.data())
    : createEmptyOrder(tableId);
}
