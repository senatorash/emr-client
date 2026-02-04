import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../slices/apiSlice";

export const dashBoardApis = createApi({
  reducerPath: "dashBoardApis",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    dashBoardStats: builder.query<{ role: string; stats: any }, void>({
      query: () => ({
        url: "dashboard/stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useDashBoardStatsQuery } = dashBoardApis;
