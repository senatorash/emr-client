import { motion } from "framer-motion";
import { useState } from "react";
import { LuEye, LuFileText, LuMail, LuPhone } from "react-icons/lu";
import { LucideMoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
  TableFooter,
  TableCaption,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { calculateAge } from "@/helper/calculateAge";

type Patient = {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  nextOfKin: string;
  emergencyContact: string;
  patientId: string;
};

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
};

type PatientTableProps = {
  filteredPatients: Patient[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pagination: Pagination;
};

const PatientTable = ({
  filteredPatients,
  page,
  setPage,
  pagination,
}: PatientTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-card"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Blood Type</TableHead>
            <TableHead>Conditions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients?.map((patient, index) => (
            <motion.tr
              key={patient._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="group transition-colors hover:bg-muted/50"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{patient.patientId}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-secondary font-medium text-secondary-foreground">
                      {patient.firstName[0]}
                      {patient.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {calculateAge(patient.dob)} yrs ·{patient.gender}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <LuPhone className="h-3 w-3 text-muted-foreground" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <LuMail className="h-3 w-3" />
                    {patient.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{patient.bloodGroup}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {/* {patient.conditions.slice(0, 2).map((condition) => ( */}
                  <Badge
                    // key={condition}
                    variant="secondary"
                    className="text-xs"
                  >
                    {/* {condition} */}
                  </Badge>
                  {/* ))}
                  {patient.conditions.length > 2 && ( */}
                  <Badge variant="secondary" className="text-xs">
                    {/* +{patient.conditions.length - 2} */}
                  </Badge>
                  {/* )} */}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  // className={statusColors[patient.status]}
                >
                  {/* {patient.status} */}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {/* {new Date(patient.lastVisit).toLocaleDateString()} */}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex h-8 w-8 items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 ring-offset-background transition-all duration-200 group-hover:opacity-100 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                      <LucideMoreHorizontal className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <LuEye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LuFileText className="mr-2 h-4 w-4" />
                      View Records
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>

      <motion.div className="flex items-center justify-center p-4">
        {Array.from({ length: pagination.totalPages || 0 }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`${page === index + 1 ? "bg-primary text-white" : "bg-secondary text-secondary-foreground"} mx-1 rounded-md px-3 py-1`}
          >
            {index + 1}
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PatientTable;
