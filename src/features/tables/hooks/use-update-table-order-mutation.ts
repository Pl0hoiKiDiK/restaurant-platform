import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTableOrder } from '@/features/tables/api/update-table-order';
import { tableOrderQueryKeys } from '@/features/tables/lib/query-keys';

export function useUpdateTableOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTableOrder,
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(
        tableOrderQueryKeys.detail(updatedOrder.tableId),
        updatedOrder,
      );
    },
  });
}
