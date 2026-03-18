import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../slices/apiSlice";
import {
  CreatePatientRequest,
  CreatePatientResponse,
  GetAllPatientsResponse,
  CreateFamilyMemberRequest,
  CreateFamilyMemberResponse,
} from "@/types/apiInterfaces";

export const patientApis = createApi({
  reducerPath: "patientApis",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Patients"],
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
      invalidatesTags: [{ type: "Patients", id: "LIST" }],
    }),

    getAllPatients: builder.query<
      GetAllPatientsResponse,
      { page: number; limit: number; search?: string }
    >({
      query: ({ page, limit, search }) => ({
        url: `patients/all?page=${page}&limit=${limit}${search ? `&search=${search}` : ""}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Patients" as const,
                id: _id,
              })),
              { type: "Patients", id: "LIST" },
            ]
          : [{ type: "Patients", id: "LIST" }],
    }),

    createFamilyMember: builder.mutation<
      CreateFamilyMemberResponse,
      CreateFamilyMemberRequest
    >({
      query: (payload) => ({
        url: "families/add",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, { patientId }) => [
        { type: "Patients", id: patientId },
        { type: "Patients", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreatePatientMutation,
  useGetAllPatientsQuery,
  useCreateFamilyMemberMutation,
} = patientApis;
