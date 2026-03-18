import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../slices/apiSlice";
import { DashBoardStatsResponse } from "@/types/apiInterfaces";

export const dashBoardApis = createApi({
  reducerPath: "dashBoardApis",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    dashBoardStats: builder.mutation<DashBoardStatsResponse, void>({
      query: () => ({
        url: "dashboard/stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useDashBoardStatsMutation } = dashBoardApis;
