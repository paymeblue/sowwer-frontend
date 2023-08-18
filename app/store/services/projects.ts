import {
  CreateProjectRequest,
  CreateProjectResponse,
  ErrorResponse,
  ExploreProjectsRequest,
  ExploreProjectsResponse,
  GetProjectDetailsResponse,
  MinistryProjectDonorsResponse,
  MinistryProjectsRequest,
  MinistryProjectsResponse,
  PublishOrDraftRequest,
  PublishOrDraftResponse,
  ResultResponse,
} from "@store/types";
import api from "./api/apiSlice";
import { cacher } from "./api/rtkQueryCacheUtils";

const projects = api.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation<CreateProjectResponse, CreateProjectRequest>({
      query: (credentials) => ({
        url: "projects",
        method: "POST",
        body: credentials,
      }),
      // Invalidate cache tags for 'Projects' on successful project creation
      invalidatesTags: cacher.invalidatesList("Projects"),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: CreateProjectResponse, meta, arg): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getProject: build.query<ResultResponse, string | undefined>({
      query: (id) => `projects/${id}`,
      // Cache tags for individual project retrieval
      providesTags: cacher.cacheByIdArg("Projects") as any,
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: ResultResponse, meta, arg): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    exploreProjects: build.query<
      ExploreProjectsResponse,
      ExploreProjectsRequest
    >({
      query: (body) => {
        let url;
        if (body.query === "all") {
          url = `projects?page=${body.page}&limit=6&status=active`;
        } else {
          url = `projects?page=${body.page}&limit=6&q=${body.query}&status=active`;
        }
        return {
          url,
          method: "GET",
        };
      },
      providesTags: cacher.providesProperty("Projects"),
      transformResponse: (
        response: ExploreProjectsResponse,
        meta,
        arg
      ): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getProjectDetails: build.query<GetProjectDetailsResponse, string>({
      query: (id) => `projects/${id}/details`,
      providesTags: cacher.cacheByIdArg("Projects"),
      transformResponse: (reponse: GetProjectDetailsResponse, meta, arg) => {
        return reponse;
      },
      transformErrorResponse: (reponse: ErrorResponse, meta, arg) => {
        return reponse.data.message;
      },
    }),
    publishOrDraftProject: build.mutation<
      PublishOrDraftResponse,
      PublishOrDraftRequest
    >({
      query: ({ id, query }) => `projects/${id}/toggle?q=${query}`,
      // Invalidate cache tags for specific project on publish/draft action
      invalidatesTags: cacher.cacheByIdArgProperty("Projects") as any,
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: PublishOrDraftResponse, meta, arg) => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
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
      providesTags: cacher.providesNestedList("Projects") as any,
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getMinistryProjectDonors: build.query<
      MinistryProjectDonorsResponse,
      string | undefined
    >({
      query: (id) => `projects/${id}/donors?page=1&limit=10`,
      // Invalidate cache tags specific to ministry projects
      providesTags: cacher.cacheByIdArg("Projects") as any,
      // Transform response and error
      transformResponse: (
        response: MinistryProjectDonorsResponse,
        meta,
        arg
      ): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getDonationsForDonorUser: build.query<
      MinistryProjectDonorsResponse,
      { page: number; type: "project" | "ministry" }
    >({
      query: ({ page, type }) =>
        `donors/donations?limit=6&page=${page}&type=${type}`,
      providesTags: cacher.cacheByIdArg("Projects") as any,
      transformResponse: (
        response: MinistryProjectDonorsResponse,
        meta,
        arg
      ): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    deleteMinistryProject: build.mutation<any, string | undefined>({
      query: (id) => `projects/${id}/delete`,
      // Invalidates the tag for this Project `id`, as well as the `LIST` tag,
      // causing the `Projects list` query to re-fetch if a component is subscribed to the query.
      invalidatesTags: cacher.providesProperty("Projects"),
      // invalidatesTags: (result, error, id) => [
      //   { type: "Projects", id },
      //   { type: "Projects", id: "PARTIAL-LIST" },
      // ],
      transformResponse: (response: any, meta, arg): any => {
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
  useCreateProjectMutation,
  useGetProjectQuery,
  useGetProjectDetailsQuery,
  useGetDonationsForDonorUserQuery,
  useExploreProjectsQuery,
  usePublishOrDraftProjectMutation,
  useGetMinistryProjectsQuery,
  useGetMinistryProjectDonorsQuery,
  useDeleteMinistryProjectMutation,
} = projects;
