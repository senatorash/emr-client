import { z } from "zod";

export const HospitalSchema = z
  .object({
    hospitalName: z.string().trim().min(2, "Hospital name is required"),
    hospitalType: z.enum(
      [
        "general hospital",
        "specialized clinic",
        "teaching hospital",
        "community health center",
      ],
      {
        message: "Hospital type is required",
      },
    ),
    city: z.string().trim().min(2, "City is required"),
    phone: z
      .string()
      .trim()
      .min(10, "Phone number is too short")
      .max(15, "Phone number is too long"),
    country: z.string().trim().min(2, "Country is required"),
    firstName: z
      .string()
      .trim()
      .min(2, "First name is required")
      .max(30, "First name must be less than 30 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "First name can only contain letters, spaces and hyphens",
      ),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name is required")
      .max(30, "Last name must be less than 30 characters")
      .regex(
        /^[a-zA-Z\s-]+$/,
        "Last name can only contain letters, spaces and hyphens",
      ),
    email: z.email("Invalid email address").trim(),
    password: z
      .string()
      .trim()
      .min(8, "At least 8 characters")
      .refine((val) => /[A-Z]/.test(val), "One uppercase letter")
      .refine((val) => /[a-z]/.test(val), "One lowercase letter")
      .refine((val) => /[0-9]/.test(val), "One number")
      .refine(
        (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
        "One special character",
      ),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type HospitalForm = z.infer<typeof HospitalSchema>;
