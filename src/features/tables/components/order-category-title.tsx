import type { MenuCategory } from '@/features/tables/types/order.types';

interface OrderCategoryTitleProps {
  title: MenuCategory;
  isUpdating: boolean;
  onAddDishClick: (category: MenuCategory) => void;
}

export function OrderCategoryTitle({
  title,
  isUpdating,
  onAddDishClick,
}: OrderCategoryTitleProps) {
  return (
    <div className="flex h-[26px] items-center gap-4">
      <button
        aria-label={`Add dish to ${title}`}
        className="grid size-[26px] place-items-center rounded-[4px] bg-[#353535] text-lg font-bold leading-none text-white transition-colors hover:bg-[#555555] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isUpdating}
        onClick={() => onAddDishClick(title)}
        type="button"
      >
        +
      </button>

      <span className="text-sm font-bold text-[#222222]/40">{title}</span>
    </div>
  );
}
