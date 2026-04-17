"use client";

import DashBoardLayout from "@/components/layouts/dashboard/DashBoardLayout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LuFilter, LuSearch } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddRecords from "@/components/records/AddRecords";
import { useGetAllRecordsQuery } from "@/lib/features/apis/RecordApi";
import { recordType } from "@/data/recordType";
import { statusType } from "@/data/statusType";
import RecordCard from "@/components/records/RecordCard";

const RecordsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [debounceSearch, setDebounceSearch] = useState("");
  const limit = 10;

  const { data, isLoading } = useGetAllRecordsQuery({
    page,
    limit,
    search: debounceSearch,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearch(searchQuery);
      setPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <DashBoardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-3xl font-bold">Medical Records</h1>
            <p className="mt-1 text-muted-foreground">
              View and manage patient medical records
            </p>
          </div>
          <AddRecords />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* {isLoading ? (
            <StatsCardsSkeleton />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Records
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-display text-2xl font-bold">
                    {mockRecords.length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pending Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-display text-2xl font-bold text-warning">
                    {mockRecords.filter((r) => r.status === "pending").length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-display text-2xl font-bold">12</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Lab Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-display text-2xl font-bold text-accent">
                    {mockRecords.filter((r) => r.type === "lab_result").length}
                  </p>
                </CardContent>
              </Card>
            </div>
          )} */}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <div className="relative max-w-md flex-1">
            <LuSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search records, patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <LuFilter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {recordType.map((type) => {
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusType.map((status) => {
                  return (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Records Grid */}
        <RecordCard
          records={data?.data || []}
          page={page}
          setPage={setPage}
          pagination={
            data?.pagination ?? { total: 0, page: 1, limit: 10, totalPages: 1 }
          }
          isLoading={isLoading}
        />
      </div>
    </DashBoardLayout>
  );
};

export default RecordsPage;
