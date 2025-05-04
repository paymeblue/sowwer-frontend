import api from "services/api/apiSlice";
import {
  InitiateDonationAuthRequest,
  InitiateDonationUnauthRequest,
  InitateDonationAuthResponse,
  InitateDonationUnathResponse,
  VerifyDonationRequest,
} from "./typings";

const generalDonation = api.injectEndpoints({
  endpoints: (build) => ({
    initiateDonationUnauth: build.mutation<
      InitateDonationUnathResponse,
      InitiateDonationUnauthRequest
    >({
      query: (body) => ({
        url: `donate/initiate`,
        method: "POST",
        body,
      }),
    }),
    initiateDonationAuth: build.mutation<
      InitateDonationAuthResponse,
      InitiateDonationAuthRequest
    >({
      query: (body) => ({
        url: `donate/initiate-auth`,
        method: "POST",
        body,
      }),
    }),
    verifyDonation: build.mutation<void, VerifyDonationRequest>({
      query: (body) => ({
        url: `donate/verify`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Donations"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useInitiateDonationUnauthMutation,
  useInitiateDonationAuthMutation,
  useVerifyDonationMutation,
} = generalDonation;
