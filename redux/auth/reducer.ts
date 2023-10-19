import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "./typings";
import storage from "redux/sync_storage";
import { persistReducer } from "redux-persist";

export type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken?: string | null;
  context?: "ministry" | "donor" | "admin" | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  context: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token, refreshToken, context },
      }: PayloadAction<AuthState>
    ) => {
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.context = context;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "refreshToken", "context"],
};

const authReducer = authSlice.reducer;

export default persistReducer(persistConfig, authReducer);
