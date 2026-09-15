interface OrderTotalProps {
  total: number;
}

function formatTotal(value: number) {
  return `$${value.toFixed(2)}`;
}

export function OrderTotal({ total }: OrderTotalProps) {
  return (
    <section className="mt-4 h-[114px] pt-4">
      <p className="text-sm font-bold text-[#222222]">
        Total
      </p>

      <div className="mt-2 flex h-[71px] items-center justify-between rounded-[4px] border border-black p-4">
        <span className="text-[32px] font-medium leading-10 text-[#222222]">
          {formatTotal(total)}
        </span>

        <div className="flex h-[39px] w-[250px] items-center gap-4">
          <button
            className="h-[39px] w-[103px] rounded-[4px] border border-black bg-white text-base font-bold text-[#222222]"
            type="button"
          >
            Discount
          </button>

          <button
            className="h-[39px] w-[131px] rounded-[4px] bg-[#212529] text-base font-bold text-white"
            type="button"
          >
            Check Order
          </button>
        </div>
      </div>
    </section>
  );
}