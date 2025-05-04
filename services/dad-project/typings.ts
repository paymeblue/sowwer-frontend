import { Response } from "services/typings";

export type InitiateDadDonationUnauthRequest = {
  sponsorship_type: string;
  geo_location: string;
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
};
export type InitiateDadDonationAuthRequest = {
  sponsorship_type: string;
  geo_location: string;
  amount: number;
  currency: string;
  frequency?: string;
};

export type InitateDadDonationUnathResponse = Response<{
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

export type InitateDadDonationAuthResponse = Response<{
  id: string;
  donor_id: string;
  amount: number;
  txn_reference: string;
  authorization_url: string;
  status: "in-progress" | "pending" | "failed" | "success";
  currency: string;
  createdAt: string;
}>;

export type VerifyDadDonationRequest = {
  txn_ref: string;
};
