import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LuChevronRight,
  LuChevronLeft,
  LuStethoscope,
  LuLogOut,
} from "react-icons/lu";
import Link from "next/link";
import { navigationItems } from "@/components/layouts/data/navigationItems";
import { useAppSelector } from "@/lib/hook";
import { UserRole } from "@/types/role";

const AppSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const user = useAppSelector((state) => state.userState.user);

  const userRole = useAppSelector(
    (state) => state.userState.user?.role,
  ) as UserRole;

  const getInitials = () => {
    if (user?.role === "doctor") {
      return `D${user?.fullName.split(" ")[0][0]}${user?.fullName.split(" ")[1][0]}`.toUpperCase();
    } else {
      return `${user?.fullName.split(" ")[0][0]}${user?.fullName.split(" ")[1][0]}`.toUpperCase();
    }
  };

  const items = navigationItems[userRole];
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex min-h-screen flex-col bg-sidebar text-sidebar-foreground"
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-20 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground shadow-lg transition-colors hover:bg-sidebar-primary/90"
      >
        {collapsed ? (
          <LuChevronRight className="h-4 w-4" />
        ) : (
          <LuChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-sidebar-border p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
          <LuStethoscope className="h-6 w-6 text-sidebar-primary-foreground" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="font-display text-lg font-bold">MediCare</h1>
              <p className="text-xs text-sidebar-foreground/60">EMR System</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {items?.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`duration-200", "hover:bg-sidebar-accent flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                isActive
                  ? "bg-sidebar-accent font-medium text-sidebar-primary"
                  : ""
              } `}
            >
              <item.icon
                className={`h-5 w-5 shrink-0 ${isActive ? "text-sidebar-primary" : ""} `}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-sidebar-border p-3">
        <div
          className={`flex items-center gap-3 rounded-lg p-2 ${collapsed ? "justify-center" : ""} `}
        >
          {/* <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar> */}
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-teal-500 font-semibold text-white">
            {getInitials()}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0 flex-1"
              >
                <p className="truncate text-sm font-medium">
                  {user?.role === "doctor"
                    ? `Dr. ${user?.fullName}`
                    : `${user?.fullName}`}
                </p>
                <p className="text-xs text-sidebar-foreground/60 capitalize">
                  {user?.role}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap text-sidebar-foreground/70 ring-offset-background transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${collapsed ? "px-0" : ""} `}
        >
          <LuLogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
};
export default AppSideBar;
