import { createFileRoute } from '@tanstack/react-router';
import { EmployeesPage } from '@/features/employees/pages/employees-page';

export const Route = createFileRoute('/staff/employees')({ component: EmployeesPage });
