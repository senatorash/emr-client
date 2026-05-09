import { motion } from "framer-motion";
import {
  typeColors,
  statusColors,
  RecordProps,
} from "@/types/record.interface";
import {
  LuStethoscope,
  LuUser,
  LuCalendar,
  LuEye,
  LuDownload,
  LuFileText,
  LuFileImage,
  LuClipboardList,
  LuPill,
  LuTestTube,
  LuPencil,
  LuTrash2,
  LuEllipsisVertical,
} from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

const typeIcons = {
  consultation: LuStethoscope,
  lab_result: LuTestTube,
  prescription: LuPill,
  procedure: LuClipboardList,
  imaging: LuFileImage,
  notes: LuFileText,
};

const RecordCard = ({
  records,
  page,
  setPage,
  pagination,
  isLoading,
}: RecordProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* {isLoading ? (
      <RecordsGridSkeleton />
    ) : ( */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {records.map((record, index) => {
          const Icon = typeIcons[record.recordType];
          return (
            <motion.div
              key={record._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card className="group hover:shadow-card-hover cursor-pointer transition-all duration-300">
                <CardContent className="">
                  <div className="mb-3 flex items-start justify-between">
                    <div
                      className={`rounded-xl p-2.5 ${typeColors[record.recordType]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={statusColors[record.status]}
                      >
                        {record.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="inline-flex h-7 w-7 items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 ring-offset-background transition-all duration-200 group-hover:opacity-100 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                            <LuEllipsisVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {/* onClick={() => setViewRecord(record)} */}
                          <DropdownMenuItem>
                            <LuEye className="mr-2 h-4 w-4 dark:hover:text-[#0000]" />
                            View
                          </DropdownMenuItem>
                          {/* onClick={() => setEditRecord(record)} */}
                          <DropdownMenuItem>
                            <LuPencil className="mr-2 h-4 w-4 dark:hover:text-[#0000]" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            // onClick={() => setDeleteRecord(record)}
                          >
                            <LuTrash2 className="mr-2 h-4 w-4 dark:hover:text-[#0000]" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <h3 className="mb-1 line-clamp-1 font-semibold">
                    {record.diagnosis}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                    {record.complaints}
                  </p>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <LuUser className="h-4 w-4" />
                      {record.personId.firstName} {record.personId.lastName}
                    </div>
                    <div className="flex items-center gap-2">
                      <LuStethoscope className="h-4 w-4" />
                      {record.createdBy.firstName} {record.createdBy.lastName}
                    </div>
                    <div className="flex items-center gap-2">
                      <LuCalendar className="h-4 w-4" />
                      {new Date(record.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* <div className="mt-4 flex gap-2 border-t border-border pt-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                      <LuEye className="mr-1 h-4 w-4" />
                      View
                    </button>
                    <button className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                      <LuDownload className="mr-1 h-4 w-4" />
                      Export
                    </button>
                  </div> */}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
      {/* )} */}

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

export default RecordCard;
