import type {
  MenuCategory,
  OrderItem,
} from '@/features/tables/types/order.types';

export interface FirestoreOrderItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  quantity: number;
  comment: string | null;
}

function isMenuCategory(value: unknown): value is MenuCategory {
  return (
    value === 'Appetizer' ||
    value === 'Main Course' ||
    value === 'Drinks' ||
    value === 'Dessert'
  );
}

export function parseOrderItem(
  orderId: string,
  item: FirestoreOrderItem,
): OrderItem {
  if (
    typeof item.id !== 'string' ||
    typeof item.name !== 'string' ||
    !isMenuCategory(item.category) ||
    typeof item.price !== 'number' ||
    item.price < 0 ||
    !Number.isInteger(item.quantity) ||
    item.quantity < 1
  ) {
    throw new Error(`Order "${orderId}" contains an invalid item.`);
  }

  return {
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    quantity: item.quantity,
    comment: item.comment ?? undefined,
  };
}

export function toFirestoreOrderItems(
  items: OrderItem[],
): FirestoreOrderItem[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    quantity: item.quantity,
    comment: item.comment ?? null,
  }));
}
