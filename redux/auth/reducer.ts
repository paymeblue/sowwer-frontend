import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "./typings";
import storage from "redux/sync_storage";
import { persistReducer } from "redux-persist";

type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken?: string | null;
};

const initialState: AuthState = { user: null, token: null, refreshToken: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token, refreshToken },
      }: PayloadAction<{
        user: User | null;
        token: string | null;
        refreshToken?: string | null;
      }>
    ) => {
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
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
  whitelist: ["user", "token", "refreshToken"],
};

const authReducer = authSlice.reducer;

export default persistReducer(persistConfig, authReducer);

// export const selectCurrentUser = (state: RootState) => state.auth.user;
// export const selectCurrentUserToken = (state: RootState) => state.auth.token;
// export const selectCurrentUserRefreshToken = (state: RootState) =>
//   state.auth.refreshToken;
