"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LuStethoscope } from "react-icons/lu";
import HospitalInfo from "@/components/register/HospitalInfo";
import AdminAccount from "@/components/register/AdminAccount";
import Review from "@/components/register/Review";
import { useCreateHospitalMutation } from "@/lib/features/apis/HospitalApi";
import { HospitalSchema, HospitalForm } from "@/lib/schemas/hospital.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RightPanel from "@/components/register/RightPanel";

const steps = ["Hospital Info", "Admin Account", "Review"];

const Register = () => {
  // const { toast } = useToast();
  const [isAddingHospital, setIsAddingHospital] = useState(false);
  const [step, setStep] = useState(0);
  const [createHospital] = useCreateHospitalMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm<HospitalForm>({ resolver: zodResolver(HospitalSchema) });

  const formValues = watch();

  const handleAddHospital = async (values: HospitalForm) => {
    try {
      setIsAddingHospital(true);
      // await new Promise((r) => setTimeout(r, 1500));
      setIsAddingHospital(false);

      const validatedValues = {
        hospitalName: values.hospitalName,
        hospitalType: values.hospitalType,
        city: values.city,
        country: values.country,
        phone: values.phone,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };

      if (!validatedValues) return;

      const result = await createHospital(validatedValues);
      console.log(result);
    } catch (error) {}
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel (Form)*/}
      <div className="flex flex-1 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="gradient-primary flex h-12 w-12 items-center justify-center rounded-xl">
              <LuStethoscope className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">MediCare</h1>
              <p className="text-sm text-muted-foreground">
                Register Your Hospital
              </p>
            </div>
          </div>

          {/* Steps indicator */}
          <div className="mb-8 flex items-center gap-2">
            {steps.map((label, i) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                    i <= step
                      ? "gradient-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`hidden text-sm sm:block ${
                    i <= step
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {i < steps.length - 1 && (
                  <div className="mx-1 h-px flex-1 bg-border" />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Hospital Info */}
          <HospitalInfo
            step={step}
            setStep={setStep}
            register={register}
            control={control}
            errors={errors}
            trigger={trigger}
          />

          {/* Step 2: Admin Account */}
          <AdminAccount
            step={step}
            setStep={setStep}
            register={register}
            errors={errors}
            trigger={trigger}
          />

          {/* Step 3: Review */}
          <Review
            step={step}
            setStep={setStep}
            formValues={formValues}
            handleSubmit={handleSubmit}
            handleAddHospital={handleAddHospital}
            isLoading={isAddingHospital}
          />
        </motion.div>
      </div>

      {/* Right Panel */}
      <RightPanel />
    </div>
  );
};

export default Register;
