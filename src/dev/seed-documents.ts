import { doc, runTransaction } from 'firebase/firestore/lite';
import { db } from '@/lib/firebase';

interface SeedDocument {
  collection: string;
  id: string;
  data: Record<string, unknown>;
}

export async function seedDocuments(documents: SeedDocument[]): Promise<void> {
  if (!import.meta.env.DEV)
    throw new Error('Demo data can only be seeded in development.');
  for (const document of documents) {
    await runTransaction(db, async (transaction) => {
      const reference = doc(db, document.collection, document.id);
      const snapshot = await transaction.get(reference);
      if (!snapshot.exists()) transaction.set(reference, document.data);
    });
  }
}
