import { motion } from "framer-motion";
import { LuBuilding2, LuChevronRight, LuMapPin, LuPhone } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  UseFormRegister,
  Controller,
  Control,
  FieldErrors,
  UseFormTrigger,
} from "react-hook-form";
import { HospitalForm } from "@/lib/schemas/hospital.schema";

const HospitalInfo = ({
  step,
  setStep,
  register,
  control,
  errors,
  trigger,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  register: UseFormRegister<HospitalForm>;
  control: Control<HospitalForm>;
  errors: FieldErrors<HospitalForm>;
  trigger: UseFormTrigger<HospitalForm>;
}) => {
  return (
    <div>
      {step === 0 && (
        <motion.div
          key="step-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label
              className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="recordFor"
            >
              Hospital Name
            </label>
            <div className="relative">
              <LuBuilding2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="General Hospital"
                {...register("hospitalName")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
              {errors.hospitalName && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.hospitalName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="recordFor"
            >
              Hospital Type
            </label>
            <Controller
              name="hospitalType"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general hospital">
                      General Hospital
                    </SelectItem>
                    <SelectItem value="specialized clinic">
                      Specialty Hospital
                    </SelectItem>
                    <SelectItem value="community health center">
                      Clinic
                    </SelectItem>
                    <SelectItem value="teaching hospital">
                      Teaching Hospital
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.hospitalType && (
              <p className="pl-2 text-xs text-red-500">
                {errors.hospitalType.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="recordFor"
              >
                City
              </label>
              <div className="relative">
                <LuMapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  {...register("city")}
                  placeholder="City"
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
                {errors.city && (
                  <p className="pl-2 text-xs text-red-500">
                    {errors.city?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="recordFor"
              >
                Country
              </label>
              <input
                {...register("country")}
                placeholder="Country"
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
              {errors.country && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.country?.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="recordFor"
            >
              Phone
            </label>
            <div className="relative">
              <LuPhone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                {...register("phone")}
                placeholder="+1 (555) 000-0000"
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
              {errors.phone && (
                <p className="pl-2 text-xs text-red-500">
                  {errors.phone?.message}
                </p>
              )}
            </div>
          </div>

          <Button
            className="mt-4 w-full"
            size="lg"
            onClick={async () => {
              const isValid = await trigger([
                "hospitalName",
                "hospitalType",
                "city",
                "country",
                "phone",
              ]);
              if (isValid) {
                setStep(1);
              }
            }}
          >
            Continue <LuChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default HospitalInfo;
