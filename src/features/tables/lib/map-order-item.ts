import type { MenuCategory, OrderItem } from '@/features/tables/types/order.types';
import { isNonEmptyString, isNonNegativeNumber, isRecord } from '@/lib/validation';

interface FirestoreOrderItem {
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

export function parseOrderItem(orderId: string, item: unknown): OrderItem {
  if (
    !isRecord(item) ||
    !isNonEmptyString(item.id) ||
    !isNonEmptyString(item.name) ||
    !isMenuCategory(item.category) ||
    !isNonNegativeNumber(item.price) ||
    typeof item.quantity !== 'number' ||
    !Number.isSafeInteger(item.quantity) ||
    item.quantity < 1 ||
    (item.comment != null &&
      (typeof item.comment !== 'string' || item.comment.length > 160))
  ) {
    throw new Error('Order "' + orderId + '" contains an invalid item.');
  }
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    quantity: item.quantity,
    comment: typeof item.comment === 'string' ? item.comment : undefined,
  };
}

export function toFirestoreOrderItems(items: OrderItem[]): FirestoreOrderItem[] {
  return items.map((item) => ({
    ...parseOrderItem('draft', item),
    comment: item.comment ?? null,
  }));
}
