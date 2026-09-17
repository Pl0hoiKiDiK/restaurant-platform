import { toast } from 'sonner';

import { getEmployeeImage } from '@/features/employees/lib/employee-images';
import type { Employee } from '@/features/employees/types/employee.types';

interface EmployeesTableProps {
  employees: Employee[];
}

function handleAddBonus(employeeName: string) {
  toast.info(`Bonus for ${employeeName} is coming soon`, {
    description: 'Employee bonus management is not implemented yet.',
  });
}

export function EmployeesTable({ employees }: EmployeesTableProps) {
  return (
    <div
      className="mt-[10px] overflow-x-auto"
      role="region"
      aria-label="Employees, scroll horizontally for more columns"
      tabIndex={0}
    >
      <div className="min-w-[900px] pr-[52px]">
        <div className="grid h-[33px] grid-cols-[28px_1fr_70px_176px_176px_34px] items-center gap-4 px-2 py-2">
          <button
            aria-label="Select all employees"
            className="size-4 border-2 border-[#7D7D7D] bg-transparent"
            type="button"
          />

          <span className="ml-3 text-sm font-bold text-[#222222]/70">Employee</span>

          <span className="text-sm font-bold text-[#222222]/70">Shift</span>

          <span className="text-sm font-bold text-[#222222]/70">Employment date</span>

          <span className="text-sm font-bold text-[#222222]/70">Billing date</span>

          <span className="text-sm font-bold text-[#222222]/70">Bonus</span>
        </div>

        <div className="mt-[10px] flex flex-col gap-2">
          {employees.map((employee, index) => {
            const avatarUrl = getEmployeeImage(employee.avatarKey);

            return (
              <article
                className={[
                  'grid h-[54px] grid-cols-[28px_1fr_70px_176px_176px_34px] items-center gap-4 px-2 py-[7px]',
                  index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]',
                ].join(' ')}
                key={employee.id}
              >
                <button
                  aria-label={`Select ${employee.fullName}`}
                  className="size-4 border-2 border-[#7D7D7D] bg-transparent"
                  type="button"
                />

                <div className="ml-3 flex min-w-0 items-center gap-4">
                  {avatarUrl === undefined ? (
                    <div
                      className="grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: employee.avatarColor }}
                    >
                      {employee.fullName
                        .split(' ')
                        .map((namePart) => namePart.charAt(0))
                        .join('')}
                    </div>
                  ) : (
                    <img
                      alt={employee.fullName}
                      className="size-10 shrink-0 rounded-full object-cover"
                      decoding="async"
                      width={40}
                      height={40}
                      src={avatarUrl}
                    />
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-lg font-medium leading-[22px] text-[#222222]">
                      {employee.fullName}
                    </p>

                    <p className="truncate text-sm font-normal leading-5 text-[#222222]/70">
                      {employee.email}
                    </p>
                  </div>
                </div>

                <span
                  className={[
                    'grid size-[30px] place-items-center rounded-full text-sm font-bold text-[#222222]',
                    employee.shift === 'A' ? 'bg-[#FFB743]' : 'bg-[#9FC5FF]',
                  ].join(' ')}
                >
                  {employee.shift}
                </span>

                <span className="text-lg font-normal leading-[22px] text-[#222222]">
                  {employee.employmentDate}
                </span>

                <span className="text-lg font-normal leading-[22px] text-[#222222]">
                  {employee.billingDate}
                </span>

                <button
                  aria-label={`Add bonus for ${employee.fullName}`}
                  className="grid size-[30px] place-items-center rounded-full bg-[#F0F0F0] text-lg leading-none text-[#353535]"
                  onClick={() => handleAddBonus(employee.fullName)}
                  type="button"
                >
                  +
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
