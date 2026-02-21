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
    },
  ];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
