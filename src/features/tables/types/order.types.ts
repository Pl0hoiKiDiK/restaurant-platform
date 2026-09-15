export type MenuCategory =
  | 'Appetizer'
  | 'Main Course'
  | 'Drinks'
  | 'Dessert';

export interface OrderItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  quantity: number;
  comment?: string;
}

export interface TableOrder {
  id: string;
  tableId: string;
  items: OrderItem[];
}