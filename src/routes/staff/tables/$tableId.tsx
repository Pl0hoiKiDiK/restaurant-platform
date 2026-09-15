import { useMemo, useState } from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';

import backArrowIcon from '@/assets/icons/back-arrow-icon.svg';
import { StaffLayout } from '@/app/layouts/staff-layout';
import { OrderCategoryTitle } from '@/features/tables/components/order-category-title';
import { OrderItemRow } from '@/features/tables/components/order-item-row';
import { OrderListHeader } from '@/features/tables/components/order-list-header';
import { OrderTotal } from '@/features/tables/components/order-total';
import { mockTableOrder } from '@/features/tables/data/mock-order';
import type {
  MenuCategory,
  OrderItem,
} from '@/features/tables/types/order.types';

export const Route = createFileRoute('/staff/tables/$tableId')({
  component: TableDetailsPage,
});

const categoryOrder: MenuCategory[] = [
  'Appetizer',
  'Main Course',
  'Drinks',
  'Dessert',
];

function TableDetailsPage() {
  const { tableId } = Route.useParams();
  const [items, setItems] = useState<OrderItem[]>(mockTableOrder.items);

  const groupedItems = useMemo(() => {
    return categoryOrder.map((category) => ({
      category,
      items: items.filter((item) => item.category === category),
    }));
  }, [items]);

  const total = useMemo(() => {
    return items.reduce(
      (currentTotal, item) =>
        currentTotal + item.price * item.quantity,
      0,
    );
  }, [items]);

  function handleIncrease(itemId: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function handleDecrease(itemId: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  }

  function handleRemove(itemId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  }

  return (
    <StaffLayout>
      <section className="w-full">
        <div className="flex items-start">
          <Link
            aria-label="Back to tables"
            className="mt-1 grid size-6 shrink-0 place-items-center"
            to="/staff/tables"
          >
            <img
              alt=""
              aria-hidden="true"
              className="size-6"
              src={backArrowIcon}
            />
          </Link>

          <div className="ml-4">
            <h1 className="text-2xl font-semibold leading-8 text-[#222222]">
              Table {tableId.replace('table-', '')}
            </h1>

            <p className="mt-2 text-sm font-bold leading-5 text-[#222222]/40">
              Order details
            </p>
          </div>
        </div>

        <section className="mt-2 min-h-[751px] w-full bg-[#F9F9F9] p-4">
          <OrderListHeader />

          <div className="mt-6 flex flex-col gap-6">
            {groupedItems.map(({ category, items: categoryItems }) => (
              <section key={category}>
                <OrderCategoryTitle title={category} />

                <div className="mt-[10px] flex flex-col gap-2">
                  {categoryItems.map((item) => (
                    <OrderItemRow
                      item={item}
                      key={item.id}
                      onDecrease={handleDecrease}
                      onIncrease={handleIncrease}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <OrderTotal total={total} />
        </section>
      </section>
    </StaffLayout>
  );
}