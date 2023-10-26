import { TResponse } from "services/typings";

export interface IMinistryProjectPayout {
  id: string;
  payout_date: string;
  amount: string;
  status: "successful" | "failed";
  createdAt: string;
  donor_count: number;
  project_title: string;
  project_goal: number;
}

export interface IMinistryGeneralPayout {
  id: string;
  payout_date: string;
  amount: string;
  status: "successful" | "failed";
  createdAt: string;
}

export type GetMinistryPayoutsResponse = TResponse<IMinistryProjectPayout>;
