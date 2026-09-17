import { collection, getDocs } from 'firebase/firestore/lite';

import { parseEmployee } from '@/features/employees/lib/parse-employee';
import { firestoreCollections } from '@/lib/firestore-collections';
import type { Employee } from '@/features/employees/types/employee.types';
import { db } from '@/lib/firebase';

export async function getEmployees(): Promise<Employee[]> {
  const employeesSnapshot = await getDocs(collection(db, firestoreCollections.employees));

  return employeesSnapshot.docs
    .map((employeeDocument) =>
      parseEmployee(employeeDocument.id, employeeDocument.data()),
    )
    .sort((firstEmployee, secondEmployee) =>
      firstEmployee.fullName.localeCompare(secondEmployee.fullName),
    );
}
