interface EmployeeStatCardProps {
  label: string;
  value: number;
}

export function EmployeeStatCard({
  label,
  value,
}: EmployeeStatCardProps) {
  return (
    <article className="flex h-[140px] min-w-0 flex-1 flex-col bg-[#F9F9F9] p-6">
      <p className="text-sm font-bold leading-5 text-[#222222]/40">
        {label}
      </p>

      <div className="mt-[15px] flex h-[60px] min-w-0 items-center">
        <span className="font-['Lora'] text-[40px] font-semibold leading-[60px] text-[#222222]">
          {value}
        </span>

        <div className="mx-4 h-px min-w-0 flex-1 bg-black/50" />

        <button
          className="h-[35px] shrink-0 bg-white px-4 py-2 text-base font-normal leading-[19px] text-[#222222]"
          type="button"
        >
          View
        </button>
      </div>
    </article>
  );
}