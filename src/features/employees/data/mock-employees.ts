import type { Employee } from '@/features/employees/types/employee.types';

export const mockEmployees: Employee[] = [
  {
    id: 'employee-mina',
    fullName: 'Mina Toniauth',
    email: 'mina@restcrm.com',
    shift: 'B',
    employmentDate: 'Jan 5, 2021',
    billingDate: 'Jan 5, 2023',
    avatarColor: '#E6B8A2',
  },
  {
    id: 'employee-pete',
    fullName: 'Pete Nguyen',
    email: 'peter@restcrm.com',
    shift: 'A',
    employmentDate: 'Feb 5, 2021',
    billingDate: 'Jan 11, 2023',
    avatarColor: '#8D6654',
  },
  {
    id: 'employee-irene',
    fullName: 'Irene Nichols',
    email: 'irene@restcrm.com',
    shift: 'A',
    employmentDate: 'Dec 22, 2020',
    billingDate: 'Jan 11, 2023',
    avatarColor: '#9DB1A9',
  },
  {
    id: 'employee-neal',
    fullName: 'Neal Gomez',
    email: 'nealg@restcrm.com',
    shift: 'A',
    employmentDate: 'Mar 1, 2021',
    billingDate: 'Jan 11, 2023',
    avatarColor: '#887364',
  },
  {
    id: 'employee-larry',
    fullName: 'Larry Carter',
    email: 'larry@restcrm.com',
    shift: 'B',
    employmentDate: 'Dec 22, 2020',
    billingDate: 'Jan 5, 2023',
    avatarColor: '#B0A89C',
  },
  {
    id: 'employee-jana',
    fullName: 'Jana Kelley',
    email: 'jana@restcrm.com',
    shift: 'B',
    employmentDate: 'Jan 5, 2021',
    billingDate: 'Jan 5, 2023',
    avatarColor: '#B67C5F',
  },
];

export const mockEmployeeStatistics = {
  allEmployees: 55,
  onShift: 31,
  idle: 24,
} as const;