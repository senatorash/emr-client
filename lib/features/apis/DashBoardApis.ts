import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../slices/apiSlice";
import { DashBoardStatsResponse, StaffStats } from "@/types/apiInterfaces";

export const dashBoardApis = createApi({
  reducerPath: "dashBoardApis",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    dashBoardStats: builder.query<DashBoardStatsResponse, void>({
      query: () => ({
        url: "dashboard/stats",
        method: "GET",
      }),
    }),
    dashBoardStaffStats: builder.query<StaffStats, void>({
      query: () => ({
        url: "dashboard/staff-stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useDashBoardStatsQuery, useDashBoardStaffStatsQuery } =
  dashBoardApis;
