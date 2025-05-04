import { TResponse } from "services/typings";

export type Donation = {
  id: string;
  amount: string;
  age?: number;
  name?: string;
  status: string;
  type: "dad-project" | "widows-care";
  createdAt: string;
  geo_location: string;
  frequency: string;
  sponsorship_type: "full" | "partial";
  currency: string;
  txn_reference: string;
  transaction_id: string;
  recurringCharge?: {
    id: string;
    next_payment_date: string | null;
    amount: string;
    total_amount: string;
    status: "active" | "inactive";
    createdAt: string;
    updatedAt: string;
  };
};

export type DonationsResponse = TResponse<Donation>;
