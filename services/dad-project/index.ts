import api from "services/api/apiSlice";
import {
  InitiateDadDonationUnauthRequest,
  InitateDadDonationUnathResponse,
  VerifyDadDonationRequest,
} from "./typings";

const dadProject = api.injectEndpoints({
  endpoints: (build) => ({
    initiateDadDonationUnauth: build.mutation<
      InitateDadDonationUnathResponse,
      InitiateDadDonationUnauthRequest
    >({
      query: (body) => ({
        url: `dad-project/initiate`,
        method: "POST",
        body,
      }),
    }),
    verifyDadDonation: build.mutation<void, VerifyDadDonationRequest>({
      query: (body) => ({
        url: `dad-project/verify`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useInitiateDadDonationUnauthMutation,
  useVerifyDadDonationMutation,
} = dadProject;
