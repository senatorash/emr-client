import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { LuChevronDown } from "react-icons/lu";
import { RecordForm } from "@/lib/schemas/record.schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

const VitalSigns = ({
  vitalsOpen,
  setVitalsOpen,
  register,
  errors,
}: {
  vitalsOpen: boolean;
  setVitalsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<RecordForm>;
  errors: FieldErrors<RecordForm>;
}) => {
  return (
    <div className="space-y-2">
      <Collapsible open={vitalsOpen} onOpenChange={setVitalsOpen}>
        <CollapsibleTrigger asChild>
          <button className="inline-flex w-full items-center justify-between gap-2 rounded-lg p-4 px-0.5 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
            Vital Signs (optional)
            <LuChevronDown
              className={`h-4 w-4 transition-transform ${vitalsOpen ? "rotate-180" : ""}`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3 pt-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="bloodPressure"
              >
                Blood Pressure
              </label>
              <input
                {...register("vitals.bloodPressure")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="bloodPressure"
                type="text"
                placeholder="120/80"
              />
              {errors.vitals?.bloodPressure && (
                <p className="text-xs text-red-600">
                  {errors.vitals.bloodPressure.message}
                </p>
              )}
            </div>
            <div className="space-y-3 pt-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="pulse"
              >
                Heart Rate (bpm)
              </label>
              <input
                {...register("vitals.pulse")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="pulse"
                type="text"
                placeholder="72"
              />
              {errors.vitals?.pulse && (
                <p className="text-xs text-red-600">
                  {errors.vitals.pulse.message}
                </p>
              )}
            </div>
            <div className="space-y-3 pt-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="temperature"
              >
                Temperature (°C)
              </label>
              <input
                {...register("vitals.temperature")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="temperature"
                type="text"
                placeholder="36.6"
              />
              {errors.vitals?.temperature && (
                <p className="text-xs text-red-600">
                  {errors.vitals.temperature.message}
                </p>
              )}
            </div>
            <div className="space-y-3 pt-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="weight"
              >
                Weight (kg)
              </label>
              <input
                {...register("vitals.weight")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="weight"
                type="text"
                placeholder="70"
              />
              {errors.vitals?.weight && (
                <p className="text-xs text-red-600">
                  {errors.vitals.weight.message}
                </p>
              )}
            </div>
            <div className="space-y-3 pt-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="height"
              >
                Height (cm)
              </label>
              <input
                {...register("vitals.height")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="height"
                type="text"
                placeholder="175cm"
              />
              {errors.vitals?.height && (
                <p className="text-xs text-red-600">
                  {errors.vitals.height.message}
                </p>
              )}
            </div>
            <div className="space-y-3 pt-2">
              <label
                className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="oxygen"
              >
                SpO₂ (%)
              </label>
              <input
                {...register("vitals.oxygen")}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="oxygen"
                type="text"
                placeholder="120/80"
              />
              {errors.vitals?.oxygen && (
                <p className="text-xs text-red-600">
                  {errors.vitals.oxygen.message}
                </p>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default VitalSigns;
