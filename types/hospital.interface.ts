interface CreateHospitalRequest {
  hospitalName: string;
  hospitalType: string;
  city: string;
  phone: string;
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface CreateHospitalResponse {
  success: boolean;
  message: string;
}
