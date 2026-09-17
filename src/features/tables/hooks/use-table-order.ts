import { useState } from 'react';
import { toast } from 'sonner';
import { menuCategoryOrder } from '@/features/tables/constants/menu-categories';
import { menuItems } from '@/features/tables/data/menu-items';
import { useCompleteTableOrderMutation } from '@/features/tables/hooks/use-complete-table-order-mutation';
import { useTableOrderQuery } from '@/features/tables/hooks/use-table-order-query';
import { useTableQuery } from '@/features/tables/hooks/use-table-query';
import { useUpdateTableOrderMutation } from '@/features/tables/hooks/use-update-table-order-mutation';
import { calculateOrderTotal } from '@/features/tables/lib/calculate-order-total';
import { formatPrice } from '@/features/tables/lib/format-price';
import type { MenuCategory, OrderItem } from '@/features/tables/types/order.types';
import { getErrorMessage } from '@/lib/get-error-message';

export function useTableOrder(tableId: string) {
  const tableQuery = useTableQuery(tableId);
  const orderQuery = useTableOrderQuery(tableId);
  const updateMutation = useUpdateTableOrderMutation();
  const completeMutation = useCompleteTableOrderMutation();
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [addCategory, setAddCategory] = useState<MenuCategory | null>(null);
  const [commentItemId, setCommentItemId] = useState<string | null>(null);
  const items = orderQuery.data?.items ?? [];
  const isBusy = updateMutation.isPending || completeMutation.isPending;
  const commentItem = items.find((item) => item.id === commentItemId) ?? null;
  const groupedItems = menuCategoryOrder.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  }));
  const totals = calculateOrderTotal(items, discountPercent);

  function onError(error: Error) {
    toast.error(getErrorMessage(error));
  }

  function updateItems(nextItems: OrderItem[], onSuccess?: () => void) {
    if (isBusy || !orderQuery.data || tableQuery.data?.status !== 'occupied') return;
    updateMutation.mutate(
      { tableId, items: nextItems, expectedRevision: orderQuery.data.revision },
      { onError, onSuccess },
    );
  }

  function addItem(itemId: string) {
    const menuItem = menuItems.find((item) => item.id === itemId);
    if (!menuItem) return;
    const nextItems = items.some((item) => item.id === itemId)
      ? items.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [...items, { ...menuItem, quantity: 1 }];
    updateItems(nextItems, () => setAddCategory(null));
  }

  function saveComment(comment: string) {
    if (!commentItem) return;
    updateItems(
      items.map((item) =>
        item.id === commentItem.id
          ? { ...item, comment: comment.trim() || undefined }
          : item,
      ),
      () => setCommentItemId(null),
    );
  }

  function completeOrder() {
    if (isBusy || !orderQuery.data) return;
    completeMutation.mutate(
      { tableId, expectedRevision: orderQuery.data.revision, discountPercent },
      {
        onError,
        onSuccess: ({ total }) => {
          setDiscountPercent(0);
          setIsDiscountOpen(false);
          toast.success('Order completed', {
            description: 'Order total: ' + formatPrice(total),
          });
        },
      },
    );
  }

  return {
    table: tableQuery.data,
    items,
    groupedItems,
    commentItem,
    addCategory,
    discountPercent,
    isDiscountOpen,
    totals,
    isBusy,
    isPending: tableQuery.isPending || orderQuery.isPending,
    isError: tableQuery.isError || orderQuery.isError,
    error: tableQuery.error ?? orderQuery.error,
    isCompleting: completeMutation.isPending,
    retry: () => {
      void tableQuery.refetch();
      void orderQuery.refetch();
    },
    increase: (id: string) =>
      updateItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      ),
    decrease: (id: string) =>
      updateItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item,
        ),
      ),
    remove: (id: string) => updateItems(items.filter((item) => item.id !== id)),
    openAddMenu: (category: MenuCategory) => {
      if (!isBusy) setAddCategory(category);
    },
    closeAddMenu: () => {
      if (!isBusy) setAddCategory(null);
    },
    openComment: (id: string) => {
      if (!isBusy) setCommentItemId(id);
    },
    closeComment: () => {
      if (!isBusy) setCommentItemId(null);
    },
    openDiscount: () => {
      if (!isBusy) setIsDiscountOpen(true);
    },
    closeDiscount: () => {
      if (!isBusy) setIsDiscountOpen(false);
    },
    selectDiscount: (percent: number) => {
      if (!isBusy) setDiscountPercent(percent);
    },
    addItem,
    saveComment,
    completeOrder,
  };
}
