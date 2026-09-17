import { getErrorMessage } from '@/lib/get-error-message';
import { Link } from '@tanstack/react-router';
import { StaffLayout } from '@/app/layouts/staff-layout';
import backArrowIcon from '@/assets/icons/back-arrow-icon.svg';
import { AddOrderItemMenu } from '@/features/tables/components/add-order-item-menu';
import { OrderCategoryTitle } from '@/features/tables/components/order-category-title';
import { OrderCommentSheet } from '@/features/tables/components/order-comment-sheet';
import { OrderDiscountSheet } from '@/features/tables/components/order-discount-sheet';
import { OrderItemRow } from '@/features/tables/components/order-item-row';
import { OrderListHeader } from '@/features/tables/components/order-list-header';
import { OrderTotal } from '@/features/tables/components/order-total';
import { useTableOrder } from '@/features/tables/hooks/use-table-order';

export function TableDetailsPage({ tableId }: { tableId: string }) {
  const order = useTableOrder(tableId);
  const table = order.table;
  const isTableFree = table?.status === 'free';
  const isTableReserved = table?.status === 'reserved';
  const isTableOccupied = table?.status === 'occupied';

  return (
    <StaffLayout>
      <section className="w-full">
        <div className="flex items-start">
          <Link
            aria-label="Back to tables"
            className="mt-1 grid size-6 shrink-0 place-items-center"
            to="/staff/tables"
          >
            <img alt="" aria-hidden="true" className="size-6" src={backArrowIcon} />
          </Link>

          <div className="ml-4">
            <h1 className="text-2xl font-semibold leading-8 text-[#222222]">
              Table {table?.number ?? tableId.replace('table-', '')}
            </h1>

            <p className="mt-2 text-sm font-bold leading-5 text-[#222222]/40">
              Order details
            </p>
          </div>
        </div>

        <section className="mt-2 min-h-[751px] w-full bg-[#F9F9F9] p-4">
          {order.isPending ? <OrderLoadingState /> : null}

          {order.isError ? (
            <OrderErrorState
              errorMessage={getErrorMessage(order.error)}
              onRetry={() => {
                order.retry();
              }}
            />
          ) : null}

          {!order.isPending && !order.isError ? (
            <>
              {isTableFree ? (
                <TableStatusMessage
                  description="This table is currently free. There is no active order."
                  title="Free table"
                />
              ) : null}

              {isTableReserved ? (
                <TableStatusMessage
                  description={
                    table?.reservationTime === undefined
                      ? 'This table is reserved.'
                      : `This table is reserved for ${table.reservationTime}.`
                  }
                  title="Reserved table"
                />
              ) : null}

              {isTableOccupied ? (
                <>
                  <div
                    className="overflow-x-auto"
                    role="region"
                    aria-label="Order items, scroll horizontally for more columns"
                    tabIndex={0}
                  >
                    <div className="min-w-[840px]">
                      <OrderListHeader />

                      <div className="mt-6 flex flex-col gap-6">
                        {order.groupedItems.map(({ category, items: categoryItems }) => (
                          <section className="relative" key={category}>
                            <OrderCategoryTitle
                              isUpdating={order.isBusy}
                              onAddDishClick={order.openAddMenu}
                              title={category}
                            />

                            {order.addCategory === category ? (
                              <AddOrderItemMenu
                                isUpdating={order.isBusy}
                                category={category}
                                currentItems={order.items}
                                onAddItem={order.addItem}
                                onClose={order.closeAddMenu}
                              />
                            ) : null}

                            {categoryItems.length > 0 ? (
                              <div className="mt-[10px] flex flex-col gap-2">
                                {categoryItems.map((item) => (
                                  <OrderItemRow
                                    isUpdating={order.isBusy}
                                    item={item}
                                    key={item.id}
                                    onCommentClick={order.openComment}
                                    onDecrease={order.decrease}
                                    onIncrease={order.increase}
                                    onRemove={order.remove}
                                  />
                                ))}
                              </div>
                            ) : (
                              <p className="mt-[10px] text-sm text-[#222222]/40">
                                No dishes in this category.
                              </p>
                            )}
                          </section>
                        ))}
                      </div>
                    </div>
                  </div>
                  <OrderTotal
                    discountPercent={order.discountPercent}
                    isCompleting={order.isCompleting}
                    isUpdating={order.isBusy}
                    onCheckOrder={order.completeOrder}
                    onDiscountClick={order.openDiscount}
                    subtotal={order.totals.subtotal}
                  />
                </>
              ) : null}
            </>
          ) : null}
        </section>

        <OrderCommentSheet
          isUpdating={order.isBusy}
          item={order.commentItem}
          onClose={order.closeComment}
          onSave={order.saveComment}
        />

        <OrderDiscountSheet
          discountPercent={order.discountPercent}
          isUpdating={order.isBusy || order.isCompleting}
          onClose={order.closeDiscount}
          onSelectDiscount={order.selectDiscount}
          open={order.isDiscountOpen}
        />
      </section>
    </StaffLayout>
  );
}

function OrderLoadingState() {
  return (
    <>
      <div className="h-10 animate-pulse rounded-[4px] bg-[#EAEAEA]" />

      <div className="mt-6 flex flex-col gap-2">
        <div className="h-[60px] animate-pulse bg-[#EAEAEA]" />
        <div className="h-[60px] animate-pulse bg-[#EAEAEA]" />
        <div className="h-[60px] animate-pulse bg-[#EAEAEA]" />
        <div className="h-[60px] animate-pulse bg-[#EAEAEA]" />
      </div>

      <div className="mt-4 h-[114px] animate-pulse rounded-[4px] bg-[#EAEAEA]" />
    </>
  );
}

interface OrderErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
}

function OrderErrorState({ errorMessage, onRetry }: OrderErrorStateProps) {
  return (
    <section className="rounded-[8px] border border-[#FF5858]/30 bg-[#FFE8E8] p-4">
      <h2 className="text-sm font-semibold text-[#222222]">Failed to load table</h2>

      <p className="mt-1 text-sm text-[#222222]/70">{errorMessage}</p>

      <button
        className="mt-4 rounded-[4px] bg-[#222222] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#444444]"
        onClick={onRetry}
        type="button"
      >
        Try again
      </button>
    </section>
  );
}

interface TableStatusMessageProps {
  description: string;
  title: string;
}

function TableStatusMessage({ description, title }: TableStatusMessageProps) {
  return (
    <section className="mt-6 rounded-[8px] border border-black/10 bg-white p-4">
      <h2 className="text-base font-semibold text-[#222222]">{title}</h2>

      <p className="mt-1 text-sm text-[#222222]/60">{description}</p>
    </section>
  );
}
