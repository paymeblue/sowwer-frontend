import {
  AccountResponse,
  ErrorResponse,
  GetBanksResponse,
  PayoutHistoryResponse,
  PlainResponse,
  SaveAccountRequest,
  VerifyAccountRequest,
  VerifyPaymentRequest,
} from "@store/types";
import api from "./api/apiSlice";
import { cacher } from "./api/rtkQueryCacheUtils";

const payouts = api.injectEndpoints({
  endpoints: (build) => ({
    verifyPayment: build.mutation<any, VerifyPaymentRequest>({
      query: (body) => ({ url: `payments/verify`, method: "POST", body }),
      transformResponse: (response: AccountResponse, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getBanks: build.query<GetBanksResponse, void>({
      query: () => "banks",
      transformResponse: (response: GetBanksResponse, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    verifyAccount: build.mutation<AccountResponse, VerifyAccountRequest>({
      query: (body) => ({ url: `accounts/verify`, method: "POST", body }),
      invalidatesTags: cacher.providesProperty("Account"),
      transformResponse: (response: AccountResponse, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    saveAccount: build.mutation<any, SaveAccountRequest>({
      query: (body) => ({ url: `accounts`, method: "POST", body }),
      invalidatesTags: cacher.providesProperty("Account"),
      transformResponse: (response: AccountResponse, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    cancelRecurringPayment: build.mutation<PlainResponse, string>({
      query: (id) => `payments/${id}/cancel`,
      invalidatesTags: cacher.cacheByIdArg("Projects"),
      transformResponse: (response: PlainResponse, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getAccountInfo: build.query<AccountResponse, void>({
      query: () => `accounts`,
      providesTags: cacher.providesProperty("Account"),
      transformResponse: (response: AccountResponse, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    requestPayout: build.mutation<PlainResponse, string>({
      query: (id) => `projects/${id}/payout`,
      invalidatesTags: cacher.cacheByIdArg("Projects"),
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    payoutHistory: build.query<PayoutHistoryResponse, { page?: number }>({
      query: (body) => `payouts?page=${body.page}&limit=10`,
      providesTags: cacher.providesNestedList("Projects"),
      transformResponse: (response, meta, arg): any => {
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
  useGetBanksQuery,
  useVerifyAccountMutation,
  useSaveAccountMutation,
  useVerifyPaymentMutation,
  useGetAccountInfoQuery,
  useRequestPayoutMutation,
  useCancelRecurringPaymentMutation,
  usePayoutHistoryQuery,
} = payouts;
