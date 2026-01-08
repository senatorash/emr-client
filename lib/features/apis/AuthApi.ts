import { createApi } from "@reduxjs/toolkit/query/react";
import { setCurrentUser } from "../user/userSlice";
import { baseQuery } from "./apiSlice";

export const authApis = createApi({
  reducerPath: "authApis",
  baseQuery: baseQuery,
  // we use .query for GET requests and .mutation for POST, PUT, DELETE requests
  endpoints: (builder) => ({
    // response type, request type
    loginUser: builder.mutation<
      { message: string; accessToken: string },
      { email: string; password: string }
    >({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setCurrentUser({ accessToken: data.accessToken }));
          await dispatch(authApis.endpoints.getCurrentUser.initiate());
        } catch (error) {}
      },
    }),

    getNewToken: builder.mutation({
      query: (payload) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            const { accessToken, user } = data.data;
            dispatch(setCurrentUser({ user, accessToken: accessToken }));
          }
        } catch (error) {}
      },
    }),

    getCurrentUser: builder.query<any, void>({
      query: () => ({
        url: "/auth/current-admin",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setCurrentUser({ user: data.user }));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApis;
