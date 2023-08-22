import {
  DonorSignupRequest,
  DonorSignupResponse,
  ErrorResponse,
  LoginRequest,
  LoginResponse,
  MinistrySignupRequest,
  PlainResponse,
  RegisterDonorRequest,
  ResetPassowrdRequest,
  SignupResponse,
} from "@store/types";
import api from "./api/apiSlice";
import { cacher } from "./api/rtkQueryCacheUtils";

const auth = api.injectEndpoints({
  endpoints: (build) => ({
    ministrySignup: build.mutation<SignupResponse, MinistrySignupRequest>({
      query: (credentials) => ({
        url: "users/register",
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
    donorSignup: build.mutation<DonorSignupResponse, DonorSignupRequest>({
      query: (credentials) => {
        const { id, ...rest } = credentials;
        return {
          url: `projects/${id}/p-initiate`,
          method: "POST",
          body: rest,
        };
      },
      transformResponse: (response: DonorSignupResponse, meta, arg): any => {
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
          method: "POST",
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useDonorSignupMutation,
} = auth;
