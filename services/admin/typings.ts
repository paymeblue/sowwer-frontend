import { Response, TResponse } from "services/typings";

export interface AdminMinistryBase {
  id: string;
  name: string;
  category: string;
  email: string;
  phone: string;
  verificationStatus: boolean;
  createdAt: string;
}

export interface AdminMinistry extends AdminMinistryBase {
  address: string;
  state: string;
  cac_document: string;
  utility_bill: string;
  donation_description: string;
  website: string;
  logo: string | null;
}
export interface AdminMinistryAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  verificationStatus: boolean;
  role: string;
  type: string;
  createdAt: string;
}

export interface AdminPayoutHistory {
  id: string;
  payout_date: string;
  amount: string;
  status: "successful" | "failed";
  createdAt: string;
  donor_count: number;
  ministry_name: string;
  project_title: string;
  project_goal: number;
}

export interface AdminPayoutHistoryGeneral {
  id: string;
  payout_date: string;
  amount: string;
  status: "successful" | "failed";
  createdAt: string;
  ministry_name: string;
}

export interface GetAdminMinistriesRequest {
  status: "verified" | "unverified";
  page: number;
  limit: number;
}

export interface VerifyMinistryRequest {
  id: string;
}

export interface GetAdminMinistryRequest {
  id: string;
}

export interface GetAdminPayoutHistoryRequest {
  type: "ministry" | "project";
  page: number;
  limit: number;
}

export type AdminUploadCacDocumentRequest = {
  [key: string]: File | undefined | string;
  cacDocument?: File;
  utilityBill?: File;
  id: string;
};

// Responses
export type GetAdminMinistriesResponse = TResponse<AdminMinistryBase>;
export type GetAdminMinistryResponse = Response<AdminMinistry>;
export type GetAdminMinistryAdministratorResponse =
  Response<AdminMinistryAdmin>;
export type GetAdminPayoutHistoryResponse = TResponse<AdminPayoutHistory>;
