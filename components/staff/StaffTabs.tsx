import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffCard from "@/components/staff/StaffCard";
import StaffGridSkeleton from "@/components/skeleton/StaffGridSkeleton";
import { useEffect, useState } from "react";

interface StaffMember {
  _id: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

interface StaffTabsProps {
  staff: StaffMember[];
  data?: any;
  setDebouncedSearch?: React.Dispatch<React.SetStateAction<string>>;
  staffLoading?: boolean;
}

const StaffTabs = ({
  staff,
  data,
  setDebouncedSearch,
  staffLoading,
}: StaffTabsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Tabs
        defaultValue=""
        onValueChange={(v) =>
          setDebouncedSearch?.(v as "" | "doctor" | "nurse")
        }
      >
        <TabsList>
          <TabsTrigger value="">
            All Staff ({data?.stats[0]?.value})
          </TabsTrigger>
          <TabsTrigger value="doctor">
            Doctors ({data?.stats[1]?.value})
          </TabsTrigger>
          <TabsTrigger value="nurse">
            Nurses ({data?.stats[2]?.value})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="" className="mt-6">
          {staffLoading ? (
            <StaffGridSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {staff?.map((staff: StaffMember) => (
                <StaffCard key={staff._id} staff={staff} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="doctor" className="mt-6">
          {staffLoading ? (
            <StaffGridSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {staff?.map((staff: StaffMember) => (
                <StaffCard key={staff._id} staff={staff} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="nurse" className="mt-6">
          {staffLoading ? (
            <StaffGridSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {staff?.map((staff: StaffMember) => (
                <StaffCard key={staff._id} staff={staff} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default StaffTabs;
