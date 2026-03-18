import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuMail, LuPhone, LuBuilding2 } from "react-icons/lu";
import { Badge } from "../ui/badge";
import { MoreHorizontal } from "lucide-react";

interface StaffMember {
  _id: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

interface StaffCardProps {
  staff: StaffMember;
}

const StaffCard = ({ staff }: StaffCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="group hover:shadow-card-hover transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                {`${staff.firstName[0] ?? ""}${staff.lastName[0] ?? ""}`.toUpperCase() ||
                  `${staff.fullName.split("")[0]}`}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">
                {staff.firstName} {staff.lastName}
              </h3>
              {/* <p className="text-sm text-muted-foreground">
                {member.department}{" "}
                {member.specialization && `· ${member.specialization}`}
              </p> */}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex h-8 w-8 items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 ring-offset-background transition-all duration-200 group-hover:opacity-100 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Edit Details</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Deactivate Account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LuMail className="h-4 w-4" />
            {staff.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LuPhone className="h-4 w-4" />
            {/* {staff.phone} */}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LuBuilding2 className="h-4 w-4" />
            {/* {staff.department} */}
          </div>
        </div>

        {/* <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <Badge variant="outline" className={statusColors[member.status]}>
            {member.status.replace("_", " ")}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {member.patientsCount} patients
          </span>
        </div> */}
      </CardContent>
    </Card>
  </motion.div>
);

export default StaffCard;
