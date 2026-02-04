"use client";

import Link from "next/link";
import { LuHeart, LuX, LuMenu } from "react-icons/lu";
import { useState } from "react";
import DarkModeSwitch from "../ui/DarkModeSwitch";
import { useAppSelector } from "@/lib/hook";
import { navItems } from "./data/navItem";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isHydrated } = useAppSelector((state) => state.userState);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/70">
              <LuHeart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">LumorA</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <DarkModeSwitch />
            <div className="hidden items-center gap-2 md:flex">
              {/* <Link href="/signin">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-secondary hover:text-secondary-foreground h-10 px-4 py-2">
                  Sign In
                </button>
              </Link> */}
              {isHydrated ? (
                <Link href={user ? "/dashboard" : "/signin"}>
                  <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm ring-offset-background transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                    {user ? "Dashboard" : "Get Started"}
                  </button>
                </Link>
              ) : (
                <div className="h-10 w-24 animate-pulse rounded-lg bg-muted" />
              )}
            </div>
            <button
              className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:hidden [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <LuX /> : <LuMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 border-t border-border pt-4">
                {isHydrated ? (
                  <Link href={user ? "/dashboard" : "/signin"}>
                    <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm ring-offset-background transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                      {user ? "Dashboard" : "Get Started"}
                    </button>
                  </Link>
                ) : (
                  <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
