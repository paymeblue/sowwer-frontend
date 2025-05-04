import api from "services/api/apiSlice";

import { DonationsResponse } from "./typings";

const donations = api.injectEndpoints({
  endpoints: (build) => ({
    getDonations: build.query<
      DonationsResponse,
      { page: number; limit: number; type?: "dad-project"; extended?: boolean }
    >({
      query: (body) => {
        const { page, limit, type, extended } = body;
        return {
          url: "donations",
          method: "GET",
          params: {
            page,
            limit,
            type,
            extended,
          },
        };
      },
      providesTags: ["Donations"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetDonationsQuery } = donations;
