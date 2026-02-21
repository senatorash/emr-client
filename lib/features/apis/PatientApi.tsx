import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../slices/apiSlice";
import {
  CreatePatientRequest,
  CreatePatientResponse,
  GetAllPatientsResponse,
} from "@/types/apiInterfaces";

export const patientApis = createApi({
  reducerPath: "patientApis",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createPatient: builder.mutation<
      CreatePatientResponse,
      CreatePatientRequest
    >({
      query: (payload) => ({
        url: "patients/create",
        method: "POST",
        body: payload,
      }),
    }),

    getAllPatients: builder.query<
      GetAllPatientsResponse,
      { page: number; limit: number; search?: string }
    >({
      query: ({ page, limit, search }) => ({
        url: `patients/all?page=${page}&limit=${limit}${search ? `&search=${search}` : ""}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePatientMutation, useGetAllPatientsQuery } = patientApis;
