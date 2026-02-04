import { configureStore } from "@reduxjs/toolkit";
import { authApis } from "./features/apis/AuthApi";
import { userSlice } from "./features/slices/user/userSlice";
import { dashBoardApis } from "./features/apis/DashBoardApis";

export const store = () => {
  return configureStore({
    reducer: {
      [authApis.reducerPath]: authApis.reducer,
      [dashBoardApis.reducerPath]: dashBoardApis.reducer,
      userState: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApis.middleware)
        .concat(dashBoardApis.middleware),
  });
};

// Infer the `AppStore` type from the store itself
export type AppStore = ReturnType<typeof store>;

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
