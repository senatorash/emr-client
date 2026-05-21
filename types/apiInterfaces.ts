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
      status: patientStatus;
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
