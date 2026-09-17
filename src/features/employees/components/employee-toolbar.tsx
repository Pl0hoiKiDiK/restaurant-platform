import { toast } from 'sonner';

import filtersIcon from '@/assets/icons/filters-icon.svg';
import searchIcon from '@/assets/icons/search-icon.svg';

function showComingSoon(featureName: string) {
  toast.info(`${featureName} is coming soon`, {
    description: 'This feature is not implemented yet.',
  });
}

export function EmployeeToolbar() {
  return (
    <div className="flex h-9 items-center">
      <button
        className="flex h-9 w-24 items-center gap-2 rounded-[4px] bg-[#EEEEEE] px-2 py-1 text-base font-medium text-[#222222]"
        onClick={() => showComingSoon('Employee filters')}
        type="button"
      >
        <img
          alt=""
          aria-hidden="true"
          className="size-6"
          src={filtersIcon}
        />

        <span>Filters</span>
      </button>

      <button
        aria-label="Search employees"
        className="ml-auto grid size-9 place-items-center"
        onClick={() => showComingSoon('Employee search')}
        type="button"
      >
        <img
          alt=""
          aria-hidden="true"
          className="size-9"
          src={searchIcon}
        />
      </button>
    </div>
  );
}