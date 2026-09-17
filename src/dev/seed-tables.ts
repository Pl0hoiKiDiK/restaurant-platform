import { seedDocuments } from '@/dev/seed-documents';

import { menuItems } from '@/features/tables/data/menu-items';
import { firestoreCollections } from '@/lib/firestore-collections';
import { toFirestoreOrderItems } from '@/features/tables/lib/map-order-item';
import type { OrderItem } from '@/features/tables/types/order.types';
import type { TableStatus } from '@/features/tables/types/table.types';

interface SeedTable {
  id: string;
  number: number;
  reservationTime: string | null;
  status: TableStatus;
}

const tables: SeedTable[] = [
  { id: 'table-1', number: 1, reservationTime: null, status: 'free' },
  { id: 'table-2', number: 2, reservationTime: '18:00', status: 'reserved' },
  { id: 'table-3', number: 3, reservationTime: null, status: 'occupied' },
  { id: 'table-4', number: 4, reservationTime: '19:30', status: 'reserved' },
  { id: 'table-5', number: 5, reservationTime: null, status: 'free' },
  { id: 'table-6', number: 6, reservationTime: null, status: 'occupied' },
  { id: 'table-7', number: 7, reservationTime: null, status: 'occupied' },
  { id: 'table-8', number: 8, reservationTime: null, status: 'free' },
  { id: 'table-9', number: 9, reservationTime: null, status: 'free' },
  { id: 'table-10', number: 10, reservationTime: null, status: 'free' },
  { id: 'table-11', number: 11, reservationTime: '18:00', status: 'reserved' },
  { id: 'table-12', number: 12, reservationTime: '18:00', status: 'reserved' },
  { id: 'table-13', number: 13, reservationTime: null, status: 'free' },
  { id: 'table-14', number: 14, reservationTime: null, status: 'free' },
  { id: 'table-15', number: 15, reservationTime: null, status: 'free' },
  { id: 'table-16', number: 16, reservationTime: null, status: 'occupied' },
  { id: 'table-17', number: 17, reservationTime: '21:00', status: 'reserved' },
];

function createOrderItem(
  menuItemId: string,
  quantity: number,
  comment?: string,
): OrderItem {
  const menuItem = menuItems.find((item) => item.id === menuItemId);

  if (menuItem === undefined) {
    throw new Error(`Menu item "${menuItemId}" was not found.`);
  }

  return {
    ...menuItem,
    quantity,
    comment,
  };
}

const ordersByTableId: Record<string, OrderItem[]> = {
  'table-3': [
    createOrderItem('item-bruschetta', 1, 'Extra crispy'),
    createOrderItem('item-cheeseburger', 2, 'No onions'),
    createOrderItem('item-iced-tea', 2),
  ],
  'table-6': [
    createOrderItem('item-caesar-salad', 1),
    createOrderItem('item-pasta-carbonara', 1, 'Extra cheese'),
    createOrderItem('item-lemonade', 2),
  ],
  'table-7': [
    createOrderItem('item-bruschetta', 1),
    createOrderItem('item-cheeseburger', 1, 'No onions'),
    createOrderItem('item-iced-tea', 2),
    createOrderItem('item-cheesecake', 1),
  ],
  'table-16': [
    createOrderItem('item-caesar-salad', 1, 'Dressing on the side'),
    createOrderItem('item-pasta-carbonara', 2),
    createOrderItem('item-lemonade', 2),
    createOrderItem('item-cheesecake', 1),
  ],
};

export async function seedTables(): Promise<void> {
  await seedDocuments(
    tables.flatMap(({ id, ...table }) => [
      { collection: firestoreCollections.tables, id, data: table },
      {
        collection: firestoreCollections.tableOrders,
        id,
        data: {
          tableId: id,
          items: toFirestoreOrderItems(ordersByTableId[id] ?? []),
          revision: 0,
        },
      },
    ]),
  );
}
