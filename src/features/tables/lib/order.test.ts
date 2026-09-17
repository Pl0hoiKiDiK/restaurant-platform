import { describe, expect, it } from 'vitest';
import { calculateOrderTotal } from '@/features/tables/lib/calculate-order-total';
import { parseOrderItem } from '@/features/tables/lib/map-order-item';
import { parseTable } from '@/features/tables/lib/parse-table';
import {
  assertOrderRevision,
  createEmptyOrder,
  parseTableOrder,
} from '@/features/tables/lib/parse-table-order';

const item = {
  id: 'dish-1',
  name: 'Tea',
  category: 'Drinks' as const,
  price: 0.1,
  quantity: 3,
};

describe('Firestore boundary validation', () => {
  it.each([
    null,
    [],
    {},
    { ...item, price: NaN },
    { ...item, price: Infinity },
    { ...item, quantity: 1.5 },
    { ...item, quantity: 0 },
    { ...item, comment: 12 },
    { ...item, category: 'Unknown' },
    { ...item, comment: 'x'.repeat(161) },
  ])('rejects malformed order items: %j', (value) => {
    expect(() => parseOrderItem('table-1', value)).toThrow();
  });
  it('normalizes nullable comments', () => {
    expect(parseOrderItem('table-1', { ...item, comment: null }).comment).toBeUndefined();
  });
  it('rejects duplicate dishes and mismatching table IDs', () => {
    expect(() =>
      parseTableOrder('table-1', { tableId: 'table-1', items: [item, item] }),
    ).toThrow();
    expect(() => parseTableOrder('table-2', { tableId: 'table-1', items: [] })).toThrow();
  });
  it('supports legacy orders without a revision', () => {
    expect(
      parseTableOrder('table-1', { tableId: 'table-1', items: [item] }).revision,
    ).toBe(0);
  });
  it('detects stale edits', () => {
    expect(() =>
      assertOrderRevision({ ...createEmptyOrder('table-1'), revision: 2 }, 1),
    ).toThrow(/another session/);
  });
  it.each([
    null,
    {},
    { number: 0, status: 'free' },
    { number: 1, status: 'unknown' },
    { number: 1, status: 'reserved', reservationTime: '25:90' },
  ])('rejects invalid tables: %j', (value) => {
    expect(() => parseTable('table-1', value)).toThrow();
  });
  it('accepts reserved tables with valid time', () => {
    expect(
      parseTable('table-1', { number: 1, status: 'reserved', reservationTime: '18:30' })
        .reservationTime,
    ).toBe('18:30');
  });
});

describe('order totals', () => {
  it('calculates in cents and rounds the discount once', () => {
    expect(calculateOrderTotal([item], 5)).toEqual({
      subtotal: 0.3,
      discount: 0.02,
      total: 0.28,
    });
  });
  it('handles an empty order and a full discount', () => {
    expect(calculateOrderTotal([]).total).toBe(0);
    expect(calculateOrderTotal([item], 100).total).toBe(0);
  });
  it.each([-1, 101, NaN, Infinity])('rejects invalid discounts: %s', (value) => {
    expect(() => calculateOrderTotal([item], value)).toThrow();
  });
});
