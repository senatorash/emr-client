import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useCreatePatientMutation } from "@/lib/features/apis/PatientApi";
import { PatientSchema } from "@/lib/schemas/patient.schema";
import { PatientForm } from "@/lib/schemas/patient.schema";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddPatient = () => {
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PatientForm>({ resolver: zodResolver(PatientSchema) });
  const [createPatient] = useCreatePatientMutation();

  const handleAddPatient = async (values: PatientForm) => {
    setIsAddingPatient(false);
    try {
      const validatedData: PatientForm = PatientSchema.parse(values);

      const ValidatedValues = {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        dob: validatedData.dob,
        gender: validatedData.gender,
        phone: validatedData.phone,
        email: validatedData.email,
        nin: validatedData.nin,
        address: validatedData.address,
        emergencyContact: validatedData.emergencyContact,
        nextOfKin: validatedData.nextOfKin,
        bloodGroup: validatedData.bloodGroup || "unknown",
      };
      if (!ValidatedValues) {
        return;
      }

      const result = await createPatient(ValidatedValues);
      if (result.data?.success) {
        toast.success(result.data.message);
        reset();
      } else {
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
    <Dialog open={isAddingPatient} onOpenChange={setIsAddingPatient}>
      <DialogTrigger asChild>
        <button className="gradient-primary inline-flex items-center justify-center gap-2 rounded-lg p-2 text-sm font-semibold whitespace-nowrap text-primary-foreground shadow-lg ring-offset-background transition-all duration-200 hover:shadow-xl hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
          <LuPlus className="h-4 w-4" />
          Add Patient
        </button>
      </DialogTrigger>
      <DialogContent>
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
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                {...register("firstName")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="firstName"
                placeholder="John"
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
                htmlFor="lastName"
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                {...register("dob")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="dob"
                type="date"
              />
              {errors.dob && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.dob.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="gender"
              >
                Gender
              </label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                {...register("phone")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="phone"
                placeholder="+1 234 567 890"
              />
              {errors.phone && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.phone.message}
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
                type="email"
                placeholder="patient@email.com"
              />
              {errors.email && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="nin"
              >
                NIN
              </label>
              <input
                {...register("nin")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="nin"
                type=""
                placeholder="NIN"
              />
              {errors.nin && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.nin.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="address"
              >
                Address
              </label>
              <input
                {...register("address")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="address"
                type="text"
                placeholder="lagos, Nigeria"
              />
              {errors.address && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="emergencyContact"
              >
                Emergency Contact
              </label>
              <input
                {...register("emergencyContact")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="emergencyContact"
                type="text"
                placeholder="+1 234 567 890"
              />
              {errors.emergencyContact && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.emergencyContact.message}{" "}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="nextOfKin"
              >
                Next of Kin
              </label>
              <input
                {...register("nextOfKin")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="nextOfKin"
                type="text"
                placeholder="Jane Doe"
              />
              {errors.nextOfKin && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.nextOfKin.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="bloodType"
            >
              Blood Type
            </label>
            <Controller
              name="bloodGroup"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "A+",
                      "A-",
                      "B+",
                      "B-",
                      "AB+",
                      "AB-",
                      "O+",
                      "O-",
                      "unknown",
                    ].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.bloodGroup && (
              <p className="pl-2 text-xs text-red-500">
                {errors.bloodGroup.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background p-2 px-4 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            onClick={() => setIsAddingPatient(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(handleAddPatient)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary p-2 px-4 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm ring-offset-background transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          >
            Add Patient
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddPatient;
