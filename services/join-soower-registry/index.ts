import {
  ErrorResponse,
  MissionaryJoinSoowerRequest,
  PlainResponse,
  WidowJoinSoowerRequest,
} from "../typings";
import api from "services/api/apiSlice";
import { cacher } from "services/api/rtkQueryCacheUtils";
import { OrphanageRegistrationRequest } from "./typings";

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
    orphanage: build.mutation<void, OrphanageRegistrationRequest>({
      query: (payload) => {
        const formData = new FormData();

        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            formData.append(key, payload[key]!);
          }
        }

        return {
          url: "/registry/orphanages",
          method: "POST",
          body: formData,
        };
      },
    }),
    refetchErroredQueries: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: cacher.invalidatesUnknownErrors(),
    }),
  }),
  overrideExisting: true,
});

export const { useWidowMutation, useMissionaryMutation, useOrphanageMutation } =
  joinSoower;
