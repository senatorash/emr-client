import {
  AttachmentCategory,
  RecordStatus,
  RecordType,
} from "../record.interface";

export interface CreateRecordResponse {
  message: string;
  success: boolean;
}

export interface GetAllRecordsResponse {
  success: boolean;
  data: [
    {
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
      treatments: string;
      vitals: {
        bloodPressure?: string;
        pulse?: string;
        temperature?: string;
        weight?: string;
        height?: string;
        oxygen?: string;
      };
      createdBy: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
      };
      personModel: string;
      attachments: [
        {
          fileName: string;
          fileUrl: string;
          fileType: string;
          category: AttachmentCategory;
          uploadedBy: string;
          uploadedAt: string;
          notes: string;
          _id: string;
        },
      ];
      createdAt: string;
      updatedAt: string;
      familyMembers: [
        {
          _id: string;
          lastName: string;
          firstName: string;
          phoneNumber: string;
          relationship: string;
          familyMemberId: string;
        },
      ];
    },
  ];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface RecordStats {
  title: string;
  value: number;
}

export interface RecordStatsResponse {
  success: boolean;
  role: string;
  data: { stats: RecordStats[] };
}
