import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../slices/apiSlice";
import {
  CreateRecordResponse,
  GetAllRecordsResponse,
} from "@/types/apiInterfaces";

export const recordApis = createApi({
  reducerPath: "recordApis",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Records"],
  endpoints: (builder) => ({
    createRecord: builder.mutation<CreateRecordResponse, FormData>({
      query: (formData) => ({
        url: "records/create",
        method: "POST",
        body: formData,
      }),
    }),

    getAllRecords: builder.query<
      GetAllRecordsResponse,
      { page: number; limit: number; search?: string }
    >({
      query: ({ page, limit, search }) => ({
        url: `records/all?page=${page}&limit=${limit}${search ? `&search=${search}` : ""}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateRecordMutation, useGetAllRecordsQuery } = recordApis;
