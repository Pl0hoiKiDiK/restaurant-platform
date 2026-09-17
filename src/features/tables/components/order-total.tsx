interface OrderTotalProps {
  discountPercent: number;
  isCompleting: boolean;
  isUpdating: boolean;
  onCheckOrder: () => void;
  onDiscountClick: () => void;
  subtotal: number;
}

function formatTotal(value: number) {
  return `$${value.toFixed(2)}`;
}

export function OrderTotal({
  discountPercent,
  isCompleting,
  isUpdating,
  onCheckOrder,
  onDiscountClick,
  subtotal,
}: OrderTotalProps) {
  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount;
  const isDisabled = isUpdating || isCompleting;

  return (
    <section className="mt-4 pt-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-bold text-[#222222]">Total</p>

          {discountPercent > 0 ? (
            <p className="mt-1 text-sm text-[#222222]/50">
              Discount {discountPercent}%: -{formatTotal(discountAmount)}
            </p>
          ) : null}
        </div>

        {discountPercent > 0 ? (
          <p className="text-sm text-[#222222]/50">
            Subtotal: {formatTotal(subtotal)}
          </p>
        ) : null}
      </div>

      <div className="mt-2 flex min-h-[71px] items-center justify-between rounded-[4px] border border-black p-4">
        <span className="text-[32px] font-medium leading-10 text-[#222222]">
          {formatTotal(total)}
        </span>

        <div className="flex h-[39px] w-[250px] items-center gap-4">
          <button
            className="h-[39px] w-[103px] rounded-[4px] border border-black bg-white text-base font-bold text-[#222222] transition-colors hover:bg-[#F2F2F2] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isDisabled}
            onClick={onDiscountClick}
            type="button"
          >
            {discountPercent > 0
              ? `Discount ${discountPercent}%`
              : 'Discount'}
          </button>

          <button
            className="h-[39px] w-[131px] rounded-[4px] bg-[#212529] text-base font-bold text-white transition-colors hover:bg-[#3D4247] disabled:cursor-not-allowed disabled:opacity-50"
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