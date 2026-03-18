"use client";

import DashBoardLayout from "@/components/layouts/dashboard/DashBoardLayout";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LuStethoscope,
  LuTestTube,
  LuPill,
  LuClipboardList,
  LuFileImage,
  LuFileText,
  LuUser,
  LuCalendar,
  LuEye,
  LuDownload,
  LuFilter,
  LuSearch,
} from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AddRecords from "@/components/records/AddRecords";

interface MedicalRecord {
  id: string;
  patientName: string;
  type:
    | "consultation"
    | "lab_result"
    | "prescription"
    | "procedure"
    | "imaging"
    | "notes";
  title: string;
  description: string;
  date: string;
  createdBy: string;
  status: "complete" | "pending" | "reviewed";
}

const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    patientName: "John Smith",
    type: "consultation",
    title: "Annual Physical Examination",
    description: "Routine checkup, blood pressure slightly elevated",
    date: "2024-01-18",
    createdBy: "Dr. Chen",
    status: "complete",
  },
  {
    id: "2",
    patientName: "Sarah Johnson",
    type: "lab_result",
    title: "Blood Panel Results",
    description: "CBC, lipid panel, glucose levels",
    date: "2024-01-17",
    createdBy: "Lab Tech",
    status: "pending",
  },
  {
    id: "3",
    patientName: "Michael Brown",
    type: "prescription",
    title: "Metoprolol 50mg",
    description: "Beta blocker for cardiac arrhythmia",
    date: "2024-01-16",
    createdBy: "Dr. Patel",
    status: "reviewed",
  },
  {
    id: "4",
    patientName: "Emily Davis",
    type: "imaging",
    title: "Chest X-Ray",
    description: "Evaluation for persistent cough",
    date: "2024-01-15",
    createdBy: "Dr. Anderson",
    status: "complete",
  },
  {
    id: "5",
    patientName: "Robert Wilson",
    type: "procedure",
    title: "Spirometry Test",
    description: "Pulmonary function assessment",
    date: "2024-01-14",
    createdBy: "Nurse Thompson",
    status: "complete",
  },
  {
    id: "6",
    patientName: "Amanda Martinez",
    type: "notes",
    title: "Post-Surgery Follow-up",
    description: "Recovery progressing well, wound healing",
    date: "2024-01-13",
    createdBy: "Dr. Garcia",
    status: "reviewed",
  },
];

const typeIcons = {
  consultation: LuStethoscope,
  lab_result: LuTestTube,
  prescription: LuPill,
  procedure: LuClipboardList,
  imaging: LuFileImage,
  notes: LuFileText,
};

const typeColors = {
  consultation: "bg-primary/10 text-primary",
  lab_result: "bg-accent/10 text-accent",
  prescription: "bg-warning/10 text-warning",
  procedure: "bg-success/10 text-success",
  imaging: "bg-destructive/10 text-destructive",
  notes: "bg-muted text-muted-foreground",
};

const statusColors = {
  complete: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  reviewed: "bg-primary/10 text-primary border-primary/20",
};

const RecordsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredRecords = mockRecords.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || record.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const StatsCardsSkeleton = () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const RecordsGridSkeleton = () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-start justify-between">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="space-y-2 pt-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

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
          {isLoading ? (
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
          )}
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
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <LuFilter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="lab_result">Lab Result</SelectItem>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="procedure">Procedure</SelectItem>
                <SelectItem value="imaging">Imaging</SelectItem>
                <SelectItem value="notes">Notes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Records Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isLoading ? (
            <RecordsGridSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRecords.map((record, index) => {
                const Icon = typeIcons[record.type];
                return (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Card className="group hover:shadow-card-hover cursor-pointer transition-all duration-300">
                      <CardContent className="p-5">
                        <div className="mb-3 flex items-start justify-between">
                          <div
                            className={`rounded-xl p-2.5 ${typeColors[record.type]}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <Badge
                            variant="outline"
                            className={statusColors[record.status]}
                          >
                            {record.status}
                          </Badge>
                        </div>

                        <h3 className="mb-1 line-clamp-1 font-semibold">
                          {record.title}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                          {record.description}
                        </p>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <LuUser className="h-4 w-4" />
                            {record.patientName}
                          </div>
                          <div className="flex items-center gap-2">
                            <LuStethoscope className="h-4 w-4" />
                            {record.createdBy}
                          </div>
                          <div className="flex items-center gap-2">
                            <LuCalendar className="h-4 w-4" />
                            {new Date(record.date).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2 border-t border-border pt-4 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <LuEye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <LuDownload className="mr-1 h-4 w-4" />
                            Export
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </DashBoardLayout>
  );
};

export default RecordsPage;
