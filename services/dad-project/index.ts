import api from "services/api/apiSlice";
import {
  InitiateDadDonationAuthRequest,
  InitateDadDonationAuthResponse,
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
    initiateDadDonationAuth: build.mutation<
      InitateDadDonationAuthResponse,
      InitiateDadDonationAuthRequest
    >({
      query: (body) => ({
        url: `dad-project/initiate-auth`,
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
  overrideExisting: true,
});

export const {
  useInitiateDadDonationUnauthMutation,
  useInitiateDadDonationAuthMutation,
  useVerifyDadDonationMutation,
} = dadProject;
