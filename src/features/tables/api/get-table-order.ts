import { doc, getDoc } from 'firebase/firestore';

import { firestoreCollections } from '@/features/tables/lib/firestore-collections';
import {
  parseOrderItem,
  type FirestoreOrderItem,
} from '@/features/tables/lib/map-order-item';
import type { TableOrder } from '@/features/tables/types/order.types';
import { db } from '@/lib/firebase';

interface FirestoreTableOrderData {
  tableId: string;
  items: FirestoreOrderItem[];
}

export async function getTableOrder(tableId: string): Promise<TableOrder> {
  const orderReference = doc(
    db,
    firestoreCollections.tableOrders,
    tableId,
  );
  const orderSnapshot = await getDoc(orderReference);

  if (!orderSnapshot.exists()) {
    throw new Error(`Order for table "${tableId}" was not found.`);
  }

  const data = orderSnapshot.data() as FirestoreTableOrderData;

  if (data.tableId !== tableId || !Array.isArray(data.items)) {
    throw new Error(`Order for table "${tableId}" has invalid data.`);
  }

  return {
    id: orderSnapshot.id,
    tableId: data.tableId,
    items: data.items.map((item) => parseOrderItem(orderSnapshot.id, item)),
  };
}
