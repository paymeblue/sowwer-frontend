import api from "./api/apiSlice";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  verificationStatus: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  church: {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    cac_document: boolean | string;
    createdAt: string;
    state: string;
    updatedAt: string;
    website: string;
  };
}
export interface Token {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
  refreshTokenexpiresIn: string;
  type: string;
}
export interface LoginData {
  message: string;
  data: {
    user: User;
    token: Token;
  };
}
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: Token;
  };
  paginationInfo: null | string;
}
export interface SignupResponse {
  data: {
    user: User;
  };
  success: boolean;
  message: string;
  paginationInfo: null | string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}
export interface SignupRequest {
  ministryType: string;
  ministryPhone: string;
  ministryEmail: string;
  ministryName: string;
  projectDescription: string;
  ministryState: string;
  ministrySocialLink: string;
  ministryAddress: string;
  cacDocument: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
}

const auth = api.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: "users/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
      // on successful login, will refetch all currently
      // 'UNAUTHORIZED' queries
      invalidatesTags: (result) => (result ? ["UNAUTHORIZED"] : []),

      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: LoginResponse, meta, arg): any => {
        const { message, data } = response;
        return { message, data };
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
    }),
    logout: build.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: "users/register",
        method: "POST",
        body: credentials,
      }),
    }),
    refetchErroredQueries: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ["UNKNOWN_ERROR"],
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = auth;
