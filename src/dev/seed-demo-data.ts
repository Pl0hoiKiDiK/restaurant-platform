import { demoEmployees } from '@/dev/data/demo-employees';
import { demoRestaurants } from '@/dev/data/demo-restaurants';
import { seedDocuments } from '@/dev/seed-documents';
import { seedTables } from '@/dev/seed-tables';
import { firestoreCollections } from '@/lib/firestore-collections';

export async function seedDemoData(): Promise<void> {
  if (!import.meta.env.DEV) throw new Error('Demo seeding is disabled in production.');
  await seedTables();
  await seedDocuments(
    demoEmployees.map(({ id, ...data }) => ({
      collection: firestoreCollections.employees,
      id,
      data,
    })),
  );
  await seedDocuments(
    demoRestaurants.map(({ id, ...data }) => ({
      collection: firestoreCollections.restaurants,
      id,
      data: { ...data, isFeatured: data.isFeatured ?? false },
    })),
  );
}
