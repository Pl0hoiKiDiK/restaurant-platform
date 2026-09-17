import type { OrderItem } from '@/features/tables/types/order.types';

export function calculateOrderTotal(items: OrderItem[], discountPercent = 0) {
  if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount must be between 0 and 100.');
  }
  const subtotalCents = items.reduce(
    (total, item) => total + Math.round(item.price * 100) * item.quantity,
    0,
  );
  const discountCents = Math.round((subtotalCents * discountPercent) / 100);
  return {
    subtotal: subtotalCents / 100,
    discount: discountCents / 100,
    total: (subtotalCents - discountCents) / 100,
  };
}
