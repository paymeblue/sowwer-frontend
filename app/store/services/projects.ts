import {
  CreateProjectRequest,
  CreateProjectResponse,
  ErrorResponse,
  PublishOrDraft,
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
    getProject: build.query<ResultResponse, string | null>({
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
    publishOrDraftProject: build.mutation<any, PublishOrDraft>({
      query: ({ id, query }) => `projects/${id}/toggle?q=${query}`,
      // Invalidate cache tags for specific project on publish/draft action
      invalidatesTags: cacher.cacheByIdArgProperty("Projects") as any,
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
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
  useCreateProjectMutation,
  useGetProjectQuery,
  usePublishOrDraftProjectMutation,
} = projects;
