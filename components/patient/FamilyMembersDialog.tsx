import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { LuPlus, LuTrash2, LuUsers } from "react-icons/lu";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useCreateFamilyMemberMutation } from "@/lib/features/apis/PatientApi";
import {
  FamilyMemberSchema,
  FamilyMemberForm,
} from "@/lib/schemas/family.schema";
import { toast } from "sonner";

const FamilyMembersDialog = ({
  trigger,
  familyMembers,
  patientName,
  patientId,
}: {
  trigger?: React.ReactNode;
  familyMembers: any[];
  patientName: string;
  patientId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [createFamilyMember] = useCreateFamilyMemberMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FamilyMemberForm>({ resolver: zodResolver(FamilyMemberSchema) });

  const handleAddFamilyMember = async (values: FamilyMemberForm) => {
    setIsAdding(false);
    try {
      const validatedData = FamilyMemberSchema.parse(values);

      const validatedValues = {
        patientId: patientId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        relationship: validatedData.relationship,
        gender: validatedData.gender,
        dob: validatedData.dob,
        phoneNumber: validatedData.phone,
      };

      if (!validatedValues) {
        return;
      }

      const result = await createFamilyMember(validatedValues);
      if (result.data?.success) {
        toast.success(
          result.data.message || "Family member added successfully",
        );
        reset();
      } else {
        setIsAdding(true);
        const errorMessage =
          (result.error &&
            "data" in result.error &&
            (result.error.data as any)?.message) ||
          "Failed to add patient";
        toast.error(errorMessage);
      }
    } catch (error) {}
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setIsAdding(false);
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-input bg-background px-3 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
            <LuUsers className="mr-2 h-4 w-4" />
            Family ({familyMembers.length})
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Family Members</DialogTitle>
          <DialogDescription>
            Manage family members for {patientName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Existing members */}
          <AnimatePresence>
            {familyMembers.map((member) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/50 p-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    {member.firstName} {member.lastName}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {member.relationship}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {member.phone}
                    </span>
                  </div>
                </div>
                <button
                  className="hover:text-destructiveinline-flex h-8 w-8 items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap text-destructive ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                  //   onClick={() => handleRemove(member.id)}
                >
                  <LuTrash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {familyMembers.length === 0 && !isAdding && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No family members added yet.
            </p>
          )}

          {/* Add form */}
          {isAdding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-3"
            >
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-2">
                  <label className="block text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Patient ID *
                  </label>
                  <input
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    id="patientId"
                    value={patientId}
                    readOnly
                    {...register("patient")}
                  />
                  {errors.patient && (
                    <p className="pl-2 text-xs text-red-500">
                      {errors.patient.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    First Name *
                  </label>
                  <input
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    id="firstName"
                    placeholder="Jane"
                    {...register("firstName")}
                  />

                  {errors.firstName && (
                    <p className="pl-2 text-xs text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Last Name *
                  </label>
                  <input
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    id="lastName"
                    placeholder="Smith"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="pl-2 text-xs text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Relationship *
                  </label>
                  <Controller
                    name="relationship"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Spouse",
                            "Parent",
                            "Child",
                            "Sibling",
                            "Guardian",
                            "Other",
                          ].map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.relationship && (
                    <p className="pl-2 text-xs text-red-500">
                      {errors.relationship.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Gender *
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {["Male", "Female", "Other"].map((g) => {
                              return (
                                <SelectItem key={g} value={g}>
                                  {g}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                  {errors.gender && (
                    <p className="pl-2 text-xs text-red-500">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Date of Birth *
                  </label>
                  <input
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    type="date"
                    id="dob"
                    {...register("dob")}
                  />
                  {errors.dob && (
                    <p className="pl-2 text-xs text-red-500">
                      {errors.dob.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Phone *
                  </label>
                  <input
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    placeholder="+1 234 567 890"
                  />
                  {errors.phone && (
                    <p className="pl-2 text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              {/* <div className="space-y-1">
                <label className="text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <input
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="jane@email.com"
                />
                {errors.email && (
                  <p className="pl-2 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div> */}
              <div className="flex justify-end gap-2 pt-1">
                <button
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                  onClick={() => {
                    setIsAdding(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                  onClick={handleSubmit(handleAddFamilyMember)}
                >
                  Add Member
                </button>
              </div>
            </motion.div>
          )}

          {/* Add button */}
          {!isAdding && (
            <button
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-background p-3 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              onClick={() => setIsAdding(true)}
            >
              <LuPlus className="mr-2 h-4 w-4" />
              Add Family Member ({familyMembers.length}/4)
            </button>
          )}

          {!isAdding && (
            <p className="text-center text-xs text-muted-foreground">
              {/* Maximum of {MAX_FAMILY_MEMBERS} family members reached. */}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default FamilyMembersDialog;
