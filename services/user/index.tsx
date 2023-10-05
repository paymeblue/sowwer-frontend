import {
  ErrorResponse,
  UpdateUserPasswordRequest,
  UpdateUserRequest,
  UpdateUserResponse,
  UserProfileResponse,
} from "../typings";
import api from "services/api/apiSlice";
import { cacher } from "services/api/rtkQueryCacheUtils";

const user = api.injectEndpoints({
  endpoints: (build) => ({
    updateUserProfile: build.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (credentials) => ({
        url: "users/profile",
        method: "PATCH",
        body: credentials,
      }),
      invalidatesTags: cacher.invalidatesList("User"),
      transformResponse: (response: UpdateUserResponse, meta, arg): any => {
        return response.data;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    updateUserPassword: build.mutation<
      UpdateUserResponse,
      UpdateUserPasswordRequest
    >({
      query: (credentials) => ({
        url: "users/profile",
        method: "PATCH",
        body: credentials,
      }),
      invalidatesTags: cacher.invalidatesList("User"),
      transformResponse: (response: UpdateUserResponse, meta, arg): any => {
        return response.data;
      },
    }),
    getUserProfile: build.query<UserProfileResponse, void | null>({
      query: () => `users/me`,
      providesTags: cacher.providesProperty("User"),
      transformResponse: (response: any, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    refetchErroredQueries: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: cacher.invalidatesUnknownErrors(),
    }),
  }),
  overrideExisting: true,
});

export const {
  useUpdateUserPasswordMutation,
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} = user;
