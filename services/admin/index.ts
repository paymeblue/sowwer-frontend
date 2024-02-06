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
            url: `admins/ministries/${id}`,
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
} = admin;
