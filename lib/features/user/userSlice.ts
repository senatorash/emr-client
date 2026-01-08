import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  accessToken: string | null;
}

interface SetCurrentUserPayload {
  id: string;
  role: string;
  fullName: string;
  email: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
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
      }>
    ) => {
      if (action.payload.user !== undefined) {
        state.user = action.payload.user;
      }

      if (action.payload.accessToken !== undefined) {
        state.accessToken = action.payload.accessToken || null;
      }

      state.isAuthenticated = !!state.accessToken;
    },

    clearCurrentUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
