import { createFileRoute } from '@tanstack/react-router';

import { ManagerLayout } from '@/app/layouts/manager-layout';
import { EmployeeStatCard } from '@/features/employees/components/employee-stat-card';
import { EmployeesTable } from '@/features/employees/components/employees-table';
import { EmployeeToolbar } from '@/features/employees/components/employee-toolbar';
import {
  mockEmployees,
  mockEmployeeStatistics,
} from '@/features/employees/data/mock-employees';

export const Route = createFileRoute('/staff/employees')({
  component: EmployeesPage,
});

function EmployeesPage() {
  return (
    <ManagerLayout>
      <section className="w-full">
        <h1 className="text-2xl font-semibold leading-8 text-[#222222]">
          Employees
        </h1>

        <div className="mt-2 grid w-full grid-cols-3 gap-2">
          <EmployeeStatCard
            label="All Employees"
            value={mockEmployeeStatistics.allEmployees}
          />

          <EmployeeStatCard
            label="On Shift"
            value={mockEmployeeStatistics.onShift}
          />

          <EmployeeStatCard
            label="Idle"
            value={mockEmployeeStatistics.idle}
          />
        </div>

        <section className="mt-2 w-full bg-[#F9F9F9] p-4">
          <EmployeeToolbar />

          <EmployeesTable employees={mockEmployees} />
        </section>
      </section>
    </ManagerLayout>
  );
}