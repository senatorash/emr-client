export interface DashBoardStats {
  title: string;
  value: number;
  change: string;
  changeType: "positive" | "neutral" | "negative";
}

export interface DashBoardStaffStats {
  title: string;
  value: number;
}

export interface DashBoardStatsResponse {
  success: boolean;
  role: string;
  data: { stats: DashBoardStats[] };
}

export interface StaffStats {
  success: boolean;
  data: { stats: DashBoardStaffStats[] };
}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  nin: string;
  address: string;
  emergencyContact: string;
  nextOfKin: string;
  bloodGroup: string;
}

export interface CreatePatientResponse {
  message: string;
  success: boolean;
}

export interface GetAllPatientsResponse {
  success: boolean;
  data: [
    {
      _id: string;
      firstName: string;
      lastName: string;
      dob: string;
      gender: string;
      phone: string;
      email: string;
      address: string;
      bloodGroup: string;
      nextOfKin: string;
      emergencyContact: string;
      patientId: string;
      status: string;
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

export interface CreateStaffRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: "doctor" | "nurse";
}

export interface CreateStaffResponse {
  message: string;
  success: boolean;
}

export interface CreateFamilyMemberRequest {
  patientId: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dob: string;
  email?: string;
  relationship: string;
  gender: string;
}

export interface CreateFamilyMemberResponse {
  message: string;
  success: boolean;
}

// export interface CreateRecordRequest {
//   patientId: string;
//   personId: string;
//   personModel: "patient" | "family";
//   vitals?: {
//     bloodPressure?: string;
//     pulse?: string;
//     temperature?: string;
//     weight?: string;
//     height?: string;
//     oxygen?: string;
//   };
//   recordType:
//     | "consultation"
//     | "lab_result"
//     | "imaging"
//     | "prescription"
//     | "notes"
//     | "procedure"
//     | "other";
//   complaints: string;
//   treatments: string;
//   diagnosis: string;
//   attachments?: {
//     fileName?: string;
//     category?:
//       | "consultation"
//       | "lab_result"
//       | "imaging"
//       | "prescription"
//       | "other"
//       | "clinical_doc"
//       | "admin_doc";
//     fileType?: string;
//     notes?: string;
//     file?: File;
//   }[];
// }

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
      personId: string;
      recordType: string;
      status: string;
      complaints: string;
      diagnosis: string;
      CreatedBy: string;
      personModel: string;
      attachments: [
        {
          fileName: string;
          fileUrl: string;
          fileType: string;
          category: string;
          uploadedBy: string;
          uploadedAt: string;
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
