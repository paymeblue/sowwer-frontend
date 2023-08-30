// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { logout, setCredentials } from "@store/reducers/authSlice";
import { RootState } from "@store/store";
import { cacher } from "./rtkQueryCacheUtils";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithReauth = async (
//   args: string | FetchArgs,
//   api: BaseQueryApi,
//   extraOptions: BaseQueryApi
// ) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result?.error?.status === 401) {
//     console.log("...sending refresh token");
//     // send refresh token to get a new access token
//     const refreshResult = await baseQuery(
//       "users/refreshtoken",
//       api,
//       extraOptions
//     );
//     console.log(refreshResult);
//     if (refreshResult?.data) {
//       const user = (api.getState() as RootState).auth.user;
//       const token = (api.getState() as RootState).auth.token;
//       // store the access token
//       api.dispatch(setCredentials({ ...refreshResult?.data, user, token }));
//       // retry the original request with the new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }
//   return result;
// };

// initialize an empty api service that we'll inject endpoints into later as needed

// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     const refreshToken = (api.getState() as RootState).auth.refreshToken;

//     const refreshResult: any = await baseQuery(
//       { url: "users/refreshtoken", method: "POST", body: refreshToken },
//       api,
//       extraOptions
//     );

//     if (refreshResult.data) {
//       const user = (api.getState() as RootState).auth.user;
//       // const token = (api.getState() as RootState).auth.token;
//       // store the access token
//       api.dispatch(
//         setCredentials({
//           token: refreshResult.data.accessToken as string,
//           user,
//         })
//       );
//       // retry the initial query
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }
//   return result;
// };

const api = createApi({
  baseQuery: baseQuery,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  tagTypes: [
    ...cacher.defaultTags,
    "Projects",
    "Ministry",
    "Notifications",
    "User",
    "Social-links",
    "Account",
  ],
  endpoints: (builder) => ({}),
});

export default api;
