import { doc, writeBatch } from 'firebase/firestore';

import { mockEmployees } from '@/features/employees/data/mock-employees';
import { firestoreCollections } from '@/features/tables/lib/firestore-collections';
import { db } from '@/lib/firebase';

export async function seedEmployeesData(): Promise<void> {
  const batch = writeBatch(db);

  mockEmployees.forEach((employee) => {
    batch.set(doc(db, firestoreCollections.employees, employee.id), {
      fullName: employee.fullName,
      email: employee.email,
      shift: employee.shift,
      employmentDate: employee.employmentDate,
      billingDate: employee.billingDate,
      avatarColor: employee.avatarColor,
      avatarKey: employee.avatarKey,
    });
  });

  await batch.commit();
}