import { motion } from "framer-motion";
import {
  LuUser,
  LuLock,
  LuMail,
  LuChevronRight,
  LuChevronLeft,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";
import {
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormTrigger,
} from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HospitalForm } from "@/lib/schemas/hospital.schema";

const AdminAccount = ({
  step,
  setStep,
  register,
  errors,
  trigger,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  register: UseFormRegister<HospitalForm>;
  errors: FieldErrors<HospitalForm>;
  trigger: UseFormTrigger<HospitalForm>;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {step === 1 && (
        <motion.div
          key="step-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="recordFor"
              >
                Admin First Name
              </label>
              <div className="relative">
                <LuUser className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Jane"
                  id="firstName"
                  {...register("firstName")}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
                {errors.firstName && (
                  <p className="pl-2 text-xs text-red-500">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="recordFor"
              >
                Admin Last Name
              </label>
              <div className="relative">
                <LuUser className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Smith"
                  id="lastName"
                  {...register("lastName")}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
                {errors.lastName && (
                  <p className="pl-2 text-xs text-red-500">
                    {errors.lastName?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="recordFor"
            >
              Admin Email
            </label>
            <div className="relative">
              <LuMail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                {...register("email")}
                type="email"
                placeholder="admin@hospital.com"
                id="email"
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
              {errors.email && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="recordFor"
              >
                Password
              </label>
              <div className="relative">
                <LuLock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  id="password"
                  {...register("password")}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pr-10 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
                {errors.password && (
                  <p className="pl-2 text-xs text-red-500">
                    {errors.password?.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <LuEyeOff className="h-4 w-4" />
                  ) : (
                    <LuEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="recordFor"
              >
                Confirm Password
              </label>
              <div className="relative">
                <LuLock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pr-10 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
                {errors.confirmPassword && (
                  <p className="pl-2 text-xs text-red-500">
                    {errors.confirmPassword?.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <LuEyeOff className="h-4 w-4" />
                  ) : (
                    <LuEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              size="lg"
              onClick={() => setStep(0)}
            >
              <LuChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              className="flex-1"
              size="lg"
              onClick={async () => {
                const isValid = await trigger([
                  "firstName",
                  "lastName",
                  "email",
                  "password",
                  "confirmPassword",
                ]);
                if (isValid) setStep(2);
              }}
            >
              Continue <LuChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminAccount;
