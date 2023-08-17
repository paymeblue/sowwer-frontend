import {
  ErrorResponse,
  NotificationResponse,
  UpdateNotificationRequest,
  UpdateNotificationResponse,
} from "@store/types";
import api from "./api/apiSlice";
import { cacher } from "./api/rtkQueryCacheUtils";

const notifications = api.injectEndpoints({
  endpoints: (build) => ({
    updateNotification: build.mutation<
      UpdateNotificationResponse,
      UpdateNotificationRequest
    >({
      query: (credentials) => ({
        url: "notifications",
        method: "PATCH",
        body: credentials,
      }),
      invalidatesTags: cacher.invalidatesList("Notifications"),
      transformResponse: (
        response: UpdateNotificationResponse,
        meta,
        arg
      ): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getNotification: build.query<NotificationResponse, void>({
      query: () => `notifications`,
      providesTags: cacher.providesProperty("Notifications"),
      transformResponse: (response: NotificationResponse, meta, arg): any => {
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

export const { useUpdateNotificationMutation, useGetNotificationQuery } =
  notifications;
