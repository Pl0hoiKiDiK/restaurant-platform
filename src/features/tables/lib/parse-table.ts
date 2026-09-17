import type {
  RestaurantTable,
  TableStatus,
} from '@/features/tables/types/table.types';

export interface FirestoreTableData {
  number: number;
  reservationTime: string | null;
  status: TableStatus;
}

function isTableStatus(value: unknown): value is TableStatus {
  return value === 'free' || value === 'occupied' || value === 'reserved';
}

export function parseTable(
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
