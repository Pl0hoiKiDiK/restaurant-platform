import { formatPrice } from '@/features/tables/lib/format-price';
interface OrderTotalProps {
  discountPercent: number;
  isCompleting: boolean;
  isUpdating: boolean;
  onCheckOrder: () => void;
  onDiscountClick: () => void;
  subtotal: number;
}

export function OrderTotal({
  discountPercent,
  isCompleting,
  isUpdating,
  onCheckOrder,
  onDiscountClick,
  subtotal,
}: OrderTotalProps) {
  const discountAmount =
    Math.round((Math.round(subtotal * 100) * discountPercent) / 100) / 100;
  const total = (Math.round(subtotal * 100) - Math.round(discountAmount * 100)) / 100;
  const isDisabled = isUpdating || isCompleting;

  return (
    <section className="mt-4 pt-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-bold text-[#222222]">Total</p>

          {discountPercent > 0 ? (
            <p className="mt-1 text-sm text-[#222222]/50">
              Discount {discountPercent}%: -{formatPrice(discountAmount)}
            </p>
          ) : null}
        </div>

        {discountPercent > 0 ? (
          <p className="text-sm text-[#222222]/50">Subtotal: {formatPrice(subtotal)}</p>
        ) : null}
      </div>

      <div className="mt-2 flex min-h-[71px] flex-wrap items-center justify-between gap-3 rounded-[4px] border border-black p-4">
        <span className="text-[32px] font-medium leading-10 text-[#222222]">
          {formatPrice(total)}
        </span>

        <div className="flex min-h-[39px] w-full flex-wrap items-center justify-center gap-2 sm:w-[250px] sm:justify-end sm:gap-4">
          <button
            className="h-[39px] min-w-0 max-w-[103px] flex-1 sm:w-[103px] sm:flex-none rounded-[4px] border border-black bg-white text-xs sm:text-base font-bold text-[#222222] transition-colors hover:bg-[#F2F2F2] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isDisabled}
            onClick={onDiscountClick}
            type="button"
          >
            {discountPercent > 0 ? `Discount ${discountPercent}%` : 'Discount'}
          </button>

          <button
            className="h-[39px] min-w-0 max-w-[131px] flex-1 sm:w-[131px] sm:flex-none rounded-[4px] bg-[#212529] text-xs sm:text-base font-bold text-white transition-colors hover:bg-[#3D4247] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isDisabled || subtotal === 0}
            onClick={onCheckOrder}
            type="button"
          >
            {isCompleting ? 'Checking…' : 'Check Order'}
          </button>
        </div>
      </div>
    </section>
  );
}
