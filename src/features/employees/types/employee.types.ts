export type EmployeeShift = 'A' | 'B';

export interface Employee {
  id: string;
  fullName: string;
  email: string;
  shift: EmployeeShift;
  employmentDate: string;
  billingDate: string;
  avatarColor: string;
  avatarKey: string;
}