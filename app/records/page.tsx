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
import RecordStats from "@/components/records/RecordStats";
import { ViewRecordDialog } from "@/components/records/ViewRecords";
import { Records } from "@/types/record.interface";

const RecordsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const [debounceSearch, setDebounceSearch] = useState("");
  const [viewRecord, setViewRecord] = useState<Records | null>(null);
  const limit = 15;

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
  }, [searchQuery]);

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
        <RecordStats />

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
            <Select
              defaultValue="all"
              onValueChange={(v) =>
                setDebounceSearch?.(
                  v === "all"
                    ? ""
                    : (v as
                        | "lab_result"
                        | "consultation"
                        | "imaging"
                        | "prescription"
                        | "notes"
                        | "procedure"),
                )
              }
            >
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
            <Select
              defaultValue="all"
              onValueChange={(v) =>
                setDebounceSearch?.(
                  v === "all" ? "" : (v as "pending" | "reviewed" | "complete"),
                )
              }
            >
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
          setViewRecord={setViewRecord}
        />
      </div>

      <ViewRecordDialog
        record={viewRecord}
        open={!!viewRecord}
        onOpenChange={(o) => !o && setViewRecord(null)}
      />
    </DashBoardLayout>
  );
};

export default RecordsPage;
