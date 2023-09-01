import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

type UtilState = {
  projectId?: string;
  callback?: string;
  lastVisited?: string;
};

const initialState: UtilState = {
  projectId: undefined,
  callback: undefined,
  lastVisited: undefined,
};

const utilSlice = createSlice({
  name: "util",
  initialState,
  reducers: {
    setProjectId: (
      state,
      { payload: { projectId } }: PayloadAction<{ projectId?: string }>
    ) => {
      state.projectId = projectId;
    },
    setLoginCallback: (
      state,
      { payload: { callback } }: PayloadAction<{ callback: string }>
    ) => {
      state.callback = callback;
    },
    setLastVisited: (
      state,
      { payload: { lastVisited } }: PayloadAction<{ lastVisited: string }>
    ) => {
      state.lastVisited = lastVisited;
    },
  },
});

export const { setProjectId, setLoginCallback, setLastVisited } =
  utilSlice.actions;

export default utilSlice.reducer;

export const selectedProjectId = (state: RootState) => state.util.projectId;
export const selectedCallbackString = (state: RootState) => state.util.callback;
export const selectLastVisited = (state: RootState) => state.util.lastVisited;
