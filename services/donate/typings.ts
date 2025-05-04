import { Response } from "services/typings";

export type InitiateDonationUnauthRequest = {
  amount: number;
  currency: string;
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
  createAccount: boolean;
  frequency?: string;
  type: "widows-care" | "mission-care" | "general";
};

export type InitiateDonationAuthRequest = {
  amount: number;
  currency: string;
  frequency?: string;
  type: "widows-care" | "mission-care" | "general";
};

export type InitateDonationUnathResponse = Response<{
  donation: {
    id: string;
    donor_id: string;
    amount: number;
    txn_reference: string;
    authorization_url: string;
    status: "in-progress" | "pending" | "failed" | "success";
    currency: string;
    createdAt: string;
  };
}>;

export type InitateDonationAuthResponse = Response<{
  id: string;
  donor_id: string;
  amount: number;
  txn_reference: string;
  authorization_url: string;
  status: "in-progress" | "pending" | "failed" | "success";
  currency: string;
  createdAt: string;
}>;

export type VerifyDonationRequest = {
  txn_ref: string;
};
