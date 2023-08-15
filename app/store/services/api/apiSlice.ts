// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@store/store";
import { cacher } from "./rtkQueryCacheUtils";

// initialize an empty api service that we'll inject endpoints into later as needed
const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    ...cacher.defaultTags,
    "Projects",
    "Ministry",
    "Notifications",
    "User",
    "Social-links",
  ],
  endpoints: () => ({}),
});

export default api;
