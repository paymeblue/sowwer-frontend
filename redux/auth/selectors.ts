import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const selectAuth = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);

export const selectAccessToken = createSelector(
  [selectAuth],
  (auth) => auth.token
);

export const selectAuthContext = createSelector(
  [selectAuth],
  (auth) => auth.context
);
