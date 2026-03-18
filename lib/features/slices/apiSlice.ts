import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { RootState } from "@/lib/store";
import {
  setCurrentUser,
  clearCurrentUser,
  setRefreshing,
} from "./user/userSlice";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).userState.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error?.status === 401) {
    // try to refresh the token
    api.dispatch(setRefreshing(true));
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as { accessToken: string })
        .accessToken;
      // store the new token
      api.dispatch(
        setCurrentUser({
          accessToken: newAccessToken,
        }),
      );
      result = await baseQuery(
        {
          ...(args as FetchArgs),
          headers: {
            ...((args as FetchArgs).headers || {}),
            Authorization: `Bearer ${newAccessToken}`,
          },
        },
        api,
        extraOptions,
      );
    } else {
      api.dispatch(clearCurrentUser());
    }

    api.dispatch(setRefreshing(false));
  }

  //on token verification failure, log out the user and redirect to login page
  if (result.error?.status === 403) {
    api.dispatch(clearCurrentUser());
  }

  return result;
};
