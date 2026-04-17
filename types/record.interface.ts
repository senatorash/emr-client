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

export const typeColors = {
  consultation: "bg-primary/10 text-primary",
  lab_result: "bg-accent/10 text-accent",
  prescription: "bg-warning/10 text-warning",
  procedure: "bg-success/10 text-success",
  imaging: "bg-destructive/10 text-destructive",
  notes: "bg-muted text-muted-foreground",
};

export const statusColors = {
  complete: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  reviewed: "bg-primary/10 text-primary border-primary/20",
};

export type RecordStatus = "complete" | "pending" | "reviewed";

export type RecordType =
  | "consultation"
  | "lab_result"
  | "prescription"
  | "procedure"
  | "imaging"
  | "notes";

export interface Records {
  _id: string;
  hospital: string;
  patientId: string;
  personId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  recordType: RecordType;
  status: RecordStatus;
  complaints: string;
  diagnosis: string;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  personModel: string;
  attachments: {
    fileName: string;
    fileUrl: string;
    fileType: string;
    category: string;
    uploadedBy: string;
    uploadedAt: string;
    _id: string;
  }[];

  createdAt: string;
  updatedAt: string;
  familyMembers: {
    _id: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;
    relationship: string;
    familyMemberId: string;
  }[];
}

export interface RecordProps {
  records: Records[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pagination: Pagination;
  isLoading: boolean;
}
