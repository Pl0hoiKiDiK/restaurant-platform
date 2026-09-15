import { createFileRoute } from '@tanstack/react-router';

import { StaffLayout } from '@/app/layouts/staff-layout';
import { TableStatCard } from '@/features/tables/components/table-stat-card';
import { TablesFloorPlan } from '@/features/tables/components/tables-floor-plan';
import {
  mockTables,
  mockTableStatistics,
} from '@/features/tables/data/mock-tables';

export const Route = createFileRoute('/staff/tables/')({
  component: TablesPage,
});

function TablesPage() {
  return (
    <StaffLayout>
      <section className="w-full">
        <h1 className="text-2xl font-semibold leading-8 text-[#222222]">
          Tables
        </h1>

        <div className="mt-2 grid w-full grid-cols-3 gap-2">
          <TableStatCard
            label="Free"
            value={mockTableStatistics.free}
          />

          <TableStatCard
            label="Occupied"
            value={mockTableStatistics.occupied}
          />

          <TableStatCard
            label="Reserved"
            value={mockTableStatistics.reserved}
          />
        </div>

        <div className="mt-8 w-full">
          <TablesFloorPlan tables={mockTables} />
        </div>
      </section>
    </StaffLayout>
  );
}