import { Response, TResponse } from "services/typings";

export interface Testimony {
  id: string;
  title: string;
  project_name: string;
  ministry_name: string;
  number_of_people_impacted: string;
  cover_photo: string;
  story: string;
  status: string;
  amount_raised: string;
  created_at: string;
}

export interface GetTestimoniesRequest {
  limit: number;
  page: number;
}

export interface GetSingleTestimonyRequest {
  id: string;
}

export type GetTestimoniesResponse = TResponse<Testimony>;
export type GetSingleTestimonyResponse = Response<Testimony>;
