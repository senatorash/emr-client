"use client";

import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import DashBoardLayout from "@/components/layouts/dashboard/DashBoardLayout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuUserCog, LuStethoscope } from "react-icons/lu";
import { useDashBoardStaffStatsQuery } from "@/lib/features/apis/StaffApi";
import AddStaff from "@/components/staff/AddStaff";
import StaffTabs from "@/components/staff/StaffTabs";
import StatsCardsSkeleton from "@/components/skeleton/StatsCardsSkeleton";
import { useGetAllStaffQuery } from "@/lib/features/apis/StaffApi";

const StaffPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: staffData, isLoading: staffLoading } = useGetAllStaffQuery({
    page,
    limit,
    search: debouncedSearch,
  });
  const { data, isLoading, isFetching } = useDashBoardStaffStatsQuery();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <DashBoardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="font-display text-3xl font-bold">
              Staff Management
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage doctors and nurses accounts
            </p>
          </div>
          <AddStaff />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {isLoading ? (
            <>
              <StatsCardsSkeleton />
            </>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* {isFetching && (
                <div className="absolute top-2 right-2 h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              )} */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {data?.data?.stats[0]?.title || "Total Staff"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-display text-3xl font-bold">
                    {data?.data?.stats[0]?.value || 0}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <LuStethoscope className="h-4 w-4" />
                    {data?.data?.stats[1]?.title || "Doctors"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-display text-3xl font-bold">
                    {data?.data?.stats[1]?.value || 0}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <LuUserCog className="h-4 w-4" />
                    {data?.data?.stats[2]?.title || "Nurses"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-display text-3xl font-bold">
                    {data?.data?.stats[2]?.value || 0}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <div className="relative max-w-md flex-1">
            <LuSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <StaffTabs
          staff={staffData?.data || []}
          data={data?.data}
          setDebouncedSearch={setDebouncedSearch}
          staffLoading={staffLoading}
        />
      </div>
    </DashBoardLayout>
  );
};
export default StaffPage;
