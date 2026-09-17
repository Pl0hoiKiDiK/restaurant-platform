import type { RestaurantTable } from "@/features/tables/types/table.types";

import { tablePositions } from "@/features/tables/data/table-positions";

import { RestaurantTableCard } from "./restaurant-table-card";

interface TablesFloorPlanProps {
  tables: RestaurantTable[];
}

export function TablesFloorPlan({ tables }: TablesFloorPlanProps) {
  const tablesById = new Map(tables.map((table) => [table.id, table]));

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