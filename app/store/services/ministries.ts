import {
  ErrorResponse,
  GetMinistryDetailsResponse,
  GetSocialLinksResponse,
  MinistryProfileRequest,
  MinistryProfileResponse,
  UpdateSocialLinksRequest,
  UpdateSocialLinksResponse,
} from "@store/types";
import api from "./api/apiSlice";
import { cacher } from "./api/rtkQueryCacheUtils";

const ministry = api.injectEndpoints({
  endpoints: (build) => ({
    createMinistry: build.mutation<any, any>({
      query: (credentials) => ({
        url: "ministry",
        method: "POST",
        body: credentials,
      }),
      // Invalidate 'Ministry' cache tags on successful creation
      invalidatesTags: cacher.invalidatesList("Ministry"),
      // Transform response and error
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    updateMinistryProfile: build.mutation<
      MinistryProfileResponse,
      MinistryProfileRequest
    >({
      query: (credentials) => {
        const { id, ...rest } = credentials;
        return { url: `ministries/${id}/profile`, method: "PATCH", body: rest };
      },
      // Invalidate 'Ministry' cache tags on successful creation
      // invalidatesTags: cacher.cacheByIdArgProperty("Ministry") as any,
      invalidatesTags: cacher.providesProperty("Ministry"),
      // Transform response and error
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getMinistryDetails: build.query<GetMinistryDetailsResponse, string>({
      query: (id) => `ministries/${id}`,
      providesTags: cacher.cacheByIdArg("Ministry"),
      transformResponse: (reponse: GetMinistryDetailsResponse, meta, arg) => {
        return reponse;
      },
      transformErrorResponse: (reponse: ErrorResponse, meta, arg) => {
        return reponse.data.message;
      },
    }),
    updateSocialLinks: build.mutation<
      UpdateSocialLinksResponse,
      UpdateSocialLinksRequest
    >({
      query: (body) => ({
        url: `social-links`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: cacher.providesProperty("Social-links"),
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getSocialLinks: build.query<GetSocialLinksResponse, void>({
      query: () => `social-links`,
      providesTags: cacher.providesProperty("Social-links"),
      transformResponse: (reponse: GetSocialLinksResponse, meta, arg) => {
        return reponse;
      },
      transformErrorResponse: (reponse: ErrorResponse, meta, arg) => {
        return reponse.data.message;
      },
    }),
    refetchErroredQueries: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: cacher.invalidatesUnknownErrors(),
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateMinistryMutation,
  useGetMinistryDetailsQuery,
  useUpdateMinistryProfileMutation,
  useUpdateSocialLinksMutation,
  useGetSocialLinksQuery,
} = ministry;
