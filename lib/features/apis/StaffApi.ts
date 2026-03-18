import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../slices/apiSlice";
import {
  CreateStaffRequest,
  CreateStaffResponse,
  StaffStats,
} from "@/types/apiInterfaces";

export const staffApis = createApi({
  reducerPath: "staffApis",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    createStaff: builder.mutation<CreateStaffResponse, CreateStaffRequest>({
      query: (payload) => ({
        url: "staff/create-staff",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Staff"],
    }),
    getAllStaff: builder.query({
      query: ({ page, limit, search }) => ({
        url: `staff/all?page=${page}&limit=${limit}${search ? `&search=${search}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Staff"],
    }),
    dashBoardStaffStats: builder.query<StaffStats, void>({
      query: () => ({
        url: "dashboard/staff-stats",
        method: "GET",
      }),
      providesTags: ["Staff"],
    }),
  }),
});

export const {
  useCreateStaffMutation,
  useGetAllStaffQuery,
  useDashBoardStaffStatsQuery,
} = staffApis;
