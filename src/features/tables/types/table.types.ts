export type TableStatus = 'free' | 'occupied' | 'reserved';

export interface RestaurantTable {
  id: string;
  number: number;
  status: TableStatus;
  reservationTime?: string;
}

export interface TableStatistics {
  free: number;
  occupied: number;
  reserved: number;
}
