import { configureStore } from "@reduxjs/toolkit";
import { authApis } from "./features/apis/AuthApi";
import { userSlice } from "./features/slices/user/userSlice";
import { dashBoardApis } from "./features/apis/DashBoardApis";
import { patientApis } from "./features/apis/PatientApi";
import { staffApis } from "./features/apis/StaffApi";
import { recordApis } from "./features/apis/RecordApi";
import { hospitalApis } from "./features/apis/HospitalApi";

export const store = () => {
  return configureStore({
    reducer: {
      [authApis.reducerPath]: authApis.reducer,
      [dashBoardApis.reducerPath]: dashBoardApis.reducer,
      [patientApis.reducerPath]: patientApis.reducer,
      [staffApis.reducerPath]: staffApis.reducer,
      [recordApis.reducerPath]: recordApis.reducer,
      [hospitalApis.reducerPath]: hospitalApis.reducer,
      userState: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApis.middleware)
        .concat(dashBoardApis.middleware)
        .concat(patientApis.middleware)
        .concat(staffApis.middleware)
        .concat(recordApis.middleware)
        .concat(hospitalApis.middleware),
  });
};

// Infer the `AppStore` type from the store itself
export type AppStore = ReturnType<typeof store>;

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
