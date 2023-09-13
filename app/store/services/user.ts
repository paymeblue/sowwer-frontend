import {
  ErrorResponse,
  //   UserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UserProfileResponse,
} from "@store/types";
import api from "./api/apiSlice";
import { cacher } from "./api/rtkQueryCacheUtils";

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

export const { useUpdateUserProfileMutation, useGetUserProfileQuery } = user;
