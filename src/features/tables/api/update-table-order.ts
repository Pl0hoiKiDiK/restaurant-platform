import { runTransaction } from 'firebase/firestore/lite';
import { readOrderTransaction } from '@/features/tables/api/read-order-transaction';
import { toFirestoreOrderItems } from '@/features/tables/lib/map-order-item';
import {
  assertOrderRevision,
  parseTableOrder,
} from '@/features/tables/lib/parse-table-order';
import type { OrderItem, TableOrder } from '@/features/tables/types/order.types';
import { db } from '@/lib/firebase';

interface UpdateTableOrderParams {
  tableId: string;
  items: OrderItem[];
  expectedRevision: number;
}

export async function updateTableOrder({
  tableId,
  items,
  expectedRevision,
}: UpdateTableOrderParams): Promise<TableOrder> {
  return runTransaction(db, async (transaction) => {
    const { table, order, orderReference } = await readOrderTransaction(
      transaction,
      tableId,
    );
    if (table.status !== 'occupied') throw new Error('This table has no active order.');
    assertOrderRevision(order, expectedRevision);
    const nextOrder = parseTableOrder(tableId, {
      tableId,
      items,
      revision: order.revision + 1,
    });
    transaction.set(
      orderReference,
      {
        tableId,
        items: toFirestoreOrderItems(nextOrder.items),
        revision: nextOrder.revision,
      },
      { merge: true },
    );
    return nextOrder;
  });
}
