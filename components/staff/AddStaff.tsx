import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectValue,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { useCreateStaffMutation } from "@/lib/features/apis/StaffApi";
import { StaffSchema, StaffForm } from "@/lib/schemas/staff.schema";
import { toast } from "sonner";

const AddStaff = () => {
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [createStaff, { data, error }] = useCreateStaffMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<StaffForm>({
    resolver: zodResolver(StaffSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleAddStaff = async (values: StaffForm) => {
    setIsAddingStaff(false);
    try {
      const validatedData: StaffForm = StaffSchema.parse(values);
      const result = await createStaff(validatedData);
      console.log(result);
      if (result.data?.success) {
        toast.success(result.data.message);
        reset();
      } else {
        const errorMessage =
          (result.error &&
            "data" in result.error &&
            (result.error.data as any)?.message) ||
          "Failed to add staff member";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Failed to add staff member");
    }
  };
  return (
    <Dialog open={isAddingStaff} onOpenChange={setIsAddingStaff}>
      <DialogTrigger asChild>
        <button className="gradient-primary inline-flex items-center justify-center gap-2 rounded-lg p-2 text-sm font-semibold whitespace-nowrap text-primary-foreground shadow-lg ring-offset-background transition-all duration-200 hover:shadow-xl hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
          <LuPlus className="h-4 w-4" />
          Add Staff Member
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
          <DialogDescription>
            Create a new account for a doctor or nurse. They will receive login
            credentials via email.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label
              className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              First Name
            </label>
            <input
              {...register("firstName")}
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              id="name"
              placeholder="Dr. John Smith"
            />
            {errors.firstName && (
              <p className="pl-2 text-xs text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              id="lastName"
              placeholder="Smith"
            />
            {errors.lastName && (
              <p className="pl-2 text-xs text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email")}
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              id="email"
              placeholder="john.smith@example.com"
            />
            {errors.email && (
              <p className="pl-2 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="role"
              >
                Role
              </label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="nurse">Nurse</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.role.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="password"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              id="confirmPassword"
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="pl-2 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background p-2 px-4 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            onClick={() => setIsAddingStaff(false)}
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary p-2 px-4 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm ring-offset-background transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            onClick={handleSubmit(handleAddStaff)}
          >
            Create Account
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaff;
