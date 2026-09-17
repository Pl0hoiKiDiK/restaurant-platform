import { Link, useRouterState } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';
import { toast } from 'sonner';

import notificationIcon from '@/assets/icons/notification-icon.svg';
import orderButtonIcon from '@/assets/icons/order-button-icon.svg';
import restaurantCrmIcon from '@/assets/icons/restaurant-CRM-icon.svg';
import statisticsButtonIcon from '@/assets/icons/statistics-button-icon.svg';
import tablesButtonIcon from '@/assets/icons/tables-button-icon.svg';
import userIcon from '@/assets/icons/user-icon.svg';

export function StaffLayout({ children }: PropsWithChildren) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isTablesPage = pathname.startsWith('/staff/tables');

  const tablesLinkClassName = [
    'flex h-11 xl:h-14 w-full items-center gap-2 justify-center px-1 sm:justify-start sm:px-3 xl:px-4 text-left font-medium transition-colors',
    isTablesPage
      ? 'bg-white text-[#383838]'
      : 'bg-[#393939] text-white hover:bg-[#4A4A4A]',
  ].join(' ');

  function handleUnavailableSection(sectionName: string) {
    toast.info(`${sectionName} is coming soon`, {
      description: 'This workspace section is not implemented yet.',
    });
  }

  return (
    <div className="flex min-h-screen bg-white text-[#222222]">
      <aside className="workspace-sidebar min-h-screen shrink-0 bg-[#222222]">
        <Link
          aria-label="Go to workspace selection"
          className="mx-auto block w-fit"
          to="/"
        >
          <img
            alt="Restaurant CRM"
            className="h-auto w-full max-w-[158px]"
            src={restaurantCrmIcon}
          />
        </Link>

        <div className="my-4 xl:my-6 h-px w-full bg-white" />

        <nav className="flex w-full flex-col gap-2">
          <Link className={tablesLinkClassName} to="/staff/tables">
            <img
              alt=""
              aria-hidden="true"
              className="size-6 shrink-0"
              src={tablesButtonIcon}
            />

            <span className="sr-only sm:not-sr-only sm:text-sm xl:text-base leading-6">
              Tables
            </span>
          </Link>

          <button
            className="flex h-11 xl:h-14 w-full items-center justify-center sm:justify-start gap-2 bg-[#393939] px-1 sm:px-3 xl:px-4 text-left font-medium text-white transition-colors hover:bg-[#4A4A4A]"
            onClick={() => handleUnavailableSection('Orders')}
            type="button"
          >
            <img
              alt=""
              aria-hidden="true"
              className="size-6 shrink-0"
              src={orderButtonIcon}
            />

            <span className="sr-only sm:not-sr-only sm:text-sm xl:text-base leading-6">
              Orders
            </span>
          </button>

          <button
            className="flex h-11 xl:h-14 w-full items-center justify-center sm:justify-start gap-2 bg-[#393939] px-1 sm:px-3 xl:px-4 text-left font-medium text-white transition-colors hover:bg-[#4A4A4A]"
            onClick={() => handleUnavailableSection('Statistics')}
            type="button"
          >
            <img
              alt=""
              aria-hidden="true"
              className="size-6 shrink-0"
              src={statisticsButtonIcon}
            />

            <span className="sr-only sm:not-sr-only sm:text-sm xl:text-base leading-6">
              Statistics
            </span>
          </button>
        </nav>
      </aside>

      <div className="min-w-0 flex-1 px-2 py-4 sm:px-4 xl:px-6 xl:py-6">
        <header className="flex h-10 items-center justify-end">
          <div className="flex items-center">
            <button
              aria-label="Open notifications"
              className="grid size-8 place-items-center rounded-[4px] transition-colors hover:bg-[#F4F4F4]"
              onClick={() =>
                toast.info('Notifications are coming soon', {
                  description: 'You will be able to view staff notifications here.',
                })
              }
              type="button"
            >
              <img alt="" aria-hidden="true" className="size-6" src={notificationIcon} />
            </button>

            <button
              aria-label="Open user profile for Okechukwu Andrey"
              className="ml-[10px] flex h-8 items-center rounded-[4px] px-1 transition-colors hover:bg-[#F4F4F4]"
              onClick={() =>
                toast.info('User profile is coming soon', {
                  description: 'Profile settings are not implemented yet.',
                })
              }
              type="button"
            >
              <img alt="" aria-hidden="true" className="size-6" src={userIcon} />

              <span className="ml-2 text-xs sm:text-base font-medium leading-6 text-[#222222]">
                Okechukwu Andrey
              </span>
            </button>
          </div>
        </header>

        <main className="mt-2">{children}</main>
      </div>
    </div>
  );
}
