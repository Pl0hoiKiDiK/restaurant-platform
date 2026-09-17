import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { StaffLayout } from "@/app/layouts/staff-layout";
import backArrowIcon from "@/assets/icons/back-arrow-icon.svg";
import { AddOrderItemMenu } from "@/features/tables/components/add-order-item-menu";
import { OrderCategoryTitle } from "@/features/tables/components/order-category-title";
import { OrderCommentSheet } from "@/features/tables/components/order-comment-sheet";
import { OrderDiscountSheet } from "@/features/tables/components/order-discount-sheet";
import { OrderItemRow } from "@/features/tables/components/order-item-row";
import { OrderListHeader } from "@/features/tables/components/order-list-header";
import { OrderTotal } from "@/features/tables/components/order-total";
import { menuItems } from "@/features/tables/data/menu-items";
import { menuCategoryOrder } from "@/features/tables/constants/menu-categories";
import { useCompleteTableOrderMutation } from "@/features/tables/hooks/use-complete-table-order-mutation";
import { useTableOrderQuery } from "@/features/tables/hooks/use-table-order-query";
import { useTableQuery } from "@/features/tables/hooks/use-table-query";
import { useUpdateTableOrderMutation } from "@/features/tables/hooks/use-update-table-order-mutation";
import type {
  MenuCategory,
  OrderItem,
} from "@/features/tables/types/order.types";

export const Route = createFileRoute("/staff/tables/$tableId")({
  component: TableDetailsPage,
});

const emptyOrderItems: OrderItem[] = [];

function TableDetailsPage() {
  const { tableId } = Route.useParams();

  const {
    data: tableOrder,
    error,
    isError,
    isPending,
    refetch,
  } = useTableOrderQuery(tableId);

  const {
    data: table,
    error: tableError,
    isError: isTableError,
    isPending: isTablePending,
    refetch: refetchTable,
  } = useTableQuery(tableId);

  const updateTableOrderMutation = useUpdateTableOrderMutation();
  const completeTableOrderMutation = useCompleteTableOrderMutation();

  const [discountPercent, setDiscountPercent] = useState(0);
  const [isDiscountSheetOpen, setIsDiscountSheetOpen] = useState(false);

  const [addMenuCategory, setAddMenuCategory] = useState<MenuCategory | null>(
    null,
  );

  const [commentItemId, setCommentItemId] = useState<string | null>(null);

  const items = tableOrder?.items ?? emptyOrderItems;

  const isPagePending = isPending || isTablePending;
  const isPageError = isError || isTableError;

  const pageError = isError ? error : tableError;

  const isTableFree = table?.status === "free";
  const isTableReserved = table?.status === "reserved";
  const isTableOccupied = table?.status === "occupied";

  const commentItem = items.find((item) => item.id === commentItemId) ?? null;

  const groupedItems = useMemo(() => {
    return menuCategoryOrder.map((category) => ({
      category,
      items: items.filter((item) => item.category === category),
    }));
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce(
      (currentTotal, item) => currentTotal + item.price * item.quantity,
      0,
    );
  }, [items]);

  function updateItems(nextItems: OrderItem[]) {
    updateTableOrderMutation.mutate(
      {
        tableId,
        items: nextItems,
      },
      {
        onError: () => {
          toast.error("Failed to update order", {
            description: "Please try again.",
          });
        },
        onSuccess: () => {
          toast.success("Order updated");
        },
      },
    );
  }

  function handleIncrease(itemId: string) {
    updateItems(
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function handleDecrease(itemId: string) {
    updateItems(
      items.map((item) =>
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
    updateItems(items.filter((item) => item.id !== itemId));
  }

  function handleOpenAddMenu(category: MenuCategory) {
    setAddMenuCategory(category);
  }

  function handleCloseAddMenu() {
    setAddMenuCategory(null);
  }

  function handleAddItem(menuItemId: string) {
    const menuItem = menuItems.find((item) => item.id === menuItemId);

    if (menuItem === undefined) {
      toast.error("Dish was not found");

      return;
    }

    const existingOrderItem = items.find((item) => item.id === menuItem.id);

    if (existingOrderItem !== undefined) {
      updateItems(
        items.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      updateItems([
        ...items,
        {
          ...menuItem,
          quantity: 1,
        },
      ]);
    }

    setAddMenuCategory(null);
  }

  function handleOpenComment(itemId: string) {
    setCommentItemId(itemId);
  }

  function handleCloseComment() {
    if (!updateTableOrderMutation.isPending) {
      setCommentItemId(null);
    }
  }

  function handleSaveComment(comment: string) {
    if (commentItem === null) {
      return;
    }

    updateItems(
      items.map((item) =>
        item.id === commentItem.id
          ? {
              ...item,
              comment: comment === "" ? undefined : comment,
            }
          : item,
      ),
    );

    setCommentItemId(null);
  }

  function handleOpenDiscountSheet() {
    setIsDiscountSheetOpen(true);
  }

  function handleCloseDiscountSheet() {
    if (!completeTableOrderMutation.isPending) {
      setIsDiscountSheetOpen(false);
    }
  }

  function handleSelectDiscount(nextDiscountPercent: number) {
    setDiscountPercent(nextDiscountPercent);
  }

  function handleCheckOrder() {
    const totalPaid = subtotal * (1 - discountPercent / 100);

    completeTableOrderMutation.mutate(
      { tableId },
      {
        onError: () => {
          toast.error("Failed to complete order", {
            description: "Please try again.",
          });
        },
        onSuccess: () => {
          setDiscountPercent(0);

          toast.success("Order checked successfully", {
            description: `Total paid: $${totalPaid.toFixed(2)}`,
          });
        },
      },
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
              Table {tableId.replace("table-", "")}
            </h1>

            <p className="mt-2 text-sm font-bold leading-5 text-[#222222]/40">
              Order details
            </p>
          </div>
        </div>

        <section className="mt-2 min-h-[751px] w-full bg-[#F9F9F9] p-4">
          {isPagePending ? <OrderLoadingState /> : null}

          {isPageError ? (
            <OrderErrorState
              errorMessage={getErrorMessage(pageError)}
              onRetry={() => {
                void refetch();
                void refetchTable();
              }}
            />
          ) : null}

          {!isPagePending && !isPageError ? (
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
                      ? "This table is reserved."
                      : `This table is reserved for ${table.reservationTime}.`
                  }
                  title="Reserved table"
                />
              ) : null}

              {isTableOccupied ? (
                <>
                  <OrderListHeader />

                  <div className="mt-6 flex flex-col gap-6">
                    {groupedItems.map(({ category, items: categoryItems }) => (
                      <section className="relative" key={category}>
                        <OrderCategoryTitle
                          isUpdating={updateTableOrderMutation.isPending}
                          onAddDishClick={handleOpenAddMenu}
                          title={category}
                        />

                        {addMenuCategory === category ? (
                          <AddOrderItemMenu
                            category={category}
                            currentItems={items}
                            onAddItem={handleAddItem}
                            onClose={handleCloseAddMenu}
                          />
                        ) : null}

                        {categoryItems.length > 0 ? (
                          <div className="mt-[10px] flex flex-col gap-2">
                            {categoryItems.map((item) => (
                              <OrderItemRow
                                isUpdating={updateTableOrderMutation.isPending}
                                item={item}
                                key={item.id}
                                onCommentClick={handleOpenComment}
                                onDecrease={handleDecrease}
                                onIncrease={handleIncrease}
                                onRemove={handleRemove}
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

                  <OrderTotal
                    discountPercent={discountPercent}
                    isCompleting={completeTableOrderMutation.isPending}
                    isUpdating={updateTableOrderMutation.isPending}
                    onCheckOrder={handleCheckOrder}
                    onDiscountClick={handleOpenDiscountSheet}
                    subtotal={subtotal}
                  />
                </>
              ) : null}
            </>
          ) : null}
        </section>

        <OrderCommentSheet
          isUpdating={updateTableOrderMutation.isPending}
          item={commentItem}
          onClose={handleCloseComment}
          onSave={handleSaveComment}
        />

        <OrderDiscountSheet
          discountPercent={discountPercent}
          isUpdating={
            updateTableOrderMutation.isPending ||
            completeTableOrderMutation.isPending
          }
          onClose={handleCloseDiscountSheet}
          onSelectDiscount={handleSelectDiscount}
          open={isDiscountSheetOpen}
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
      <h2 className="text-sm font-semibold text-[#222222]">
        Failed to load table
      </h2>

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

function getErrorMessage(error: Error | null): string {
  if (error === null) {
    return "An unknown error occurred.";
  }

  return error.message;
}
