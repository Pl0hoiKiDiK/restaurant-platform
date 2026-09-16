import { useState } from "react";
import type { ChangeEvent, PropsWithChildren } from "react";
import { toast } from "sonner";

import bestRestaurantsIcon from "@/assets/icons/best-restaurants-icon.svg";
import cartIcon from "@/assets/icons/cart-icon.svg";
import crossIcon from "@/assets/icons/cross-icon.svg";
import menuIcon from "@/assets/icons/menu-icon.svg";
import searchIcon from "@/assets/icons/search-icon.svg";

type OrderMode = "delivery" | "pickup";

interface CustomerLayoutProps extends PropsWithChildren {
  searchQuery?: string;
  onSearchQueryChange?: (searchQuery: string) => void;
}

export function CustomerLayout({
  children,
  searchQuery = "",
  onSearchQueryChange,
}: CustomerLayoutProps) {
  const [orderMode, setOrderMode] = useState<OrderMode>("delivery");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchQueryChange?.(event.target.value);
  }

  function handleCloseSearch() {
    onSearchQueryChange?.("");
    setIsSearchOpen(false);
  }

  return (
    <div className="min-h-screen overflow-hidden bg-white text-[#222222]">
      <header className="relative z-10 flex h-[62px] items-center bg-white px-6 shadow-[0_3px_8px_rgba(0,0,0,0.10)]">
        <div className="flex w-[300px] shrink-0 items-center">
          <img
            alt="Best Restaurants"
            className="h-3 w-[180px]"
            src={bestRestaurantsIcon}
          />
        </div>

        <div className="flex h-8 w-[156px] overflow-hidden rounded-[4px] border border-black/10">
          <button
            aria-pressed={orderMode === "delivery"}
            className={[
              "flex h-full w-[78px] items-center justify-center text-[10px] font-medium leading-3 transition-colors",
              orderMode === "delivery"
                ? "bg-[#F4F4F4] text-[#F34336]"
                : "bg-white text-[#222222]",
            ].join(" ")}
            onClick={() => setOrderMode("delivery")}
            type="button"
          >
            DELIVERY
          </button>

          <button
            aria-pressed={orderMode === "pickup"}
            className={[
              "flex h-full w-[78px] items-center justify-center text-[10px] font-medium leading-3 transition-colors",
              orderMode === "pickup"
                ? "bg-[#F4F4F4] text-[#F34336]"
                : "bg-white text-[#222222]",
            ].join(" ")}
            onClick={() => setOrderMode("pickup")}
            type="button"
          >
            PICKUP
          </button>
        </div>

        <div className="ml-auto flex items-center gap-4">
          {isSearchOpen ? (
            <div className="flex h-9 w-[260px] items-center rounded-[4px] border border-black/10 bg-white px-2">
              <img
                alt=""
                aria-hidden="true"
                className="size-6 shrink-0"
                src={searchIcon}
              />

              <input
                aria-label="Search restaurants"
                autoFocus
                className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-[#222222]/40"
                onChange={handleSearchChange}
                placeholder="Search restaurants"
                type="text"
                value={searchQuery}
              />

              <button
                aria-label="Close restaurant search"
                className="grid size-6 shrink-0 place-items-center"
                onClick={handleCloseSearch}
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
          ) : (
            <button
              aria-label="Search restaurants"
              className="grid size-9 place-items-center"
              onClick={() => setIsSearchOpen(true)}
              type="button"
            >
              <img
                alt=""
                aria-hidden="true"
                className="size-9"
                src={searchIcon}
              />
            </button>
          )}

          <button
            aria-label="Open cart"
            className="grid size-9 place-items-center"
            onClick={() =>
              toast.info("Cart is coming soon", {
                description: "You will be able to review selected dishes here.",
              })
            }
            type="button"
          >
            <img alt="" aria-hidden="true" className="size-9" src={cartIcon} />
          </button>

          <button
            aria-label="Open menu"
            className="grid size-6 place-items-center"
            onClick={() =>
              toast.info("Menu is coming soon", {
                description: "More customer options will be available soon.",
              })
            }
            type="button"
          >
            <img alt="" aria-hidden="true" className="size-6" src={menuIcon} />
          </button>
        </div>
      </header>

      {children}
    </div>
  );
}
