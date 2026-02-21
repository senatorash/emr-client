import { statVisualConfig } from "@/components/layouts/dashboard/statsItem";
import { LuFileText } from "react-icons/lu";

export const enrichRoleStats = (
  role: string,
  rawStats: Array<{
    title: string;
    value: number | string;
    change: string;
    changeType: "positive" | "neutral" | "negative";
  }>,
) => {
  const roleConfig = statVisualConfig[role];

  return rawStats.map((stat) => {
    const visual = roleConfig[stat.title];

    // if no visual config found for this stat, return it as is
    if (!visual)
      return {
        ...stat,
        icon: LuFileText,
        iconColor: "bg-gray-400/20 text-gray-600",
        changeType: stat.changeType ?? ("neutral" as const),
      };

    return {
      ...stat,
      icon: visual.icon,
      iconColor: visual.iconColor,
      changeType: stat.changeType ?? ("neutral" as const),
    };
  });
};
