import {
  CoverPhotoRequest,
  CreateProjectRequest,
  CreateProjectResponse,
  DonorGeneralDonationsResponse,
  DonorProjectDonationsResponse,
  EditProjectRequest,
  ErrorResponse,
  ExploreProjectsResponse,
  ExploreRequest,
  GetDonorsForProjectResponse,
  GetProjectDetailsResponse,
  MinistryDonationResponse,
  MinistryGeneralDonationsRequest,
  MinistryGeneralDonationsResponse,
  MinistryOutgoingGeneralDonationsResponse,
  MinistryOutgoingProjectDonationsResponse,
  MinistryProjectsRequest,
  MinistryProjectsResponse,
  PlainResponse,
  PublishOrDraftRequest,
  PublishOrDraftResponse,
  ResultResponse,
} from "../typings";
import api from "services/api/apiSlice";
import { cacher } from "services/api/rtkQueryCacheUtils";

const projects = api.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation<CreateProjectResponse, CreateProjectRequest>({
      query: (credentials) => {
        const formData = new FormData();

        for (const key in credentials) {
          if (credentials.hasOwnProperty(key)) {
            formData.append(key, credentials[key]);
          }
        }

        return {
          url: "projects/create",
          method: "POST",
          body: formData,
        };
      },
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
    editCoverPhoto: build.mutation<CreateProjectResponse, CoverPhotoRequest>({
      query: (credentials) => ({
        url: `projects/${credentials.id}`,
        method: "PATCH",
        body: credentials.cover_photo,
      }),
      // Invalidate cache tags for 'Projects' on successful project creation
      invalidatesTags: cacher.providesProperty("Projects"),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: CreateProjectResponse, meta, arg): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getProject: build.query<ResultResponse, string | null | undefined>({
      query: (id) => {
        if (id) {
          // If id is provided and not null or undefined, run the query
          return `projects/${id}`;
        } else {
          // If id is not provided or is null/undefined, return an empty string
          return "";
        }
      },
      // Cache tags for individual project retrieval
      providesTags: cacher.providesProperty("Projects"),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: ResultResponse, meta, arg): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    editProject: build.mutation<ResultResponse, EditProjectRequest>({
      query: (body) => {
        const formData = new FormData();
        for (const key in body) {
          if (body.hasOwnProperty(key)) {
            formData.append(key, body[key]);
          }
        }
        return { url: `projects/${body.id}`, method: "PATCH", body: formData };
      },
      // Cache tags for individual project retrieval
      invalidatesTags: cacher.providesProperty("Projects"),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: ResultResponse, meta, arg): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    exploreProjects: build.query<ExploreProjectsResponse, ExploreRequest>({
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
      invalidatesTags: cacher.providesProperty("Projects"),
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
      query: (body) => {
        let url;
        if (body.status) {
          url = `ministries/${body.id}/projects?page=${body.page}&status=${body.status}&limit=10`;
        } else {
          url = `ministries/${body.id}/projects?page=${body.page}&limit=10`;
        }
        //  if (body.type) {
        //    url = `ministries/${body.id}/projects?page=${body.page}&status=completed&type=${body.type}&limit=10`;
        //  } else {
        //    url = `ministries/${body.id}/projects?page=${body.page}&limit=10`;
        //  }
        return {
          url,
          method: "GET",
        };
      },
      providesTags: cacher.providesNestedList("Projects"),
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getMinistryGeneralDonations: build.query<
      MinistryGeneralDonationsResponse,
      MinistryGeneralDonationsRequest
    >({
      query: (body) =>
        `ministries/${body.id}/general?page=${body.page}&status=completed&limit=10`,
      // Invalidate cache tags specific to ministry projects
      providesTags: cacher.providesNestedList("Ministry"),
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getMinistryProjectDonors: build.query<
      GetDonorsForProjectResponse,
      { id: string | undefined; page: number }
    >({
      query: (body) => `donors/project/${body.id}?page=${body.page}&limit=6`,
      // Invalidate cache tags specific to ministry projects
      providesTags: cacher.providesNestedList("Projects") as any,
      // Transform response and error
      transformResponse: (
        response: GetDonorsForProjectResponse,
        meta,
        arg
      ): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getProjectDonationsForDonorUser: build.query<
      DonorProjectDonationsResponse,
      { page?: number; pageSize?: number }
    >({
      query: ({ page, pageSize }) =>
        `donors/donations?limit=${pageSize}&page=${page}&type=project`,
      providesTags: cacher.providesNestedList("Projects"),
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getGeneralDonationsForDonorUser: build.query<
      DonorGeneralDonationsResponse,
      { page?: number; pageSize?: number }
    >({
      query: ({ page, pageSize }) =>
        `donors/donations?limit=${pageSize}&page=${page}&type=ministry`,
      providesTags: cacher.providesNestedList("General"),
      transformResponse: (response, meta, arg): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getDonationsForMinistryUser: build.query<
      MinistryDonationResponse,
      { page?: number; type: "project" | "ministry"; id?: string }
    >({
      query: ({ page, type, id }) =>
        `ministries/${id}/list-donors?limit=10&page=${page}&type=${type}`,
      providesTags: cacher.providesNestedList("Projects"),
      transformResponse: (
        response: MinistryDonationResponse,
        meta,
        arg
      ): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getIncomingDonationsForMinistryUser: build.query<
      MinistryDonationResponse,
      { page?: number; type: "project" | "ministry"; id?: string }
    >({
      query: ({ page, type, id }) =>
        `ministries/${id}/incoming-donations?limit=10&page=${page}&type=${type}`,
      providesTags: cacher.providesNestedList("Projects"),
      transformResponse: (
        response: MinistryDonationResponse,
        meta,
        arg
      ): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getOutgoingProjectDonationsForMinistryUser: build.query<
      MinistryOutgoingProjectDonationsResponse,
      { page?: number; id?: string }
    >({
      query: ({ page, id }) =>
        `ministries/${id}/outgoing-donations?limit=10&page=${page}&type=project`,
      providesTags: cacher.providesNestedList("Projects"),
      transformResponse: (
        response: MinistryOutgoingProjectDonationsResponse,
        meta,
        arg
      ): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    getOutgoingGeneralDonationsForMinistryUser: build.query<
      MinistryOutgoingGeneralDonationsResponse,
      { page?: number; id?: string }
    >({
      query: ({ page, id }) =>
        `ministries/${id}/outgoing-donations?limit=10&page=${page}&type=ministry`,
      providesTags: cacher.providesNestedList("Projects"),
      transformResponse: (
        response: MinistryOutgoingGeneralDonationsResponse,
        meta,
        arg
      ): any => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    closeMinistryProject: build.mutation<
      PlainResponse,
      { id?: string; password: string }
    >({
      query: (body) => ({
        url: `projects/${body.id}/close`,
        method: "POST",
        body: { password: body.password },
      }),
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
    deleteMinistryProject: build.mutation<any, string | undefined>({
      query: (id) => `projects/${id}/delete`,
      // Invalidates the tag for this Project `id`, as well as the `LIST` tag,
      // causing the `Projects list` query to re-fetch if a component is subscribed to the query.
      invalidatesTags: cacher.cacheByIdArg("Projects"),
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
  useEditCoverPhotoMutation,
  useGetProjectQuery,
  useEditProjectMutation,
  useGetProjectDetailsQuery,
  useGetProjectDonationsForDonorUserQuery,
  useGetGeneralDonationsForDonorUserQuery,
  useGetDonationsForMinistryUserQuery,
  useExploreProjectsQuery,
  usePublishOrDraftProjectMutation,
  useGetMinistryProjectsQuery,
  useGetMinistryGeneralDonationsQuery,
  useGetMinistryProjectDonorsQuery,
  useDeleteMinistryProjectMutation,
  useCloseMinistryProjectMutation,
  useGetIncomingDonationsForMinistryUserQuery,
  useGetOutgoingProjectDonationsForMinistryUserQuery,
  useGetOutgoingGeneralDonationsForMinistryUserQuery,
} = projects;
