"use client";

import { motion } from "framer-motion";
import { LuFilter, LuPlus, LuSearch, LuX } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import DashBoardLayout from "@/components/layouts/dashboard/DashBoardLayout";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import { useCreatePatientMutation } from "@/lib/features/apis/PatientApi";
import { PatientSchema } from "@/lib/schemas/patient.schema";
import { PatientForm } from "@/lib/schemas/patient.schema";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PatientTable from "@/components/patient/PatientTable";
import { useGetAllPatientsQuery } from "@/lib/features/apis/PatientApi";
import { clear } from "console";

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
};

const Patient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 10;

  const { data: isData } = useGetAllPatientsQuery({
    page,
    limit,
    search: debouncedSearch,
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PatientForm>({ resolver: zodResolver(PatientSchema) });
  const [createPatient, { data, isError, error, isSuccess }] =
    useCreatePatientMutation();

  const handleAddPatient = async (values: PatientForm) => {
    setIsAddingPatient(false);
    try {
      const validatedData = PatientSchema.parse(values);

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

      await createPatient(ValidatedValues);
      reset();
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Patient created successfully");
    }

    if (isError && error) {
      // FetchBaseQueryError
      if ("data" in error && error.data) {
        const errData = error.data as { message?: string };
        toast.error(errData.message || "Request failed");
        return;
      }

      // SerializedError
      if ("error" in error) {
        toast.error(error.error || "Network error");
        return;
      }

      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, error, data]);

  // debounce search input to avoid making too many requests while user is typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to first page on new search
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <LuFilter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="discharged">Discharged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <PatientTable
          filteredPatients={isData?.data || []}
          page={page}
          setPage={setPage}
          pagination={
            isData?.pagination ?? {
              total: 0,
              page: 1,
              limit: 10,
              totalPages: 1,
            }
          }
        />
      </div>
    </DashBoardLayout>
  );
};
export default Patient;
