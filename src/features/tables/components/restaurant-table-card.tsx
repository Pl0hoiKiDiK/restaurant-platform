import { Link } from '@tanstack/react-router';

import arrowIcon from '@/assets/icons/arrow-icon.svg';
import type { RestaurantTable } from '@/features/tables/types/table.types';

interface RestaurantTableCardProps {
  table: RestaurantTable;
}

const tableStatusStyles = {
  free: {
    backgroundClassName: 'bg-white',
    badgeClassName: 'bg-[#D3E79D] text-[#222222]',
    label: 'Free',
  },
  occupied: {
    backgroundClassName: 'bg-[#FFF9E2]',
    badgeClassName: 'bg-[#FFE68E] text-[#222222]',
    label: 'Occ',
  },
  reserved: {
    backgroundClassName: 'bg-[#FFE8E8]',
    badgeClassName: 'bg-[#FF5858] text-[#FFE8E8]',
    label: 'Res',
  },
} as const;

export function RestaurantTableCard({
  table,
}: RestaurantTableCardProps) {
  const statusStyle = tableStatusStyles[table.status];

  return (
    <Link
      className={[
        'relative block h-[119px] w-[114px] overflow-hidden rounded-[8px]',
        'border border-[#B1B1B1] text-inherit no-underline',
        'transition-colors duration-150 hover:border-[#777777]',
        statusStyle.backgroundClassName,
      ].join(' ')}
      params={{ tableId: table.id }}
      to="/staff/tables/$tableId"
    >
      <span className="absolute left-2 top-2 text-sm font-bold leading-5 text-black">
        {table.number}
      </span>

      <span
        className={[
          'absolute right-0 top-0 rounded-bl-[8px] rounded-tr-[8px]',
          'px-1 py-1 text-xs font-bold leading-3',
          statusStyle.badgeClassName,
        ].join(' ')}
      >
        {statusStyle.label}
      </span>

      {table.status === 'reserved' && table.reservationTime ? (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold leading-5 text-black">
          {table.reservationTime}
        </span>
      ) : null}

      <img
        alt=""
        aria-hidden="true"
        className="absolute bottom-2 left-1/2 h-[10px] w-3 -translate-x-1/2"
        src={arrowIcon}
      />
    </Link>
  );
}