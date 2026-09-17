import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeTableOrder } from '@/features/tables/api/complete-table-order';
import { tableOrderQueryKeys, tableQueryKeys } from '@/features/tables/lib/query-keys';
import type { RestaurantTable } from '@/features/tables/types/table.types';

export function useCompleteTableOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeTableOrder,
    onMutate: async ({ tableId }) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: tableOrderQueryKeys.detail(tableId) }),
        queryClient.cancelQueries({ queryKey: tableQueryKeys.all }),
      ]);
    },
    onSuccess: async ({ order }, { tableId }) => {
      queryClient.setQueryData(tableOrderQueryKeys.detail(tableId), order);
      queryClient.setQueryData<RestaurantTable>(
        tableQueryKeys.detail(tableId),
        (table) =>
          table ? { ...table, status: 'free', reservationTime: undefined } : table,
      );
      await queryClient.invalidateQueries({ queryKey: tableQueryKeys.all });
    },
    onError: async (_, { tableId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: tableOrderQueryKeys.detail(tableId) }),
        queryClient.invalidateQueries({ queryKey: tableQueryKeys.all }),
      ]);
    },
  });
}
