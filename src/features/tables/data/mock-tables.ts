import type {
  RestaurantTable,
  TableStatistics,
} from '@/features/tables/types/table.types';

export const mockTables: RestaurantTable[] = [
  { id: 'table-1', number: 1, status: 'occupied' },
  { id: 'table-2', number: 2, status: 'reserved', reservationTime: '22:30' },
  { id: 'table-3', number: 3, status: 'occupied' },
  { id: 'table-4', number: 4, status: 'free' },
  { id: 'table-5', number: 5, status: 'free' },

  { id: 'table-6', number: 6, status: 'occupied' },
  { id: 'table-7', number: 7, status: 'occupied' },
  { id: 'table-8', number: 8, status: 'free' },
  { id: 'table-9', number: 9, status: 'free' },
  { id: 'table-10', number: 10, status: 'free' },

  { id: 'table-11', number: 11, status: 'reserved', reservationTime: '18:00' },
  { id: 'table-12', number: 12, status: 'reserved', reservationTime: '18:00' },
  { id: 'table-13', number: 13, status: 'free' },
  { id: 'table-14', number: 14, status: 'free' },
  { id: 'table-15', number: 15, status: 'free' },

  { id: 'table-a2', number: 16, status: 'free' },
  { id: 'table-a1', number: 17, status: 'reserved', reservationTime: '21:00' },
];

export const mockTableStatistics: TableStatistics = {
  free: 13,
  occupied: 4,
  reserved: 4,
};