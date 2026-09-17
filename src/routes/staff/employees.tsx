import { createFileRoute } from "@tanstack/react-router";

import { ManagerLayout } from "@/app/layouts/manager-layout";
import { EmployeeStatCard } from "@/features/employees/components/employee-stat-card";
import { EmployeesTable } from "@/features/employees/components/employees-table";
import { EmployeeToolbar } from "@/features/employees/components/employee-toolbar";
import { useEmployeesQuery } from "@/features/employees/hooks/use-employees-query";

export const Route = createFileRoute("/staff/employees")({
  component: EmployeesPage,
});

function EmployeesPage() {
  const { data: employees = [], isError, isLoading } = useEmployeesQuery();

  const employeeStatistics = {
    allEmployees: employees.length,
    onShift: employees.filter((employee) => employee.shift === "A").length,
    idle: employees.filter((employee) => employee.shift === "B").length,
  };

  if (isLoading) {
    return (
      <ManagerLayout>
        <div className="flex min-h-[320px] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading employees...</p>
        </div>
      </ManagerLayout>
    );
  }

  if (isError) {
    return (
      <ManagerLayout>
        <div className="flex min-h-[320px] items-center justify-center">
          <p className="text-sm text-destructive">
            Failed to load employees. Please try again.
          </p>
        </div>
      </ManagerLayout>
    );
  }

  return (
    <ManagerLayout>
      <section className="w-full">
        <h1 className="text-2xl font-semibold leading-8 text-[#222222]">
          Employees
        </h1>

        <div className="mt-2 grid w-full grid-cols-3 gap-2">
          <EmployeeStatCard
            label="All Employees"
            value={employeeStatistics.allEmployees}
          />

          <EmployeeStatCard
            label="On Shift"
            value={employeeStatistics.onShift}
          />

          <EmployeeStatCard label="Idle" value={employeeStatistics.idle} />
        </div>

        <section className="mt-2 w-full bg-[#F9F9F9] p-4">
          <EmployeeToolbar />

          <EmployeesTable employees={employees} />
        </section>
      </section>
    </ManagerLayout>
  );
}
