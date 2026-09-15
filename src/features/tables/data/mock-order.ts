import type { TableOrder } from '@/features/tables/types/order.types';

export const mockTableOrder: TableOrder = {
  id: 'order-table-7',
  tableId: 'table-7',
  items: [
    {
      id: 'item-bruschetta',
      name: 'Bruschetta',
      category: 'Appetizer',
      price: 8.99,
      quantity: 1,
    },
    {
      id: 'item-caesar-salad',
      name: 'Grilled Chicken Caesar Salad',
      category: 'Main Course',
      price: 12.99,
      quantity: 1,
    },
    {
      id: 'item-cheeseburger',
      name: 'Classic Cheeseburger with Fries',
      category: 'Main Course',
      price: 14.99,
      quantity: 1,
      comment: 'No onions',
    },
    {
      id: 'item-iced-tea',
      name: 'Iced Tea',
      category: 'Drinks',
      price: 2.99,
      quantity: 2,
    },
    {
      id: 'item-cheesecake',
      name: 'New York Cheesecake',
      category: 'Dessert',
      price: 6.99,
      quantity: 1,
    },
  ],
};