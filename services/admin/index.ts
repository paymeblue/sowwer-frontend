import { ErrorResponse } from "services/typings";
import {
  GetAdminMinistriesRequest,
  GetAdminMinistriesResponse,
  VerifyMinistryRequest,
  GetAdminMinistryResponse,
  GetAdminMinistryRequest,
  GetAdminMinistryAdministratorResponse,
  GetAdminPayoutHistoryResponse,
  GetAdminPayoutHistoryRequest,
} from "./typings";
import api from "services/api/apiSlice";
import { cacher } from "services/api/rtkQueryCacheUtils";

const admin = api.injectEndpoints({
  endpoints: (build) => ({
    getMinistries: build.query<
      GetAdminMinistriesResponse,
      GetAdminMinistriesRequest
    >({
      query: (body) => {
        const { limit, page, status } = body;
        return {
          url: `admins/ministries?limit=${limit}&page=${page}&status=${status}`,
          method: "GET",
        };
      },
      providesTags: cacher.providesProperty("Ministries"),
      transformResponse: (reponse: GetAdminMinistriesResponse) => {
        return reponse;
      },
      transformErrorResponse: (reponse: ErrorResponse) => {
        return reponse.data.message;
      },
    }),
    verifyMinistry: build.mutation<{}, VerifyMinistryRequest>({
      query: (payload) => {
        const { id } = payload;
        return {
          url: `admins/ministries/${id}/verify`,
          method: "GET",
        };
      },
      invalidatesTags: cacher.providesProperty("Ministries"),
      transformResponse: (reponse: GetAdminMinistriesResponse) => {
        return reponse;
      },
      transformErrorResponse: (reponse: ErrorResponse) => {
        return reponse.data.message;
      },
    }),
    getAdminMinistry: build.query<
      GetAdminMinistryResponse,
      GetAdminMinistryRequest
    >({
      query: (payload) => {
        const { id } = payload;
        return {
          url: `admins/ministries/${id}`,
          method: "GET",
        };
      },
      transformResponse: (reponse: GetAdminMinistryResponse) => {
        return reponse;
      },
      transformErrorResponse: (reponse: ErrorResponse) => {
        return reponse.data.message;
      },
    }),
    getAdminMinistryAdministrator: build.query<
      GetAdminMinistryAdministratorResponse,
      GetAdminMinistryRequest
    >({
      query: (payload) => {
        const { id } = payload;
        return {
          url: `admins/ministries/${id}/administrator`,
          method: "GET",
        };
      },
      transformResponse: (reponse: GetAdminMinistryAdministratorResponse) => {
        return reponse;
      },
      transformErrorResponse: (reponse: ErrorResponse) => {
        return reponse.data.message;
      },
    }),
    getAdminPayoutHistory: build.query<
      GetAdminPayoutHistoryResponse,
      GetAdminPayoutHistoryRequest
    >({
      query: (payload) => {
        const { type } = payload;
        return {
          url: `payouts?type=${type}`,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMinistriesQuery,
  useVerifyMinistryMutation,
  useGetAdminMinistryQuery,
  useGetAdminMinistryAdministratorQuery,
  useGetAdminPayoutHistoryQuery,
} = admin;
