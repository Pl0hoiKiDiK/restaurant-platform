import { runTransaction, serverTimestamp } from 'firebase/firestore/lite';
import { readOrderTransaction } from '@/features/tables/api/read-order-transaction';
import { calculateOrderTotal } from '@/features/tables/lib/calculate-order-total';
import { toFirestoreOrderItems } from '@/features/tables/lib/map-order-item';
import { assertOrderRevision } from '@/features/tables/lib/parse-table-order';
import { db } from '@/lib/firebase';

interface CompleteTableOrderParams {
  tableId: string;
  expectedRevision: number;
  discountPercent: number;
}

export async function completeTableOrder({
  tableId,
  expectedRevision,
  discountPercent,
}: CompleteTableOrderParams) {
  return runTransaction(db, async (transaction) => {
    const { table, order, tableReference, orderReference } = await readOrderTransaction(
      transaction,
      tableId,
    );
    if (table.status !== 'occupied') throw new Error('This table has no active order.');
    assertOrderRevision(order, expectedRevision);
    if (order.items.length === 0)
      throw new Error('Add a dish before completing the order.');
    const totals = calculateOrderTotal(order.items, discountPercent);
    const nextOrder = { ...order, items: [], revision: order.revision + 1 };
    transaction.set(
      orderReference,
      {
        tableId,
        items: [],
        revision: nextOrder.revision,
        completedAt: serverTimestamp(),
        lastReceipt: {
          items: toFirestoreOrderItems(order.items),
          discountPercent,
          ...totals,
        },
      },
      { merge: true },
    );
    transaction.update(tableReference, { reservationTime: null, status: 'free' });
    return { order: nextOrder, total: totals.total };
  });
}
