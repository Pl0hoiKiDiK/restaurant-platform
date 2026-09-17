import { formatPrice } from '@/features/tables/lib/format-price';
import { useRef } from 'react';

import { useClickOutside } from '@/hooks/use-click-outside';
import { menuItems } from '@/features/tables/data/menu-items';
import type { MenuCategory, OrderItem } from '@/features/tables/types/order.types';

interface AddOrderItemMenuProps {
  category: MenuCategory;
  isUpdating: boolean;
  currentItems: OrderItem[];
  onAddItem: (itemId: string) => void;
  onClose: () => void;
}

export function AddOrderItemMenu({
  category,
  isUpdating,
  currentItems,
  onAddItem,
  onClose,
}: AddOrderItemMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, onClose);

  const categoryItems = menuItems.filter((item) => item.category === category);

  return (
    <div
      aria-label={`Add ${category} dish`}
      className="absolute left-0 top-[calc(100%+8px)] z-30 w-[280px] rounded-[8px] border border-black/10 bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
      ref={menuRef}
      role="dialog"
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-[#222222]">Add dish</p>

        <button
          aria-label="Close dishes menu"
          className="grid size-6 place-items-center text-lg leading-none text-[#222222]/50 hover:text-[#222222]"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
      </div>

      <div className="flex flex-col">
        {categoryItems.map((menuItem) => {
          const isAlreadyInOrder = currentItems.some((item) => item.id === menuItem.id);

          return (
            <button
              className="flex items-center justify-between gap-3 rounded-[4px] px-2 py-2 text-left transition-colors hover:bg-[#F4F4F4]"
              disabled={isUpdating}
              key={menuItem.id}
              onClick={() => onAddItem(menuItem.id)}
              type="button"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-[#222222]">
                  {menuItem.name}
                </span>

                <span className="mt-0.5 block text-xs text-[#222222]/50">
                  {isAlreadyInOrder ? 'Add one more' : 'Add to order'}
                </span>
              </span>

              <span className="shrink-0 text-sm font-semibold text-[#222222]">
                {formatPrice(menuItem.price)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
