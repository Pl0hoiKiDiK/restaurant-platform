import type { RestaurantTable } from '@/features/tables/types/table.types';

import { RestaurantTableCard } from './restaurant-table-card';

interface TablePosition {
  tableId: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

interface TablesFloorPlanProps {
  tables: RestaurantTable[];
}

const tablePositions: TablePosition[] = [
  { tableId: 'table-1', top: 35, left: 16 },
  { tableId: 'table-2', top: 35, left: 206 },
  { tableId: 'table-3', top: 35, left: 396 },
  { tableId: 'table-4', top: 35, left: 586 },
  { tableId: 'table-5', top: 35, left: 776 },

  { tableId: 'table-6', top: 245, left: 16 },
  { tableId: 'table-7', top: 245, left: 234 },
  { tableId: 'table-8', top: 245, left: 452 },
  { tableId: 'table-9', top: 245, left: 670 },
  { tableId: 'table-10', top: 245, left: 888 },

  { tableId: 'table-11', top: 455, left: 16 },
  { tableId: 'table-12', top: 455, left: 206 },
  { tableId: 'table-13', top: 455, left: 396 },
  { tableId: 'table-14', top: 455, left: 586 },
  { tableId: 'table-15', top: 455, left: 776 },

  { tableId: 'table-a2', top: 21, right: 16 },
  { tableId: 'table-a1', bottom: 16, right: 16 },
];

export function TablesFloorPlan({ tables }: TablesFloorPlanProps) {
  const tablesById = new Map(
    tables.map((table) => [table.id, table]),
  );

  return (
    <section className="w-full overflow-x-auto bg-[#F9F9F9]">
      <div className="relative mx-auto h-[603px] w-[1132px]">
        {tablePositions.map(({ tableId, top, left, right, bottom }) => {
          const table = tablesById.get(tableId);

          if (!table) {
            return null;
          }

          return (
            <div
              className="absolute"
              key={table.id}
              style={{
                top,
                left,
                right,
                bottom,
              }}
            >
              <RestaurantTableCard table={table} />
            </div>
          );
        })}
      </div>
    </section>
  );
}