import {
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';

import { firestoreCollections } from '@/features/tables/lib/firestore-collections';
import { db } from '@/lib/firebase';

interface CompleteTableOrderParams {
  tableId: string;
}

export async function completeTableOrder({
  tableId,
}: CompleteTableOrderParams): Promise<void> {
  const orderReference = doc(
    db,
    firestoreCollections.tableOrders,
    tableId,
  );
  const tableReference = doc(db, firestoreCollections.tables, tableId);

  const batch = writeBatch(db);

  batch.set(
    orderReference,
    {
      tableId,
      items: [],
      completedAt: serverTimestamp(),
    },
    { merge: true },
  );

  batch.update(tableReference, {
    reservationTime: null,
    status: 'free',
  });

  await batch.commit();
}
