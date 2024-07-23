import {
  GetTestimoniesRequest,
  GetTestimoniesResponse,
  GetSingleTestimonyRequest,
  GetSingleTestimonyResponse,
} from "./typings";
import api from "services/api/apiSlice";

const testimonies = api.injectEndpoints({
  endpoints: (build) => ({
    getTestimonies: build.query<GetTestimoniesResponse, GetTestimoniesRequest>({
      query: (payload) => {
        return {
          url: "testimonies",
          params: payload,
        };
      },
    }),
    getTestimony: build.query<
      GetSingleTestimonyResponse,
      GetSingleTestimonyRequest
    >({
      query: (payload) => {
        return {
          url: `testimonies/${payload.id}`,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetTestimoniesQuery, useGetTestimonyQuery } = testimonies;
