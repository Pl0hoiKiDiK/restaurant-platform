import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTableOrder } from '@/features/tables/api/update-table-order';
import { tableOrderQueryKeys, tableQueryKeys } from '@/features/tables/lib/query-keys';

export function useUpdateTableOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTableOrder,
    onMutate: async ({ tableId }) => {
      await queryClient.cancelQueries({ queryKey: tableOrderQueryKeys.detail(tableId) });
    },
    onSuccess: (order) => {
      queryClient.setQueryData(tableOrderQueryKeys.detail(order.tableId), order);
    },
    onError: async (_, { tableId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: tableOrderQueryKeys.detail(tableId) }),
        queryClient.invalidateQueries({ queryKey: tableQueryKeys.all }),
      ]);
    },
  });
}
