import {
  ErrorResponse,
  InitiateDonationResponseAuth,
  InitiateDonationResponseUnauth,
  InitiateDonationToMinistryRequestAuth,
  InitiateDonationToMinistryRequestUnauth,
  InitiateDonationToProjectRequest,
  InitiateDonationToProjectRequestAuth,
  LoginRequest,
  LoginResponse,
  MinistrySignupRequest,
  PlainResponse,
  RegisterDonorRequest,
  ResetPassowrdRequest,
  SignupResponse,
} from "../typings";
import api from "services/api/apiSlice";
import { cacher } from "services/api/rtkQueryCacheUtils";

const auth = api.injectEndpoints({
  endpoints: (build) => ({
    ministrySignup: build.mutation<SignupResponse, MinistrySignupRequest>({
      query: (credentials) => {
        const formData = new FormData();

        for (const key in credentials) {
          if (credentials.hasOwnProperty(key)) {
            formData.append(key, credentials[key]!);
          }
        }

        return {
          url: "users/register",
          method: "POST",
          body: formData,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          // mode: "no-cors",
        };
      },
      transformResponse: (response: SignupResponse, meta, arg): any => {
        const { message, data } = response;
        return { message, data };
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data,
    }),
    donorRegister: build.mutation<SignupResponse, RegisterDonorRequest>({
      query: (credentials) => ({
        url: "users/register-donor",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: SignupResponse, meta, arg): any => {
        const { message, data } = response;
        return { message, data };
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data,
    }),
    initiatePaymentToProjectUnauth: build.mutation<
      InitiateDonationResponseUnauth,
      InitiateDonationToProjectRequest
    >({
      query: (credentials) => {
        const { id, ...rest } = credentials;
        return {
          url: `projects/${id}/initiate-donation`,
          method: "POST",
          body: rest,
        };
      },
      invalidatesTags: cacher.cacheByIdArgProperty("Projects"),
      transformResponse: (
        response: InitiateDonationResponseUnauth,
        meta,
        arg
      ): any => {
        const { message, data } = response;
        return { message, data };
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data,
    }),
    initiatePaymentToProjectAuth: build.mutation<
      InitiateDonationResponseAuth,
      InitiateDonationToProjectRequestAuth
    >({
      query: (credentials) => {
        const { id, ...rest } = credentials;
        return {
          url: `projects/${id}/project-donation-by-user`,
          method: "POST",
          body: rest,
        };
      },
      invalidatesTags: cacher.cacheByIdArgProperty("Projects"),
      transformResponse: (
        response: InitiateDonationResponseAuth,
        meta,
        arg
      ): any => {
        const { message, data } = response;
        return { message, data };
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data,
    }),
    initiatePaymentToMinistryUnauth: build.mutation<
      InitiateDonationResponseUnauth,
      InitiateDonationToMinistryRequestUnauth
    >({
      query: (credentials) => {
        const { id, ...rest } = credentials;
        return {
          url: `ministries/${id}/m-initiate`,
          method: "POST",
          body: rest,
        };
      },
      invalidatesTags: cacher.invalidatesList("General"),
      transformResponse: (
        response: InitiateDonationResponseUnauth,
        meta,
        arg
      ): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data,
    }),
    initiatePaymentToMinistryOneTime: build.mutation<
      InitiateDonationResponseUnauth,
      InitiateDonationToMinistryRequestUnauth
    >({
      query: (credentials) => {
        const { id, ...rest } = credentials;
        return {
          url:
            credentials.payment_mode === "recurring"
              ? `ministries/${id}/ministry-recurring-donation`
              : `ministries/${id}/initiate-onetime-donation`,
          method: "POST",
          body: rest,
        };
      },
      invalidatesTags: cacher.invalidatesList("General"),
      transformResponse: (
        response: InitiateDonationResponseUnauth,
        meta,
        arg
      ): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data,
    }),
    initiatePaymentToMinistryAuth: build.mutation<
      InitiateDonationResponseAuth,
      InitiateDonationToMinistryRequestAuth
    >({
      query: (credentials) => {
        const { id, ...rest } = credentials;
        return {
          url: `ministries/${id}/ministry-donation-by-user`,
          method: "POST",
          body: rest,
        };
      },
      invalidatesTags: cacher.invalidatesList("General"),
      transformResponse: (
        response: InitiateDonationResponseAuth,
        meta,
        arg
      ): any => {
        const { message, data } = response;
        return { message, data };
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data,
    }),

    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
      // on successful login, will refetch all currently
      // 'UNAUTHORIZED' queries
      invalidatesTags: cacher.invalidatesUnauthorized(),
      // invalidatesTags: (result) =>
      //   result ? cacher.invalidatesUnauthorized() : [],

      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: LoginResponse, meta, arg): any => {
        const { message, data } = response;
        return { message, data };
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data,
    }),
    forgotPassword: build.mutation<PlainResponse, { email: string }>({
      query: (body) => ({
        url: "users/forgot-password",
        method: "POST",
        body,
      }),

      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: PlainResponse, meta, arg): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    resetPassword: build.mutation<PlainResponse, ResetPassowrdRequest>({
      query: (body) => {
        const { token, ...rest } = body;
        return {
          url: `users/reset-password/${token}`,
          method: "PATCH",
          body: rest,
        };
      },

      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: PlainResponse, meta, arg): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    logout: build.mutation<any, any>({
      query: (credentials) => ({
        url: "users/register",
        method: "POST",
        body: credentials,
      }),
    }),
    refetchErroredQueries: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: cacher.invalidatesUnknownErrors(),
    }),
  }),
  overrideExisting: true,
});

export const {
  useMinistrySignupMutation,
  useDonorRegisterMutation,
  useLoginMutation,
  useInitiatePaymentToMinistryUnauthMutation,
  useInitiatePaymentToMinistryAuthMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useInitiatePaymentToProjectAuthMutation,
  useInitiatePaymentToProjectUnauthMutation,
  useInitiatePaymentToMinistryOneTimeMutation,
} = auth;
