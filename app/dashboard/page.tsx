"use client";

import { motion } from "framer-motion";
import DashBoardLayout from "@/components/layouts/dashboard/DashBoardLayout";
import { useAppSelector } from "@/lib/hook";
import { useDashBoardStatsQuery } from "@/lib/features/apis/DashBoardApis";
import StatsCard from "@/components/layouts/dashboard/StatsCard";

const dashboard = () => {
  const { user } = useAppSelector((state) => state.userState);
  const { data, isLoading, isError } = useDashBoardStatsQuery();
  console.log(data);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <DashBoardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-3xl font-bold">
            {getGreeting()}, {user?.fullName.split(" ")[0]}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here's what's happening with your patients today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* {stats.map((stat, index) => ( */}
          <StatsCard
            key={data?.stats.totalPatients}
            title={"Total Patients"}
            value={data?.stats.totalPatients || 0}
            // change={stat.change}
            // changeType={stat.changeType}
            // icon={stat.icon}
            // iconColor={stat.iconColor}
            // delay={index * 0.1}
          />
          {/* ))} */}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">{/* <PatientList /> */}</div>
          <div>{/* <RecentActivity /> */}</div>
        </div>
      </div>
    </DashBoardLayout>
  );
};
export default dashboard;
