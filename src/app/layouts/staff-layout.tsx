import { Link, useRouterState } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

import notificationIcon from "@/assets/icons/notification-icon.svg";
import orderButtonIcon from "@/assets/icons/order-button-icon.svg";
import restaurantCrmIcon from "@/assets/icons/restaurant-CRM-icon.svg";
import statisticsButtonIcon from "@/assets/icons/statistics-button-icon.svg";
import tablesButtonIcon from "@/assets/icons/tables-button-icon.svg";
import userIcon from "@/assets/icons/user-icon.svg";

export function StaffLayout({ children }: PropsWithChildren) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isTablesPage = pathname === "/staff/tables";

  const tablesLinkClassName = [
    "flex h-14 w-[212px] items-center gap-2 px-4 text-left font-medium transition-colors",
    isTablesPage
      ? "bg-white text-[#383838]"
      : "bg-[#393939] text-white hover:bg-[#4A4A4A]",
  ].join(" ");

  return (
    <div className="min-h-screen bg-white text-[#222222] xl:flex">
      <aside className="hidden min-h-screen w-[260px] shrink-0 bg-[#222222] p-6 xl:block">
        <Link
          aria-label="Go to workspace selection"
          className="mx-auto block w-fit"
          to="/"
        >
          <img
            alt="Restaurant CRM"
            className="h-[14px] w-[158px]"
            src={restaurantCrmIcon}
          />
        </Link>

        <div className="my-6 h-px w-[212px] bg-white" />

        <nav className="flex w-[212px] flex-col gap-2">
          <Link className={tablesLinkClassName} to="/staff/tables">
            <img
              alt=""
              aria-hidden="true"
              className="size-6 shrink-0"
              src={tablesButtonIcon}
            />

            <span className="text-base leading-6">Tables</span>
          </Link>

          <button
            className="flex h-14 w-[212px] items-center gap-2 bg-[#393939] px-4 text-left font-medium text-white transition-colors hover:bg-[#4A4A4A]"
            type="button"
          >
            <img
              alt=""
              aria-hidden="true"
              className="size-6 shrink-0"
              src={orderButtonIcon}
            />

            <span className="text-base leading-6">Orders</span>
          </button>

          <button
            className="flex h-14 w-[212px] items-center gap-2 bg-[#393939] px-4 text-left font-medium text-white transition-colors hover:bg-[#4A4A4A]"
            type="button"
          >
            <img
              alt=""
              aria-hidden="true"
              className="size-6 shrink-0"
              src={statisticsButtonIcon}
            />

            <span className="text-base leading-6">Statistics</span>
          </button>
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
