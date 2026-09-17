export const tableQueryKeys = {
  all: ['tables'] as const,
  detail: (tableId: string) => ['tables', tableId] as const,
} as const;

export const tableOrderQueryKeys = {
  detail: (tableId: string) => ['tableOrders', tableId] as const,
} as const;
