export function OrderListHeader() {
  return (
    <div className="grid h-[33px] grid-cols-[28px_1fr_120px_154px_200px_82px] items-center gap-4 px-2 py-2">
      <button
        aria-label="Select all dishes"
        className="h-4 w-4 border-2 border-[#7D7D7D] bg-transparent"
        type="button"
      />

      <span className="ml-3 text-sm font-bold text-[#222222]/40">Dish</span>

      <span className="text-sm font-bold text-[#222222]/40">Price</span>

      <span className="text-sm font-bold text-[#222222]/40">Amount</span>

      <span />

      <span />
    </div>
  );
}
