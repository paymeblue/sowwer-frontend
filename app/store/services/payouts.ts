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
    verifyProjectPayment: build.mutation<any, VerifyPaymentRequest>({
      query: (body) => ({
        url: `payments/verify-project-donation`,
        method: "POST",
        body,
      }),
      transformResponse: (response: AccountResponse, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    verifyMinistryPayment: build.mutation<any, VerifyPaymentRequest>({
      query: (body) => ({
        url: `payments/verify-ministry-donation`,
        method: "POST",
        body,
      }),
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
    pauseRecurringPayment: build.mutation<PlainResponse, string>({
      query: (id) => `plans/${id}/cancel`,
      invalidatesTags: cacher.cacheByIdArg("General"),
      transformResponse: (response: PlainResponse, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    resumeRecurringPayment: build.mutation<PlainResponse, string>({
      query: (id) => `plans/${id}/resume-payment`,
      invalidatesTags: cacher.cacheByIdArg("General"),
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
    requestMinistryPayout: build.mutation<PlainResponse, string>({
      query: (id) => `ministries/${id}/ministry-payout`,
      invalidatesTags: cacher.cacheByIdArg("Ministry"),
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
  useVerifyProjectPaymentMutation,
  useVerifyMinistryPaymentMutation,
  useGetAccountInfoQuery,
  useRequestPayoutMutation,
  useRequestMinistryPayoutMutation,
  usePauseRecurringPaymentMutation,
  useResumeRecurringPaymentMutation,
  usePayoutHistoryQuery,
} = payouts;
