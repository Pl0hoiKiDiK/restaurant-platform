interface OrderCategoryTitleProps {
  title: string;
}

export function OrderCategoryTitle({
  title,
}: OrderCategoryTitleProps) {
  return (
    <div className="flex h-[26px] items-center gap-4">
      <button
        aria-label={`Add dish to ${title}`}
        className="grid size-[26px] place-items-center rounded-[4px] bg-[#353535] text-lg font-bold leading-none text-white"
        type="button"
      >
        +
      </button>

      <span className="text-sm font-bold text-[#222222]/40">
        {title}
      </span>
    </div>
  );
}