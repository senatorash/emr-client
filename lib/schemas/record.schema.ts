import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/dicom",
  "application/msword",
  "other",
];

export const RecordSchema = z.object({
  patientId: z.string().trim().min(1, "Patient ID is required"),
  personId: z.string().trim().min(1, "Person ID is required"),
  personModel: z.enum(["Patient", "FamilyMember"], {
    message: "Please select person model",
  }),
  recordType: z.enum(
    [
      "consultation",
      "lab_result",
      "imaging",
      "prescription",
      "notes",
      "procedure",
      "other",
    ],
    { message: "Please select appropriate record Type" },
  ),
  vitals: z
    .object({
      temperature: z.string().trim().optional(),
      pulse: z.string().trim().optional(),
      weight: z.string().trim().optional(),
      height: z.string().trim().optional(),
      bloodPressure: z.string().trim().optional(),
      oxygen: z.string().trim().optional(),
    })
    .optional(),
  complaints: z.string().trim().min(1, "Complaints are required"),
  diagnosis: z.string().trim().min(1, "Diagnosis is required"),
  treatments: z.string().trim().min(1, "Treatment is required"),
  attachments: z
    .array(
      z.object({
        // id: z.string().uuid({ message: "Invalid ID format" }),
        fileName: z.string().min(1, "File name is required"),
        category: z.enum([
          "lab_result",
          "consultation",
          "imaging",
          "prescription",
          "clinical_doc",
          "admin_doc",
          "other",
        ]),
        fileType: z.string().refine((type) => ACCEPTED_TYPES.includes(type), {
          message: "Invalid file type. Only PDF, PNG, and JPEG are allowed.",
        }),
        notes: z.string().trim(),
        file: z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "File size must be less than 5MB.",
        }),
      }),
    )
    .optional(),
});

export type RecordForm = z.infer<typeof RecordSchema>;

export const SingleAttachmentSchema =
  RecordSchema.shape.attachments.unwrap().element;

export type SingleAttachment = z.infer<typeof SingleAttachmentSchema>;
