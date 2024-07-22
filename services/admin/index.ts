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
  AdminUploadCacDocumentRequest,
  GetAdminWidowsResponse,
  GetAdminRegistryRequest,
  GetAdminMissionsResponse,
  GetAdminOrphanageResponse,
  GetAdminProjectRequest,
  GetAdminProjectsResponse,
  GetAdminProjectTestiomoniesRequest,
  GetAdminProjectTestimoniesResponse,
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
          url: `admins/fetch-ministries?limit=${limit}&page=${page}&status=${status}`,
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
          url: `admins/fetch-ministry/${id}/verify`,
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
          url: `admins/fetch-ministry/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Admin_Ministry"],
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
          url: `admins/fetch-ministry/${id}/administrator`,
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
          url: `admins/payouts?type=${type}`,
          method: "GET",
        };
      },
    }),
    getAdminWidowsHistory: build.query<
      GetAdminWidowsResponse,
      GetAdminRegistryRequest
    >({
      query: (payload) => {
        return {
          url: `admins/fetch-widows`,
          method: "GET",
          params: payload,
        };
      },
    }),
    getAdminMissionsHistory: build.query<
      GetAdminMissionsResponse,
      GetAdminRegistryRequest
    >({
      query: (payload) => {
        return {
          url: `admins/fetch-missionaries`,
          method: "GET",
          params: payload,
        };
      },
    }),
    getAdminOrphanageHistory: build.query<
      GetAdminOrphanageResponse,
      GetAdminRegistryRequest
    >({
      query: (payload) => {
        return {
          url: `admins/fetch-orphanages`,
          method: "GET",
          params: payload,
        };
      },
    }),
    getAdminProjectsHistory: build.query<
      GetAdminProjectsResponse,
      GetAdminProjectRequest
    >({
      query: (payload) => {
        return {
          url: `admins/fetch-projects`,
          method: "GET",
          params: payload,
        };
      },
    }),
    getAdminProjectTestimoniesHistory: build.query<
      GetAdminProjectTestimoniesResponse,
      GetAdminProjectTestiomoniesRequest
    >({
      query: (payload) => {
        return {
          url: `admins/project-testimonies`,
          method: "GET",
          params: payload,
        };
      },
    }),
    uploadMinistryDocuments: build.mutation<any, AdminUploadCacDocumentRequest>(
      {
        query: (payload) => {
          const formData = new FormData();
          const { id, cacDocument, utilityBill } = payload;

          if (cacDocument) {
            formData.append("cacDocument", cacDocument);
          }

          if (utilityBill) {
            formData.append("utilityBill", utilityBill);
          }

          return {
            url: `admins/ministries/${id}/upload-docs`,
            method: "PATCH",
            body: formData,
          };
        },
        invalidatesTags: ["Admin_Ministry"],
      }
    ),
  }),
  overrideExisting: true,
});

export const {
  useGetMinistriesQuery,
  useVerifyMinistryMutation,
  useGetAdminMinistryQuery,
  useGetAdminMinistryAdministratorQuery,
  useGetAdminPayoutHistoryQuery,
  useUploadMinistryDocumentsMutation,
  useGetAdminMissionsHistoryQuery,
  useGetAdminOrphanageHistoryQuery,
  useGetAdminWidowsHistoryQuery,
  useGetAdminProjectsHistoryQuery,
  useGetAdminProjectTestimoniesHistoryQuery,
} = admin;
