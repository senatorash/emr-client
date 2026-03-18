import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SetCurrentUserPayload {
  userId: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  hospital?: { _id: string; name?: string };
}
interface AuthState {
  user: SetCurrentUserPayload | null;
  isAuthenticated: boolean;
  isRefreshing: boolean;
  isHydrated: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  isHydrated: false,
  isRefreshing: false,
};

export const userSlice = createSlice({
  initialState,
  name: "userState",
  reducers: {
    setCurrentUser: (
      state: AuthState,
      action: PayloadAction<{
        user?: SetCurrentUserPayload;
        accessToken?: string;
      }>,
    ) => {
      if (action.payload.user !== undefined) {
        state.user = action.payload.user;
      }

      if (action.payload.accessToken !== undefined) {
        state.accessToken = action.payload.accessToken || null;
      }

      state.isAuthenticated = !!state.accessToken;
      state.isHydrated = true;
    },

    setRefreshing: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },

    clearCurrentUser: (state: AuthState) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.isHydrated = true;
    },
  },
});

export const { setCurrentUser, clearCurrentUser, setRefreshing } =
  userSlice.actions;
export default userSlice.reducer;
