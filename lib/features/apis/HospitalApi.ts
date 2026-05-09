import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../slices/apiSlice";

export const hospitalApis = createApi({
  reducerPath: "hospitalApis",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createHospital: builder.mutation<
      CreateHospitalResponse,
      CreateHospitalRequest
    >({
      query: (payload) => ({
        url: "hospital/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateHospitalMutation } = hospitalApis;
