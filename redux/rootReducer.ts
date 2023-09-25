import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/reducer";
import api from "services/api/apiSlice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

export default rootReducer;
