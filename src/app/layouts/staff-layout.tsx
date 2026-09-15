import type { PropsWithChildren } from 'react';

import notificationIcon from '@/assets/icons/notification-icon.svg';
import orderButtonIcon from '@/assets/icons/order-button-icon.svg';
import restaurantCrmIcon from '@/assets/icons/restaurant-CRM-icon.svg';
import statisticsButtonIcon from '@/assets/icons/statistics-button-icon.svg';
import tablesButtonIcon from '@/assets/icons/tables-button-icon.svg';
import userIcon from '@/assets/icons/user-icon.svg';

interface StaffNavigationItem {
  label: string;
  icon: string;
  isActive?: boolean;
}

const staffNavigationItems: StaffNavigationItem[] = [
  {
    label: 'Tables',
    icon: tablesButtonIcon,
    isActive: true,
  },
  {
    label: 'Orders',
    icon: orderButtonIcon,
  },
  {
    label: 'Statistics',
    icon: statisticsButtonIcon,
  },
];

export function StaffLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-white text-[#222222] xl:flex">
      <aside className="hidden min-h-screen w-[260px] shrink-0 bg-[#222222] p-6 xl:block">
        <img
          alt="Restaurant CRM"
          className="mx-auto h-[14px] w-[158px]"
          src={restaurantCrmIcon}
        />

        <div className="my-6 h-px w-[212px] bg-white" />

        <nav className="flex w-[212px] flex-col gap-2">
          {staffNavigationItems.map(({ label, icon, isActive }) => (
            <button
                className={[
                    'flex h-14 w-[212px] items-center gap-2 px-4 text-left font-medium transition-colors',
                    isActive
                        ? 'bg-white text-[#383838]'
                        : 'bg-[#393939] text-white hover:bg-[#4A4A4A]',
                ].join(' ')}
                key={label}
                type="button"
            >
              <img
                alt=""
                aria-hidden="true"
                className="size-6 shrink-0"
                src={icon}
              />

              <span className="text-base leading-6">{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 px-6 py-6">
        <header className="flex h-10 items-center justify-end">
          <div className="flex items-center">
            <img
              alt="Notifications"
              className="size-6"
              src={notificationIcon}
            />

            <img
              alt="User profile"
              className="ml-[18px] size-6"
              src={userIcon}
            />

            <span className="ml-2 text-base font-medium leading-6 text-[#222222]">
              Okechukwu Andrey
            </span>
          </div>
        </header>

        <main className="mt-2">{children}</main>
      </div>
    </div>
  );
}