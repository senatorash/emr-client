export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  category: string;
  notes: string;
  file: File;
}

export type AttachmentCategory =
  | "lab_result"
  | "imaging"
  | "prescription"
  | "clinical_doc"
  | "admin_doc"
  | "other";

export const attachmentCategoryLabels: Record<AttachmentCategory, string> = {
  lab_result: "Lab Result",
  imaging: "Imaging",
  prescription: "Prescription",
  clinical_doc: "Clinical Document",
  admin_doc: "Administrative",
  other: "Other",
};
