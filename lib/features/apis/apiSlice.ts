import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { RootState } from "@/lib/store";
// import { setCurrentUser, clearCurrentUser } from "../user/userSlice";

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

// export const baseQueryWithReauth = async (
//   args: any,
//   api: any,
//   extraOptions: any
// ) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     // try to refresh the token
//     const refreshResult = await baseQuery(
//       {
//         url: "/auth/refresh-token",
//         method: "POST",
//       },
//       api,
//       extraOptions
//     );

//     if (refreshResult.data) {
//       // store the new token
//       api.dispatch(
//         setCurrentUser({
//           //   token: refreshResult.data.accessToken,
//           //   user: (api.getState() as RootState).user.currentUser,
//         })
//       );
//     }
//   }
// };
