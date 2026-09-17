import { useMutation, useQueryClient } from '@tanstack/react-query';

import { completeTableOrder } from '@/features/tables/api/complete-table-order';
import {
  tableOrderQueryKeys,
  tableQueryKeys,
} from '@/features/tables/lib/query-keys';
import type { TableOrder } from '@/features/tables/types/order.types';
import type { RestaurantTable } from '@/features/tables/types/table.types';

export function useCompleteTableOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeTableOrder,
    onSuccess: async (_, { tableId }) => {
      queryClient.setQueryData<TableOrder>(
        tableOrderQueryKeys.detail(tableId),
        (currentOrder) => {
          if (currentOrder === undefined) {
            return currentOrder;
          }

          return {
            ...currentOrder,
            items: [],
          };
        },
      );

      queryClient.setQueryData<RestaurantTable>(
        tableQueryKeys.detail(tableId),
        (currentTable) => {
          if (currentTable === undefined) {
            return currentTable;
          }

          return {
            ...currentTable,
            reservationTime: undefined,
            status: 'free',
          };
        },
      );

      await queryClient.invalidateQueries({
        queryKey: tableQueryKeys.all,
      });
    },
  });
}