import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  // FLUSH,
  // PAUSE,
  // PERSIST,
  // PURGE,
  REGISTER,
  // REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import authReducer from "./reducers/authSlice";
import utilReducer from "./reducers/utilSlice";
import api from "./services/api/apiSlice";
// import storage from "./sync_storage";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  // version: 1,
  storage,
};
const combinedReducer = combineReducers({
  // Add the generated reducer as a specific top-level slice
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  util: utilReducer,
});
const persistedReducer = persistReducer(persistConfig, combinedReducer);
const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER],
      },
    }).concat(api.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export default store;

export const persistor = persistStore(store);
