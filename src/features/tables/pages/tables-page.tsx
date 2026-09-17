import { getErrorMessage } from '@/lib/get-error-message';

import { StaffLayout } from '@/app/layouts/staff-layout';
import { TableStatCard } from '@/features/tables/components/table-stat-card';
import { TablesFloorPlan } from '@/features/tables/components/tables-floor-plan';
import { useTablesQuery } from '@/features/tables/hooks/use-tables-query';
import { getTableStatistics } from '@/features/tables/lib/get-table-statistics';

export function TablesPage() {
  const { data: tables = [], error, isError, isPending, refetch } = useTablesQuery();

  const tableStatistics = getTableStatistics(tables);

  return (
    <StaffLayout>
      <section className="w-full">
        <h1 className="text-2xl font-semibold leading-8 text-[#222222]">Tables</h1>
        {isPending ? <TablesLoadingState /> : null}

        {isError ? (
          <TablesErrorState
            errorMessage={getErrorMessage(error)}
            onRetry={() => {
              void refetch();
            }}
          />
        ) : null}

        {!isPending && !isError && tables.length === 0 ? <TablesEmptyState /> : null}

        {!isPending && !isError && tables.length > 0 ? (
          <>
            <div className="mt-2 grid w-full grid-cols-3 gap-2">
              <TableStatCard label="Free" value={tableStatistics.free} />

              <TableStatCard label="Occupied" value={tableStatistics.occupied} />

              <TableStatCard label="Reserved" value={tableStatistics.reserved} />
            </div>

            <div className="mt-8 w-full">
              <TablesFloorPlan tables={tables} />
            </div>
          </>
        ) : null}
      </section>
    </StaffLayout>
  );
}

function TablesLoadingState() {
  return (
    <>
      <div className="mt-2 grid w-full grid-cols-3 gap-2">
        <div className="h-[92px] animate-pulse rounded-[8px] bg-[#F1F1F1]" />
        <div className="h-[92px] animate-pulse rounded-[8px] bg-[#F1F1F1]" />
        <div className="h-[92px] animate-pulse rounded-[8px] bg-[#F1F1F1]" />
      </div>

      <div className="mt-8 h-[603px] animate-pulse rounded-[8px] bg-[#F1F1F1]" />
    </>
  );
}

interface TablesErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
}

function TablesErrorState({ errorMessage, onRetry }: TablesErrorStateProps) {
  return (
    <section className="mt-6 rounded-[8px] border border-[#FF5858]/30 bg-[#FFE8E8] p-4">
      <h2 className="text-sm font-semibold text-[#222222]">Failed to load tables</h2>

      <p className="mt-1 text-sm text-[#222222]/70">{errorMessage}</p>

      <button
        className="mt-4 rounded-[4px] bg-[#222222] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#444444]"
        onClick={onRetry}
        type="button"
      >
        Try again
      </button>
    </section>
  );
}

function TablesEmptyState() {
  return (
    <section className="mt-6 rounded-[8px] border border-dashed border-black/15 bg-[#F9F9F9] p-8 text-center">
      <h2 className="text-base font-semibold text-[#222222]">No tables yet</h2>

      <p className="mt-2 text-sm text-[#222222]/50">
        Add tables to the Firestore collection to display the floor plan.
      </p>
    </section>
  );
}
