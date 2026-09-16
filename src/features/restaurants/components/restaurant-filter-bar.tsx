import crossIcon from '@/assets/icons/cross-icon.svg';
import filterRedIcon from '@/assets/icons/filter-red-icon.svg';

const activeFilters = ['Asian', 'Thai'];

export function RestaurantFilterBar() {
  return (
    <div className="flex h-9 w-full items-center rounded-[4px] bg-[#EEEEEE] px-2 py-1">
      <img
        alt=""
        aria-hidden="true"
        className="size-6 shrink-0"
        src={filterRedIcon}
      />

      <div className="ml-3 flex min-w-0 items-center gap-3">
        {activeFilters.map((filter) => (
          <div className="flex items-center gap-2" key={filter}>
            <span className="text-sm font-medium leading-5 text-[#222222]">
              {filter}
            </span>

            <button
              aria-label={`Remove ${filter} filter`}
              className="grid size-[10px] place-items-center"
              type="button"
            >
              <img
                alt=""
                aria-hidden="true"
                className="size-[10px]"
                src={crossIcon}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}