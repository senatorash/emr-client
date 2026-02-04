import { createApi } from "@reduxjs/toolkit/query/react";
import { setCurrentUser, clearCurrentUser } from "../slices/user/userSlice";
import { baseQueryWithReauth } from "../slices/apiSlice";

export const authApis = createApi({
  reducerPath: "authApis",
  baseQuery: baseQueryWithReauth,
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
          dispatch(setCurrentUser({ accessToken: data.accessToken }));
          await dispatch(authApis.endpoints.getCurrentUser.initiate());
        } catch (error) {}
      },
    }),

    getCurrentUser: builder.query<any, void>({
      query: () => ({
        url: "auth/current-user",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser({ user: data.user }));
        } catch (error) {}
      },
    }),

    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCurrentUser());
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetCurrentUserQuery,
  useLogoutUserMutation,
} = authApis;
