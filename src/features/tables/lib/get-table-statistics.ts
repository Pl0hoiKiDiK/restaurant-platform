import type {
  RestaurantTable,
  TableStatistics,
} from '@/features/tables/types/table.types';

const emptyTableStatistics: TableStatistics = {
  free: 0,
  occupied: 0,
  reserved: 0,
};

export function getTableStatistics(
  tables: RestaurantTable[],
): TableStatistics {
  return tables.reduce<TableStatistics>(
    (statistics, table) => {
      statistics[table.status] += 1;

      return statistics;
    },
    { ...emptyTableStatistics },
  );
}