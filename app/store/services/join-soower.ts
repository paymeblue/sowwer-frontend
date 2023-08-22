import {
  ErrorResponse,
  MissionaryJoinSoowerRequest,
  PlainResponse,
  WidowJoinSoowerRequest,
} from "@store/types";
import api from "./api/apiSlice";
import { cacher } from "./api/rtkQueryCacheUtils";

const joinSoower = api.injectEndpoints({
  endpoints: (build) => ({
    widow: build.mutation<PlainResponse, WidowJoinSoowerRequest>({
      query: (credentials) => ({
        url: "registry/widows",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: PlainResponse, meta, arg): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: ErrorResponse, meta, arg) =>
        response.data.message,
    }),
    missionary: build.mutation<PlainResponse, MissionaryJoinSoowerRequest>({
      query: (credentials) => ({
        url: "registry/missionaries",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: PlainResponse, meta, arg): any => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
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

export const { useWidowMutation, useMissionaryMutation } = joinSoower;
