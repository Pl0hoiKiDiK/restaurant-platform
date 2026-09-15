import { createFileRoute } from '@tanstack/react-router';

import { StaffLayout } from '@/app/layouts/staff-layout';

export const Route = createFileRoute('/staff/tables/$tableId')({
  component: TableDetailsPage,
});

function TableDetailsPage() {
  const { tableId } = Route.useParams();

  return (
    <StaffLayout>
      <h1 className="text-2xl font-semibold leading-8 text-[#222222]">
        Table {tableId}
      </h1>
    </StaffLayout>
  );
}