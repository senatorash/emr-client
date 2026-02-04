"use client";

import { motion } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { LuX, LuPlus, LuChevronDown, LuCheck } from "react-icons/lu";
import DashBoardLayout from "@/components/layouts/dashboard/DashBoardLayout";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogOverlay = DialogPrimitive.Overlay;
const DialogContent = DialogPrimitive.Content;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

const SelectRoot = Select.Root;
const SelectTrigger = Select.Trigger;
const SelectValue = Select.Value;
const SelectContent = Select.Content;
const SelectItem = Select.Item;

const Patient = () => {
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
          {/* open={isAddingPatient} onOpenChange={setIsAddingPatient} */}
          <Dialog>
            {/* <DialogPortal> */}
            <DialogOverlay />
            <DialogTrigger asChild>
              <button className="gradient-primary inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold whitespace-nowrap text-primary-foreground shadow-lg ring-offset-background transition-all duration-200 hover:shadow-xl hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                <LuPlus className="h-4 w-4" />
                Add Patient
              </button>
            </DialogTrigger>
            <DialogContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:max-w-lg sm:rounded-lg">
              <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <DialogTitle>Add New Patient</DialogTitle>
                <DialogDescription>
                  Enter the patient's information to create a new record.
                </DialogDescription>
              </div>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      id="firstName"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      id="lastName"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="dob"
                    >
                      Date of Birth
                    </label>
                    <input
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      id="dob"
                      type="date"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <SelectRoot>
                      <SelectTrigger className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                        <SelectValue placeholder="Select gender" />
                        <Select.Icon asChild>
                          <LuChevronDown className="h-4 w-4 opacity-50" />
                        </Select.Icon>
                      </SelectTrigger>
                      <Select.Portal>
                        <SelectContent
                          position="popper"
                          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
                        >
                          <Select.ScrollUpButton className="flex cursor-default items-center justify-center py-1" />
                          <Select.Viewport className="h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) p-1">
                            <SelectItem
                              className="relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
                              value="male"
                            >
                              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                <Select.ItemIndicator>
                                  <LuCheck className="h-4 w-4" />
                                </Select.ItemIndicator>
                              </span>
                              <Select.ItemText>Male</Select.ItemText>
                            </SelectItem>
                            <SelectItem
                              className="relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
                              value="female"
                            >
                              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                <Select.ItemIndicator>
                                  <LuCheck className="h-4 w-4" />
                                </Select.ItemIndicator>
                              </span>
                              <Select.ItemText>Female</Select.ItemText>
                            </SelectItem>
                            <SelectItem
                              className="relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
                              value="other"
                            >
                              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                <Select.ItemIndicator>
                                  <LuCheck className="h-4 w-4" />
                                </Select.ItemIndicator>
                              </span>
                              <Select.ItemText>Other</Select.ItemText>
                            </SelectItem>
                          </Select.Viewport>
                          <LuChevronDown className="h-4 w-4" />
                          <Select.ScrollDownButton className="flex cursor-default items-center justify-center py-1" />
                        </SelectContent>
                      </Select.Portal>
                    </SelectRoot>
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    id="phone"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    id="email"
                    type="email"
                    placeholder="patient@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="bloodType"
                  >
                    Blood Type
                  </label>
                  {/* <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select> */}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                  // onClick={() => setIsAddingPatient(false)}
                >
                  Cancel
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                  Add Patient
                </button>
              </div>
              <DialogPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <LuX className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </DialogContent>
            {/* </DialogPortal>s */}
          </Dialog>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <div className="relative max-w-md flex-1">
            {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
            <input
              placeholder="Search patients..."
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
          {/* <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="discharged">Discharged</SelectItem>
              </SelectContent>
            </Select>
        {/* </div> */}
        </motion.div>

        {/* Patients Table */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow>
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
              {filteredPatients.map((patient, index) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
                          {patient.firstName[0]}
                          {patient.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {patient.firstName} {patient.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {calculateAge(patient.dateOfBirth)} yrs ·{" "}
                          {patient.gender}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {patient.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.bloodType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.slice(0, 2).map((condition) => (
                        <Badge
                          key={condition}
                          variant="secondary"
                          className="text-xs"
                        >
                          {condition}
                        </Badge>
                      ))}
                      {patient.conditions.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{patient.conditions.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusColors[patient.status]}
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(patient.lastVisit).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          View Records
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div> */}
      </div>
    </DashBoardLayout>
  );
};
export default Patient;
