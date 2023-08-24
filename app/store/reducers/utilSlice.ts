import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

type UtilState = {
  projectId?: string | null;
};

const initialState: UtilState = { projectId: undefined };

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
  },
});

export const { setProjectId } = utilSlice.actions;

export default utilSlice.reducer;

export const selectedProjectId = (state: RootState) => state.util.projectId;
