export type MenuCategory = 'Appetizer' | 'Main Course' | 'Drinks' | 'Dessert';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
}

export interface OrderItem extends MenuItem {
  quantity: number;
  comment?: string;
}

export interface TableOrder {
  id: string;
  tableId: string;
  items: OrderItem[];
  revision: number;
}
