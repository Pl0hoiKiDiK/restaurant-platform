import { collection, getDocs } from 'firebase/firestore';

import { parseEmployee } from '@/features/employees/lib/parse-employee';
import { firestoreCollections } from '@/features/tables/lib/firestore-collections';
import type { Employee } from '@/features/employees/types/employee.types';
import { db } from '@/lib/firebase';

export async function getEmployees(): Promise<Employee[]> {
  const employeesSnapshot = await getDocs(
    collection(db, firestoreCollections.employees),
  );

  return employeesSnapshot.docs
    .map((employeeDocument) =>
      parseEmployee(
        employeeDocument.id,
        employeeDocument.data() as Record<string, unknown>,
      ),
    )
    .sort((firstEmployee, secondEmployee) =>
      firstEmployee.fullName.localeCompare(secondEmployee.fullName),
    );
}