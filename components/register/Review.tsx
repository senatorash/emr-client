import { motion } from "framer-motion";
import { LuChevronLeft, LuLoader } from "react-icons/lu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HospitalForm } from "@/lib/schemas/hospital.schema";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

const Review = ({
  step,
  setStep,
  formValues,
  handleSubmit,
  handleAddHospital,
  isLoading,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formValues: HospitalForm;
  handleSubmit: UseFormHandleSubmit<HospitalForm>;
  handleAddHospital: SubmitHandler<HospitalForm>;
  isLoading: boolean;
}) => {
  return (
    //   const plan = searchParams.get("plan") || "free";
    <div>
      {step === 2 && (
        <motion.div
          key="step-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="space-y-3 rounded-xl border border-border bg-secondary/50 p-5">
            <h3 className="font-semibold text-foreground">Hospital Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Name</span>
              <span className="text-foreground">
                {formValues.hospitalName || "—"}
              </span>
              <span className="text-muted-foreground">Type</span>
              <span className="text-foreground capitalize">
                {formValues.hospitalType || "—"}
              </span>
              <span className="text-muted-foreground">Location</span>
              <span className="text-foreground">
                {formValues.city && formValues.country
                  ? `${formValues.city}, ${formValues.country}`
                  : "—"}
              </span>
              <span className="text-muted-foreground">Phone</span>
              <span className="text-foreground">{formValues.phone || "—"}</span>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-border bg-secondary/50 p-5">
            <h3 className="font-semibold text-foreground">Admin Account</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Name</span>
              <span className="text-foreground">
                {formValues.firstName || "—"} {formValues.lastName || "—"}
              </span>
              <span className="text-muted-foreground">Email</span>
              <span className="text-foreground">{formValues.email || "—"}</span>
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm text-foreground">
              <strong>Plan:</strong>
              {/* {plan === "free" */}
              Free Trial (14 days)
              {/* // : plan === "pro"
                //   ? "Pro ($49/mo)"
                //   : "Enterprise"} */}
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              size="lg"
              onClick={() => setStep(1)}
            >
              <LuChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              className="flex-1"
              size="lg"
              onClick={handleSubmit(handleAddHospital)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Register Hospital"
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default Review;
