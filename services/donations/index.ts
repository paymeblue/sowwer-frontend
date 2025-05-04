import api from "services/api/apiSlice";

import { DonationsResponse } from "./typings";

const donations = api.injectEndpoints({
  endpoints: (build) => ({
    getDonations: build.query<
      DonationsResponse,
      { page: number; limit: number }
    >({
      query: (body) => {
        const { page, limit } = body;
        return {
          url: "donations",
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetDonationsQuery } = donations;
