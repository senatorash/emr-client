import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SetCurrentUserPayload {
  id: string;
  role: string;
  fullName: string;
  email: string;
}
interface AuthState {
  user: SetCurrentUserPayload | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  isHydrated: false,
};

export const userSlice = createSlice({
  initialState,
  name: "userState",
  reducers: {
    setCurrentUser: (
      state,
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

    clearCurrentUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.isHydrated = true;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
