import {
  ErrorResponse,
  MissionaryJoinSoowerRequest,
  MissionaryJoinSoowerResponse,
  WidowJoinSoowerRequest,
  WidowJoinSoowerResponse,
} from "@store/types";
import api from "./api/apiSlice";
import { cacher } from "./api/rtkQueryCacheUtils";

const joinSoower = api.injectEndpoints({
  endpoints: (build) => ({
    widow: build.mutation<WidowJoinSoowerResponse, WidowJoinSoowerRequest>({
      query: (credentials) => ({
        url: "registry/widows",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (
        response: WidowJoinSoowerResponse,
        meta,
        arg
      ): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data,
    }),
    missionary: build.mutation<
      MissionaryJoinSoowerResponse,
      MissionaryJoinSoowerRequest
    >({
      query: (credentials) => ({
        url: "registry/ministry",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (
        response: MissionaryJoinSoowerResponse,
        meta,
        arg
      ): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data,
    }),
    refetchErroredQueries: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: cacher.invalidatesUnknownErrors(),
    }),
  }),
  overrideExisting: true,
});

export const { useWidowMutation, useMissionaryMutation } = joinSoower;
