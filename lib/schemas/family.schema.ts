import { z } from "zod";

export const FamilyMemberSchema = z.object({
  patient: z.string().trim().nonempty("Patient ID is required"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long"),
  //   email: z.email("Invalid email address").trim().optional(),
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
  //   relationship: z.string().trim().min(1, "Relationship is required"),
  relationship: z.enum(
    ["Spouse", "Parent", "Child", "Sibling", "Guardian", "Other"],
    { message: "Relationship is required" },
  ),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Gender is required",
  }),
});

export type FamilyMemberForm = z.infer<typeof FamilyMemberSchema>;
