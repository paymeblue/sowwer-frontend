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
  donation_description: string;
  website: string;
  logo: string | null;
}

export interface GetAdminMinistriesRequest {
  status: "verified" | "unverified";
  page: number;
  limit: number;
}

export interface VerifyMinistryRequest {
  id: string;
}

export interface GetAdminMinistry {
  id: string;
}

export type GetAdminMinistriesResponse = TResponse<AdminMinistryBase>;
export type GetAdminMinistryResponse = Response<AdminMinistry>;
