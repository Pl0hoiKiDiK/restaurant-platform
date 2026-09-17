import { Link, useRouterState } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';
import { toast } from 'sonner';

import analyticsIcon from '@/assets/icons/analytics-icon.svg';
import employessIcon from '@/assets/icons/employess-icon.svg';
import homeIcon from '@/assets/icons/home-icon.svg';
import notificationIcon from '@/assets/icons/notification-icon.svg';
import payrollIcon from '@/assets/icons/payroll-icon.svg';
import restaurantCrmDarkIcon from '@/assets/icons/restaurant-CRM-dark-icon.svg';
import shiftIcon from '@/assets/icons/shift-icon.svg';
import sickDaysIcon from '@/assets/icons/sick-days-icon.svg';
import tasksIcon from '@/assets/icons/tasks-icon.svg';
import userIcon from '@/assets/icons/user-icon.svg';
import vacationIcon from '@/assets/icons/vacation-icon.svg';

interface ManagerNavigationItem {
  icon: string;
  label: string;
}

const managerNavigationItems: ManagerNavigationItem[] = [
  { icon: homeIcon, label: 'Home' },
  { icon: shiftIcon, label: 'Shift' },
  { icon: payrollIcon, label: 'Payroll' },
  { icon: tasksIcon, label: 'Tasks' },
  { icon: analyticsIcon, label: 'Analytics' },
  { icon: employessIcon, label: 'Employees' },
  { icon: vacationIcon, label: 'Vacation' },
  { icon: sickDaysIcon, label: 'Sick days' },
];

export function ManagerLayout({ children }: PropsWithChildren) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isEmployeesPage = pathname === '/staff/employees';

  function handleUnavailableSection(sectionName: string) {
    toast.info(`${sectionName} is coming soon`, {
      description: 'This workspace section is not implemented yet.',
    });
  }

  return (
    <div className="flex min-h-screen bg-white text-[#222222]">
      <aside className="workspace-sidebar min-h-screen shrink-0 bg-[#FAFAFA]">
        <Link
          aria-label="Go to workspace selection"
          className="mx-auto block w-fit"
          to="/"
        >
          <img
            alt="Restaurant CRM"
            className="h-auto w-full max-w-[158px]"
            src={restaurantCrmDarkIcon}
          />
        </Link>

        <div className="my-4 xl:my-6 h-px w-full bg-black" />

        <nav className="flex w-full flex-col gap-2">
          {managerNavigationItems.map(({ icon, label }) => {
            const isActive = label === 'Employees' && isEmployeesPage;

            const itemClassName = [
              'flex h-11 xl:h-14 w-full items-center justify-center sm:justify-start gap-2 rounded-[4px] px-1 sm:px-3 xl:px-4 text-left font-medium transition-colors',
              isActive
                ? 'bg-[#222222] text-white'
                : 'bg-white text-[#222222] hover:bg-[#F0F0F0]',
            ].join(' ');

            if (label === 'Employees') {
              return (
                <Link className={itemClassName} key={label} to="/staff/employees">
                  <img alt="" aria-hidden="true" className="size-6 shrink-0" src={icon} />

                  <span className="sr-only sm:not-sr-only sm:text-sm xl:text-base leading-6">
                    {label}
                  </span>
                </Link>
              );
            }

            return (
              <button
                className={itemClassName}
                key={label}
                onClick={() => handleUnavailableSection(label)}
                type="button"
              >
                <img alt="" aria-hidden="true" className="size-6 shrink-0" src={icon} />

                <span className="sr-only sm:not-sr-only sm:text-sm xl:text-base leading-6">
                  {label}
                </span>
              </button>
            );
          })}
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
                  description: 'You will be able to view manager notifications here.',
                })
              }
              type="button"
            >
              <img alt="" aria-hidden="true" className="size-6" src={notificationIcon} />
            </button>

            <button
              aria-label="Open user profile for Dwayne Exum"
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
                Dwayne Exum
              </span>
            </button>
          </div>
        </header>

        <main className="mt-2">{children}</main>
      </div>
    </div>
  );
}
