import { TResponse } from "services/typings";

export type Donation = {
  id: string;
  amount: string;
  status: string;
  type: "dad-project" | "widows-care";
  createdAt: string;
  geo_location: string;
  frequency: string;
  sponsorship_type: "full" | "partial";
  currency: string;
  txn_reference: string;
  transaction_id: string;
};

export type DonationsResponse = TResponse<Donation>;
