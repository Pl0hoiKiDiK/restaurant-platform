import { createFileRoute } from '@tanstack/react-router';

import { StaffLayout } from '@/app/layouts/staff-layout';

export const Route = createFileRoute('/staff/tables/')({
  component: TablesPage,
});

function TablesPage() {
  return (
    <StaffLayout>
      <h1 className="text-2xl font-semibold leading-8 text-[#222222]">
        Tables
      </h1>
    </StaffLayout>
  );
}