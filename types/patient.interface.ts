interface Patient {
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
  familyMembers: {
    familyMemberId: string;
    firstName: string;
    lastName: string;
    // patient: string;
    phoneNumber: string;
    relationship: string;
    _id: string;
  }[];
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

interface PatientTableProps {
  patient: Patient[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pagination: Pagination;
  isLoading: boolean;
}

type patientStatus = "active" | "inactive" | "discharged" | "deceased";
