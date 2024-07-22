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

export interface AdminWidowHistory {
  id: string;
  state_of_origin: string;
  registrar_email: string;
  registrar_name: string;
  next_of_kin_name: string;
  next_of_kin_phone: string;
  createdAt: string;
}

export interface AdminMissionHistory {
  id: string;
  church: string;
  occupation: string;
  service_area: string;
  next_of_kin_name: string;
  next_of_kin_phone: string;
  createdAt: string;
}
export interface AdminOrphanageHistory {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cac_document: string;
  declaration: string;
  number_of_orphans: string;
  location: string;
  created_at: string;
}

export interface AdminProjectHistory {
  id: string;
  title: string;
  ministryName: string;
  target_amount: string;
  created_at: string;
  category: string;
  status: string;
  amount_raised: string;
  donors: number;
}

export interface AdminProjectTestimony {
  id: string;
  title: string;
  number_of_people_impacted: string;
  cover_photo: string;
  story: string;
  status: string;
  amount_raised: string;
  created_at: string;
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

export interface GetAdminRegistryRequest {
  limit: number;
  page: number;
}
export interface GetAdminProjectRequest {
  limit: number;
  page: number;
}
export interface GetAdminProjectTestiomoniesRequest {
  limit: number;
  page: number;
  projectId: string;
}

export interface CreateAdminTestimonyRequest {
  [key: string]: string | File | number | any;
  project_id: string;
  title: string;
  cover_photo: File;
  story: string;
  status: "draft" | "published";
  number_of_people_impacted: number;
  amount_raised: number;
}

export interface UpdateAdminTestimonyRequest {
  id: string;
  project_id: string;
  title: string;
  status: string;
  number_of_people_impacted: string;
  amount_raised: string;
}

export interface DeleteAdminTestimonyRequest {
  id: string;
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
export type GetAdminWidowsResponse = TResponse<AdminWidowHistory>;
export type GetAdminMissionsResponse = TResponse<AdminMissionHistory>;
export type GetAdminOrphanageResponse = TResponse<AdminOrphanageHistory>;
export type GetAdminProjectsResponse = TResponse<AdminProjectHistory>;
export type GetAdminProjectTestimoniesResponse =
  TResponse<AdminProjectTestimony>;
