import {
  ErrorResponse,
  ExploreMinistriesResponse,
  ExploreRequest,
  GetMinistryDetailsResponse,
  GetSocialLinksResponse,
  MinistryProfileRequest,
  MinistryProfileResponse,
  PlainResponse,
  UpdateSocialLinksRequest,
} from "../typings";
import api from "services/api/apiSlice";
import { cacher } from "services/api/rtkQueryCacheUtils";

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
    exploreMinistries: build.query<ExploreMinistriesResponse, ExploreRequest>({
      query: (body) => {
        let url;
        if (body.query === "all") {
          url = `ministries?page=${body.page}&limit=6`;
        } else {
          url = `ministries?page=${body.page}&limit=6&category=${body.query}`;
        }
        return {
          url,
          method: "GET",
        };
      },
      providesTags: cacher.providesNestedList("Ministry"),
      transformResponse: (
        response: ExploreMinistriesResponse,
        meta,
        arg
      ): any => {
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
        const formData = new FormData();

        for (const key in rest) {
          if (rest.hasOwnProperty(key)) {
            formData.append(key, rest[key]);
          }
        }
        return {
          url: `ministries/${id}/profile`,
          method: "PATCH",
          body: formData,
        };
      },
      // Invalidate 'Ministry' cache tags on successful creation
      invalidatesTags: cacher.providesProperty("Ministry"),
      // Transform response and error
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getMinistryDetails: build.query<
      GetMinistryDetailsResponse,
      string | undefined
    >({
      query: (id) => `ministries/${id}`,
      providesTags: cacher.cacheByIdArg("Ministry"),
      transformResponse: (reponse: GetMinistryDetailsResponse, meta, arg) => {
        return reponse;
      },
      transformErrorResponse: (reponse: ErrorResponse, meta, arg) => {
        return reponse.data.message;
      },
    }),
    updateSocialLinks: build.mutation<PlainResponse, UpdateSocialLinksRequest>({
      query: (body) => ({
        url: `social-links`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: cacher.providesProperty("Ministry"),
      // invalidatesTags: cacher.providesProperty("Social-links"),

      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getSocialLinks: build.query<GetSocialLinksResponse, string | undefined>({
      query: (id) => `ministries/${id}/social-links`,
      providesTags: cacher.cacheByIdArg("Ministry"),
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
  useExploreMinistriesQuery,
  useUpdateMinistryProfileMutation,
  useUpdateSocialLinksMutation,
  useGetSocialLinksQuery,
} = ministry;
