import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { User } from "@store/types";

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: User | null; token: string | null }>
    ) => {
      state.user = user;
      state.token = token;
    },
    logout: () => initialState,
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentUserToken = (state: RootState) => state.auth.token;
