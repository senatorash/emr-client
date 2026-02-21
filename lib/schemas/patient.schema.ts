import { z } from "zod";

export const PatientSchema = z.object({
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
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const parsedDate = Date.parse(date);
      return !isNaN(parsedDate) && parsedDate < Date.now();
    }, "Date of birth must be a valid date in the past"),
  gender: z.enum(["male", "female", "other"], {
    message: "Gender is required",
  }),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long"),
  email: z.email("Invalid email address").trim().optional(),
  nin: z.string().trim().length(11, "NIN must be exactly 11 characters"),
  address: z.string().trim().min(5, "Address is required"),
  emergencyContact: z.string().trim().min(1, "Emergency contact is required"),
  nextOfKin: z.string().trim().min(1, "Next of kin is required"),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"], {
      message: "Please select a valid blood group",
    })
    .optional(),
  //   conditions: z.array(z.string().trim()).optional().default([]),
  //   status: z.enum(["active", "inactive", "deceased"], {
  //     message: "Status is required",
  //   }),
});

export type PatientForm = z.infer<typeof PatientSchema>;
