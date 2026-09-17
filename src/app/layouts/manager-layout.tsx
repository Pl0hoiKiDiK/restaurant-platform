import { Link, useRouterState } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

import analyticsIcon from "@/assets/icons/analytics-icon.svg";
import employessIcon from "@/assets/icons/employess-icon.svg";
import homeIcon from "@/assets/icons/home-icon.svg";
import notificationIcon from "@/assets/icons/notification-icon.svg";
import payrollIcon from "@/assets/icons/payroll-icon.svg";
import restaurantCrmDarkIcon from "@/assets/icons/restaurant-CRM-dark-icon.svg";
import shiftIcon from "@/assets/icons/shift-icon.svg";
import sickDaysIcon from "@/assets/icons/sick-days-icon.svg";
import tasksIcon from "@/assets/icons/tasks-icon.svg";
import userIcon from "@/assets/icons/user-icon.svg";
import vacationIcon from "@/assets/icons/vacation-icon.svg";

interface ManagerNavigationItem {
  label: string;
  icon: string;
}

const managerNavigationItems: ManagerNavigationItem[] = [
  { label: "Home", icon: homeIcon },
  { label: "Shift", icon: shiftIcon },
  { label: "Payroll", icon: payrollIcon },
  { label: "Tasks", icon: tasksIcon },
  { label: "Analytics", icon: analyticsIcon },
  { label: "Employees", icon: employessIcon },
  { label: "Vacation", icon: vacationIcon },
  { label: "Sick days", icon: sickDaysIcon },
];

export function ManagerLayout({ children }: PropsWithChildren) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isEmployeesPage = pathname === "/staff/employees";

  return (
    <div className="min-h-screen bg-white text-[#222222] xl:flex">
      <aside className="hidden min-h-screen w-[260px] shrink-0 bg-[#FAFAFA] p-6 xl:block">
        <Link
          aria-label="Go to workspace selection"
          className="mx-auto block w-fit"
          to="/"
        >
          <img
            alt="Restaurant CRM"
            className="h-[14px] w-[158px]"
            src={restaurantCrmDarkIcon}
          />
        </Link>

        <div className="my-6 h-px w-[212px] bg-black" />

        <nav className="flex w-[212px] flex-col gap-2">
          {managerNavigationItems.map(({ label, icon }) => {
            const isActive = label === "Employees" && isEmployeesPage;

            const itemClassName = [
              "flex h-14 w-[212px] items-center gap-2 rounded-[4px] px-4 text-left font-medium transition-colors",
              isActive
                ? "bg-[#222222] text-white"
                : "bg-white text-[#222222] hover:bg-[#F0F0F0]",
            ].join(" ");

            if (label === "Employees") {
              return (
                <Link
                  className={itemClassName}
                  key={label}
                  to="/staff/employees"
                >
                  <img
                    alt=""
                    aria-hidden="true"
                    className="size-6 shrink-0"
                    src={icon}
                  />

                  <span className="text-base leading-6">{label}</span>
                </Link>
              );
            }

            return (
              <button className={itemClassName} key={label} type="button">
                <img
                  alt=""
                  aria-hidden="true"
                  className="size-6 shrink-0"
                  src={icon}
                />

                <span className="text-base leading-6">{label}</span>
              </button>
            );
          })}
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
              Dwayne Exum
            </span>
          </div>
        </header>

        <main className="mt-2">{children}</main>
      </div>
    </div>
  );
}
