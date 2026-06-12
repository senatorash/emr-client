"use client";

import { motion } from "framer-motion";
import { LuFilter, LuSearch } from "react-icons/lu";
import { useEffect, useState } from "react";
import DashBoardLayout from "@/components/dashboard/DashBoardLayout";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import PatientTable from "@/components/patient/PatientTable";
import { useGetAllPatientsQuery } from "@/lib/features/apis/PatientApi";
import AddPatient from "@/components/patient/AddPatient";

const Patient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 3;

  const { data, isLoading } = useGetAllPatientsQuery({
    page,
    limit,
    search: debouncedSearch,
  });

  // debounce search input to avoid making too many requests while user is typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery);
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
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="font-display text-3xl font-bold">Patients</h1>
            <p className="mt-1 text-muted-foreground">
              Manage patient records and information
            </p>
          </div>
          <AddPatient />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <div className="relative max-w-md flex-1">
            <LuSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search patients by name, email, id..."
              value={searchQuery}
              id="search"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Select
              defaultValue="all"
              onValueChange={(v) =>
                setDebouncedSearch?.(
                  v === "all"
                    ? ""
                    : (v as "active" | "inactive" | "discharged" | "deceased"),
                )
              }
            >
              <SelectTrigger className="w-40">
                <LuFilter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="discharged">Discharged</SelectItem>
                <SelectItem value="deceased">Deceased</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <PatientTable
          patient={data?.data || []}
          page={page}
          setPage={setPage}
          pagination={
            data?.pagination ?? {
              total: 0,
              page: 1,
              limit: 3,
              totalPages: 1,
            }
          }
          isLoading={isLoading}
        />
      </div>
    </DashBoardLayout>
  );
};
export default Patient;
