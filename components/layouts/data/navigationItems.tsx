import {
  LuUser,
  LuLayoutDashboard,
  LuUserCog,
  LuFileText,
  LuActivity,
  LuSettings,
  LuCalendar,
} from "react-icons/lu";

export const navigationItems = {
  super_admin: [
    { icon: LuLayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: LuUserCog, label: "Staff Management", path: "/staff" },
    { icon: LuUser, label: "Patients", path: "/patients" },
    { icon: LuFileText, label: "Records", path: "/records" },
    { icon: LuActivity, label: "Analytics", path: "/analytics" },
    { icon: LuSettings, label: "Settings", path: "/settings" },
  ],
  doctor: [
    { icon: LuLayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: LuUser, label: "My Patients", path: "/patients" },
    { icon: LuFileText, label: "Medical Records", path: "/records" },
    { icon: LuCalendar, label: "Appointments", path: "/appointments" },
    { icon: LuSettings, label: "Settings", path: "/settings" },
  ],
  nurse: [
    { icon: LuLayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: LuUser, label: "Patients", path: "/patients" },
    { icon: LuFileText, label: "Records", path: "/records" },
    { icon: LuCalendar, label: "Schedule", path: "/schedule" },
    { icon: LuSettings, label: "Settings", path: "/settings" },
  ],
};
