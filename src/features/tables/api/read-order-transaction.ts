import { doc, type Transaction } from 'firebase/firestore/lite';
import { parseTable } from '@/features/tables/lib/parse-table';
import {
  createEmptyOrder,
  parseTableOrder,
} from '@/features/tables/lib/parse-table-order';
import { db } from '@/lib/firebase';
import { firestoreCollections } from '@/lib/firestore-collections';

export async function readOrderTransaction(transaction: Transaction, tableId: string) {
  const tableReference = doc(db, firestoreCollections.tables, tableId);
  const orderReference = doc(db, firestoreCollections.tableOrders, tableId);
  const tableSnapshot = await transaction.get(tableReference);
  const orderSnapshot = await transaction.get(orderReference);
  if (!tableSnapshot.exists()) throw new Error('Table was not found.');
  const table = parseTable(tableId, tableSnapshot.data());
  const order = orderSnapshot.exists()
    ? parseTableOrder(tableId, orderSnapshot.data())
    : createEmptyOrder(tableId);
  return { table, order, tableReference, orderReference };
}
