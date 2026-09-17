import type { RestaurantTable, TableStatus } from '@/features/tables/types/table.types';
import { isRecord } from '@/lib/validation';

function isTableStatus(value: unknown): value is TableStatus {
  return value === 'free' || value === 'occupied' || value === 'reserved';
}

export function parseTable(tableId: string, data: unknown): RestaurantTable {
  if (
    !isRecord(data) ||
    typeof data.number !== 'number' ||
    !Number.isSafeInteger(data.number) ||
    data.number < 1 ||
    !isTableStatus(data.status) ||
    (data.reservationTime != null &&
      (typeof data.reservationTime !== 'string' ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.reservationTime)))
  ) {
    throw new Error('Table "' + tableId + '" has invalid data.');
  }

  return {
    id: tableId,
    number: data.number,
    status: data.status,
    reservationTime:
      typeof data.reservationTime === 'string' ? data.reservationTime : undefined,
  };
}
