import { isRecord } from '@/lib/validation';
import type { Employee, EmployeeShift } from '@/features/employees/types/employee.types';

function isEmployeeShift(value: unknown): value is EmployeeShift {
  return value === 'A' || value === 'B';
}

export function parseEmployee(employeeId: string, data: unknown): Employee {
  if (!isRecord(data)) throw new Error('Employee has invalid data.');

  const { avatarColor, avatarKey, billingDate, email, employmentDate, fullName, shift } =
    data;

  if (
    typeof avatarColor !== 'string' ||
    typeof avatarKey !== 'string' ||
    typeof billingDate !== 'string' ||
    typeof email !== 'string' ||
    typeof employmentDate !== 'string' ||
    typeof fullName !== 'string' ||
    !isEmployeeShift(shift)
  ) {
    throw new Error(`Employee "${employeeId}" has invalid data.`);
  }

  return {
    id: employeeId,
    fullName,
    email,
    shift,
    employmentDate,
    billingDate,
    avatarColor,
    avatarKey,
  };
}
