import { doc, setDoc } from 'firebase/firestore';

import { firestoreCollections } from '@/features/tables/lib/firestore-collections';
import { toFirestoreOrderItems } from '@/features/tables/lib/map-order-item';
import type {
  OrderItem,
  TableOrder,
} from '@/features/tables/types/order.types';
import { db } from '@/lib/firebase';

interface UpdateTableOrderParams {
  tableId: string;
  items: OrderItem[];
}

export async function updateTableOrder({
  tableId,
  items,
}: UpdateTableOrderParams): Promise<TableOrder> {
  const orderReference = doc(
    db,
    firestoreCollections.tableOrders,
    tableId,
  );

  await setDoc(
    orderReference,
    {
      tableId,
      items: toFirestoreOrderItems(items),
    },
    { merge: true },
  );

  return {
    id: tableId,
    tableId,
    items,
  };
}
