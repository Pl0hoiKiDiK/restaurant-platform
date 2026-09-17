import { parseOrderItem } from '@/features/tables/lib/map-order-item';
import type { TableOrder } from '@/features/tables/types/order.types';
import { isRecord, isUnknownArray } from '@/lib/validation';

export function createEmptyOrder(tableId: string): TableOrder {
  return { id: tableId, tableId, items: [], revision: 0 };
}

export function parseTableOrder(tableId: string, data: unknown): TableOrder {
  if (!isRecord(data) || data.tableId !== tableId || !isUnknownArray(data.items)) {
    throw new Error('Order for table "' + tableId + '" has invalid data.');
  }

  // Existing demo documents predate optimistic concurrency checks.
  const revision = data.revision ?? 0;
  if (typeof revision !== 'number' || !Number.isSafeInteger(revision) || revision < 0) {
    throw new Error('Order has an invalid revision.');
  }
  const items = data.items.map((item) => parseOrderItem(tableId, item));
  if (new Set(items.map((item) => item.id)).size !== items.length) {
    throw new Error('Order contains duplicate dishes.');
  }

  return { id: tableId, tableId, items, revision };
}

export function assertOrderRevision(order: TableOrder, expectedRevision: number): void {
  if (order.revision !== expectedRevision) {
    throw new Error(
      'The order changed in another session. Review the refreshed order and try again.',
    );
  }
}
