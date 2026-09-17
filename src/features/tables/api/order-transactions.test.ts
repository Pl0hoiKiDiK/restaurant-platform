import { beforeEach, describe, expect, it, vi } from 'vitest';

const mock = vi.hoisted(() => ({
  documents: new Map<string, unknown>(),
  set: vi.fn(),
  update: vi.fn(),
}));
vi.mock('@/lib/firebase', () => ({ db: {} }));
vi.mock('firebase/firestore/lite', () => ({
  doc: (_db: unknown, collection: string, id: string) => collection + '/' + id,
  serverTimestamp: () => 'server-time',
  getDoc: (reference: string) =>
    Promise.resolve({
      exists: () => mock.documents.has(reference),
      data: () => mock.documents.get(reference),
    }),
  runTransaction: async (
    _db: unknown,
    callback: (transaction: unknown) => Promise<unknown>,
  ) =>
    callback({
      get: (reference: string) =>
        Promise.resolve({
          exists: () => mock.documents.has(reference),
          data: () => mock.documents.get(reference),
        }),
      set: mock.set,
      update: mock.update,
    }),
}));

import { completeTableOrder } from '@/features/tables/api/complete-table-order';
import { getTableOrder } from '@/features/tables/api/get-table-order';
import { updateTableOrder } from '@/features/tables/api/update-table-order';

const item = {
  id: 'tea',
  name: 'Tea',
  category: 'Drinks' as const,
  price: 2.5,
  quantity: 2,
};

beforeEach(() => {
  mock.documents.clear();
  mock.documents.set('tables/table-1', { number: 1, status: 'occupied' });
  mock.documents.set('tableOrders/table-1', {
    tableId: 'table-1',
    revision: 3,
    items: [item],
  });
});

describe('order persistence', () => {
  it('returns an empty order when a free table has no order document', async () => {
    mock.documents.delete('tableOrders/table-1');
    expect(await getTableOrder('table-1')).toEqual({
      id: 'table-1',
      tableId: 'table-1',
      items: [],
      revision: 0,
    });
  });
  it('rejects stale updates before writing', async () => {
    await expect(
      updateTableOrder({ tableId: 'table-1', items: [], expectedRevision: 2 }),
    ).rejects.toThrow(/another session/);
    expect(mock.set).not.toHaveBeenCalled();
  });
  it('refuses updates after checkout', async () => {
    mock.documents.set('tables/table-1', { number: 1, status: 'free' });
    await expect(
      updateTableOrder({ tableId: 'table-1', items: [item], expectedRevision: 3 }),
    ).rejects.toThrow(/no active order/);
    expect(mock.set).not.toHaveBeenCalled();
  });
  it('saves valid edits with an incremented revision', async () => {
    const order = await updateTableOrder({
      tableId: 'table-1',
      items: [{ ...item, quantity: 3 }],
      expectedRevision: 3,
    });
    expect(order.revision).toBe(4);
    expect(mock.set).toHaveBeenCalledWith(
      'tableOrders/table-1',
      expect.objectContaining({ revision: 4 }),
      { merge: true },
    );
  });
  it('completes the order and frees the table in the same transaction', async () => {
    const result = await completeTableOrder({
      tableId: 'table-1',
      expectedRevision: 3,
      discountPercent: 10,
    });
    expect(result.total).toBe(4.5);
    expect(mock.set.mock.calls[0]?.[1]).toHaveProperty('lastReceipt.total', 4.5);
    expect(result.order.items).toEqual([]);
    expect(mock.set).toHaveBeenCalledWith(
      'tableOrders/table-1',
      expect.objectContaining({
        revision: 4,
        items: [],
      }),
      { merge: true },
    );
    expect(mock.update).toHaveBeenCalledWith('tables/table-1', {
      status: 'free',
      reservationTime: null,
    });
  });
  it('rejects stale checkout and leaves both documents untouched', async () => {
    await expect(
      completeTableOrder({
        tableId: 'table-1',
        expectedRevision: 2,
        discountPercent: 10,
      }),
    ).rejects.toThrow();
    expect(mock.set).not.toHaveBeenCalled();
    expect(mock.update).not.toHaveBeenCalled();
  });
});
