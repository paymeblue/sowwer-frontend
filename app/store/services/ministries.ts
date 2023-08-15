import {
  ErrorResponse,
  MinistryProfileRequest,
  MinistryProfileResponse,
  MinistryProjectsRequest,
  MinistryProjectsResponse,
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
      invalidatesTags: cacher.providesProperty("Ministry"),
      // Transform response and error
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getMinistryProjects: build.query<
      MinistryProjectsResponse,
      MinistryProjectsRequest
    >({
      query: (body) =>
        `ministries/${body.id}/projects?page=${body.page}&limit=10`,
      // Invalidate cache tags specific to ministry projects
      // providesTags: cacher.invalidatesList("Projects"),
      providesTags: (result, error, page) => {
        return result
          ? [
              // Provides a tag for each project in the current page,
              // as well as the 'PARTIAL-LIST' tag.
              ...result.data.map(({ id }) => ({
                type: "Projects" as const,
                id,
              })),
              { type: "Projects", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Projects", id: "PARTIAL-LIST" }];
      },
      // Transform response and error
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
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
    deleteMinistryProject: build.mutation<any, string>({
      query: (id) => `projects/${id}/delete`,
      // Invalidates the tag for this Project `id`, as well as the `PARTIAL-LIST` tag,
      // causing the `listProjects` query to re-fetch if a component is subscribed to the query.
      invalidatesTags: (result, error, id) => [
        { type: "Projects", id },
        { type: "Projects", id: "PARTIAL-LIST" },
      ],
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    refetchErroredQueries: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ["UNKNOWN_ERROR"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateMinistryMutation,
  useUpdateMinistryProfileMutation,
  useGetMinistryProjectsQuery,
  useUpdateSocialLinksMutation,
  useDeleteMinistryProjectMutation,
} = ministry;
