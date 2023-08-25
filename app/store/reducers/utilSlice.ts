import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

type UtilState = {
  projectId?: string | null;
  callback?: string;
};

const initialState: UtilState = { projectId: undefined, callback: undefined };

const utilSlice = createSlice({
  name: "util",
  initialState,
  reducers: {
    setProjectId: (
      state,
      { payload: { projectId } }: PayloadAction<{ projectId?: string | null }>
    ) => {
      state.projectId = projectId;
    },
    setLoginCallback: (
      state,
      { payload: { callback } }: PayloadAction<{ callback?: string }>
    ) => {
      state.callback = callback;
    },
  },
});

export const { setProjectId, setLoginCallback } = utilSlice.actions;

export default utilSlice.reducer;

export const selectedProjectId = (state: RootState) => state.util.projectId;
export const selectedCallbackString = (state: RootState) => state.util.callback;
