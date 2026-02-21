import { IconType } from "react-icons";
import {
  LuActivity,
  LuCalendar,
  LuFileText,
  LuUser,
  LuUserCog,
} from "react-icons/lu";

export const statVisualConfig: Record<
  string,
  Record<string, { icon: IconType; iconColor: string }>
> = {
  super_admin: {
    "Total Staff": { icon: LuUserCog, iconColor: "bg-primary/10 text-primary" },
    "Total Patients": { icon: LuUser, iconColor: "bg-success/10 text-success" },
    "Medical Records": {
      icon: LuFileText,
      iconColor: "bg-accent/10 text-accent",
    },
    "Today's Appointments": {
      icon: LuCalendar,
      iconColor: "bg-warning/10 text-warning",
    },
    "Total Appointments": {
      icon: LuCalendar,
      iconColor: "bg-warning/10 text-warning",
    },
    "System Uptime": {
      icon: LuActivity,
      iconColor: "bg-warning/10 text-warning",
    },
  },

  doctor: {
    "Total Patients": { icon: LuUser, iconColor: "bg-primary/10 text-primary" },
    "Today's Appointments": {
      icon: LuCalendar,
      iconColor: "bg-success/10 text-success",
    },
    "Total Appointments": {
      icon: LuCalendar,
      iconColor: "bg-warning/10 text-warning",
    },
    "Pending Records": {
      icon: LuFileText,
      iconColor: "bg-accent/10 text-accent",
    },
  },

  nurse: {
    "Total Patients": {
      icon: LuUser,
      iconColor: "bg-primary/10 text-primary",
    },
    "Total Records": {
      icon: LuFileText,
      iconColor: "bg-accent/10 text-accent",
    },
    "Records Created": {
      icon: LuFileText,
      iconColor: "bg-warning/10 text-warning",
    },
    "Vitals to Record": {
      icon: LuActivity,
      iconColor: "bg-warning/10 text-warning",
    },
  },
};
