import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../slices/apiSlice";
import {
  CreateRecordResponse,
  GetAllRecordsResponse,
  RecordStatsResponse,
} from "@/types/api/record";

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
      invalidatesTags: ["Records"],
    }),

    getAllRecords: builder.query<
      GetAllRecordsResponse,
      { page: number; limit: number; search?: string }
    >({
      query: ({ page, limit, search }) => ({
        url: `records/all?page=${page}&limit=${limit}${search ? `&search=${search}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Records"],
    }),

    recordStats: builder.query<RecordStatsResponse, void>({
      query: () => ({
        url: "dashboard/record-stats",
        method: "GET",
      }),
      providesTags: ["Records"],
    }),
  }),
});

export const {
  useCreateRecordMutation,
  useGetAllRecordsQuery,
  useRecordStatsQuery,
} = recordApis;
