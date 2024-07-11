import api from "services/api/apiSlice";
import { JoinCouncilRegistrationRequest } from "./typings";
import { cacher } from "services/api/rtkQueryCacheUtils";

const joinCouncil = api.injectEndpoints({
  endpoints: (build) => ({
    joinCouncil: build.mutation<void, JoinCouncilRegistrationRequest>({
      query: (payload) => ({
        url: "councils",
        method: "POST",
        body: payload,
      }),
    }),
    refetchErroredQueries: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: cacher.invalidatesUnknownErrors(),
    }),
  }),
  overrideExisting: true,
});

export const { useJoinCouncilMutation } = joinCouncil;
