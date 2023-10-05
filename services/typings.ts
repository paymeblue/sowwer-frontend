import { GeneralDonor } from "@components/tables/ministry/MinistryGeneralDonorsTable";
import { Status } from "@lib/constants";

type BasicUserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  verificationStatus: boolean;
  role: string;
  type: string;
  createdAt: string;
};

type MinistryUserInfo = {
  ministry: Ministry;
};

type DonorUser = BasicUserInfo;

type MinistryUser = BasicUserInfo & MinistryUserInfo;

export type User = DonorUser | MinistryUser;

export type Token = {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
  refreshTokenexpiresIn: string;
  type: string;
};

export type Pagination = {
  currentPage: number;
  limit: number;
  totalItems: number;
  pages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
  paginationInfo: Pagination | null;
}

export interface TResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  paginationInfo: Pagination;
}

export type ErrorResponse = {
  data: {
    error: { statusCode: number; status: string; isOperational: boolean };
    message: string;
    stack: string;
    status: boolean;
  };
  status: number;
};

export type LoginResponse = Response<{
  user: User;
  token: Token;
}>;

export type SignupResponse = Response<{
  user: User;
  token: Token;
}>;

export type LoginRequest = {
  identifier: string;
  password: string;
  type: "ministry" | "donor";
};
export type RefreshTokenResponse = Response<{
  type: string;
  accessToken: string;
  expiresIn: string;
}>;
export type LoginData = {
  message: string;
  data: {
    user: User;
    token: Token;
  };
};

export type PublishOrDraftRequest = {
  id: string | null;
  query: "active" | "drafted";
};
export type PublishOrDraftResponse = Response<{
  id: string;
  title: string;
  targetAmount: string;
  category: string;
  link: string;
  cover_photo: string | null;
  description: string;
  status: string;
  deletedAt: string | null;
  createdAt: string;
}> & {
  paginationInfo: null;
};
export type MinistryProjectsRequest = {
  id?: string | null;
  page?: number;
  status?: "active" | "draft" | "completed" | "in-progress";
  // type?: "project" | "ministry";
};
export type MinistryGeneralDonationsRequest = {
  id?: string | null;
  page?: number;
};

export type Ministry = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cac_document: any;
  createdAt: string;
  state: string;
  updatedAt: string;
  website: string;
  ministryType: string;
  donation_description: string;
  postal_code: string;
  about: string;
  logo: string;
};

type MinistryProfileRequest1 = {
  [key: string]: any;
  id?: string;
  name?: string;
  address?: string;
  postalCode?: string;
  state?: string;
  about?: string;
};

type MinistryProfileRequest2 = {
  [key: string]: any;
  id?: string;
  email: string;
  phone: string;
};

type MinistryProfileRequest3 = {
  [key: string]: any;
  id?: string;
  logo: string;
};

export type MinistryProfileRequest =
  | MinistryProfileRequest1
  | MinistryProfileRequest2
  | MinistryProfileRequest3;

export type MinistryProfileResponse = Response<{
  id: string;
  title: string;
  targetAmount: string;
  createdAt: string;
  category: string;
  amountRaised: string;
  status: string;
  donors: number;
}>;

export type MinistrySignupRequest = {
  [key: string]: string | File;
  ministryType: string;
  ministryPhone: string;
  ministryEmail: string;
  ministryName: string;
  projectDescription: string;
  ministryState: string;
  ministrySocialLink: string;
  ministryAddress: string;
  cacDocument: File;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
};

export type InitiateDonationToProjectRequest = {
  id: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  anonymous: boolean;
  createAccount: boolean;
  confirm_password: string;
  amount: number;
  currency: "NGN" | "USD";
};

export type InitiateDonation = Response<{
  id: string;
  amount: number;
  txn_reference: string;
  status: string;
  createdAt: string;
}>;

export type ProjectData = {
  id: string;
  title: string;
  targetAmount: string;
  createdAt: string;
  category: string;
  amountRaised: string;
  status: string;
  donors: number;
};

export type ResultResponse = Response<{
  id: string;
  title: string;
  targetAmount: string;
  category: string;
  link: string;
  cover_photo: string | null;
  description: string | null;
  status: string;
  deletedAt: string | null;
  createdAt: string;
}>;
// type MinistryGeneralProjects = TResponse<{
//   id: string;
//   amount: string;
//   donorName: string;
//   donorType: string | null;
//   donorInterval: string | null;
//   createdAt: string;
//   donors: number;
//   request_payout: boolean;
//   paid: boolean;
// }>;
// type MinistryCompletedProjects = TResponse<{
//   id: string;
//   title: string;
//   targetAmount: string;
//   createdAt: string;
//   category: "widows" | "orphans" | "missions";
//   amountRaised: string;
//   status: string;
//   image: string | null;
//   donors: number;
//   request_payout: boolean;
//   paid: boolean;
// }>;
// export type MinistryProjectsResponse =
//   | MinistryCompletedProjects
//   | MinistryGeneralProjects;

export type MinistryProject = {
  id: string;
  title: string;
  targetAmount: string;
  createdAt: string;
  category: "widows" | "orphans" | "missions";
  amountRaised: string;
  status: Status;
  image: string | null | undefined;
  donors: number;
  request_payout: number;
  paid: boolean;
  donationPercent: string;
};

export type MinistryProjectsResponse = TResponse<MinistryProject>;

export type MinistryGeneralDonationsResponse = TResponse<{
  id: string;
  amount: string;
  donorName: string;
  donorType: string | null;
  donorInterval: string | null;
  request_payout: boolean;
  paid: boolean;
  createdAt: string;
}>;

export type ProjectResult = {
  data: ResultResponse;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  isSuccess: boolean;
};
export type CreateProjectRequest = {
  [key: string]: any;
  amount: number;
  category: string;
  title: string;
  cover_photo: File;
  description: string;
};
export type CreateProjectResponse = Response<{
  id: string;
  title: string;
  targetAmount: number;
  category: string;
  link: string;
  cover_photo: string | null;
  description: string | null;
  status: string;
  deletedAt: string | null;
  createdAt: string;
}>;

export type UpdateNotificationRequest = {
  projectDonation?: boolean;
  projectTarget?: boolean;
  generalDonation?: boolean;
  payout?: boolean;
  ongoingRecurringDonation?: boolean;
  recurringDonation?: boolean;
};

export type PlainResponse = {
  success: boolean;
  message: string;
};
export type NotificationResponse = Response<{
  id: string;
  projectDonation: boolean;
  projectTarget: boolean;
  generalDonation: boolean;
  payout: boolean;
  ongoingRecuringDonation: boolean;
  recuringDonation: boolean;
}>;
export type GetNotificationsResponse = Response<{
  id: string;
  user_id: string;
  projectDonation: boolean;
  projectTarget: boolean;
  generalDonation: Boolean;
  payout: boolean;
  ongoingRecuringDonation: boolean;
  recuringDonation: boolean;
}> & {
  paginationInfo: Pagination;
};

export type UpdateUserRequest = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};
export type UpdateUserPasswordRequest = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type UpdateUserResponse = Response<{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  verificationStatus: boolean;
  role: string;
  type: string;
  createdAt: string;
}> & {
  paginationInfo: number;
};

export type UpdateSocialLinksRequest = {
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
};

export type GetDonorsForProjectResponse = TResponse<{
  createdAt: string;
  id: string;
  name: string;
  amount: string;
}>;
export type DonorProjectDonationsResponse = TResponse<{
  id: string;
  title: string;
  category: "widows" | "orphans" | "widows";
  organisedBy: string;
  description: string | null;
  targetAmount: string;
  image: string | null;
  amountRaised: string;
  createdAt: string;
  payment_id: string;
  donorCount: string;
  amountDonated: string;
  donationPercent: string;
}>;
export type DonorGeneralDonations = {
  id: string;
  payment_id: string;
  plan_id: string;
  state: string;
  type: "one-time" | "recurring";
  logo: string | null;
  plan_status: string;
  organisedBy: string;
  description: string;
  donorCount: string;
  amountDonated: string;
  amountRaised: string;
  donationPercent: string;
  createdAt: string;
};
export type DonorGeneralDonationsResponse = TResponse<{
  id: string;
  payment_id: string;
  plan_id: string;
  state: string;
  type: "one-time" | "recurring";
  interval: "montly" | "quarterly" | "yearly";
  logo: string | null;
  plan_status: string;
  organisedBy: string;
  description: string;
  donorCount: string;
  amountDonated: string;
  amountRaised: string;
  donationPercent: string;
  createdAt: string;
}>;

export type ExploreCardData = {
  id: string;
  title: string;
  targetAmount: string;
  image: string | null;
  description: string | null;
  createdAt: string;
  category: "widows" | "orphans" | "missions";
  amountRaised: string;
  organisedBy: string;
  donationPercent: string;
  donors: number;
};
export type ExploreCardsResponse = ExploreCardData[] | undefined;
export type ExploreRequest = { page: number; query: string | null };
export type ExploreProjectsResponse = TResponse<{
  id: string;
  title: string;
  targetAmount: string;
  image: string | null;
  description: string | null;
  createdAt: string;
  category: "widows" | "orphans" | "missions";
  amountRaised: string;
  organisedBy: string;
  donationPercent: string;
  donors: number;
}>;
export type ExploreMinistriesResponse = TResponse<{
  id: string;
  name: string;
  state: string;
  logo: string | null;
  category: "church" | "organisation";
}>;
export type RegisterDonorRequest = {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm_password: string;
};

export type GetProjectDetailsResponse = Response<{
  id: string;
  title: string;
  targetAmount: string;
  category: string;
  image: string | null;
  description: string | null;
  link: string;
  organisedById: string;
  organisedBy: string;
  amountRaised: string;
  donors: string;
  donationPercent: string;
  logo: string | null;
}>;

export type GetMinistryDetailsResponse = Response<{
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  website: string;
  postal_code: string | null;
  cac_document: string;
  ministryType: string;
  createdAt: string;
  donation_description: string;
  about: string;
  logo: string;
}>;
export type SocialLinks = {
  id: string;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  linkedin: string | null;
  youtube: string | null;
  createdAt: string;
};
export type GetSocialLinksResponse = Response<{
  id: string;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  linkedin: string | null;
  youtube: string | null;
  createdAt: string;
}>;

export type WidowJoinSoowerResponse = {
  name: string;
  email: string;
  phone: string;
  address: string;
  christianity: boolean;
  declaration: boolean;
  duration: number;
  timestamp: string;
  registrar_name: string;
  registrar_email: string;
  registrar_phone: string;
  age: number;
  kids: boolean;
};
type WidowJoinSoowerRequest1 = {
  name: string;
  email: string;
  phone: string;
  address: string;
  christianity: boolean;
  declaration: boolean;
  duration: number;
  timestamp: string;
  age: number;
  kids: boolean;
};
type WidowJoinSoowerRequest2 = {
  name: string;
  email: string;
  phone: string;
  address: string;
  christianity: boolean;
  declaration: boolean;
  duration: number;
  timestamp: "month" | "year";
  registrar_name: string;
  registrar_email: string;
  registrar_phone: string;
  age: number;
  kids: boolean;
};
export type WidowJoinSoowerRequest =
  | WidowJoinSoowerRequest1
  | WidowJoinSoowerRequest2;

export type MissionaryJoinSoowerRequest1 = {
  status: "new" | "existing";
  name: string;
  email: string;
  phone: string;
  address: string;
  christianity: boolean;
  declaration: boolean;
  born_again: boolean;
  church: string;
  occupation: string;
  reason_about: string;
};
export type MissionaryRequest = {
  duration: number;
  timestamp: "month" | "year";
  service_area: string;
  affiliated_to_church: boolean;
};
export type MissionaryJoinSoowerRequest2 = MissionaryJoinSoowerRequest1 &
  MissionaryRequest;

export type MissionaryJoinSoowerRequest =
  | MissionaryJoinSoowerRequest1
  | MissionaryJoinSoowerRequest2;

export type GetBanksResponse = TResponse<{ name: string; code: string }>;
export type ResetPassowrdRequest = {
  token?: string | null;
  password: string;
  confirm_password: string;
};
export type VerifyAccountRequest = {
  account_number: string;
  bank_code: string;
};
export type AccountResponse = Response<{
  id: string;
  reference: string;
  accountNumber: string;
  accountName: string;
  bank_name: string;
  createdAt: string;
}>;
export type SaveAccountRequest = {
  reference?: string;
};
export type PayoutHistoryResponse = TResponse<{
  id: string;
  user_id: string;
  reference: string;
  project_title: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
}>;
export type MinistryDonationResponse = TResponse<GeneralDonor>;
export type CoverPhotoRequest = {
  id?: string | null;
  cover_photo: FormData;
};
export type EditProjectRequest = {
  [key: string]: any;
  id?: string | null;
  title?: string;
  amount?: number;
  description?: string;
  cover_photo?: string;
  category?: "orphans" | "widows" | "ministry";
};

export type VerifyPaymentRequest = {
  txn_id: string;
  txn_reference: string;
};
export type UserProfileResponse = Response<{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  verificationStatus: false;
  role: string;
  createdAt: string;
  updatedAt: string;
}>;
export type InitiateDonationToMinistryRequestUnauth = {
  id: string;
  payment_mode: "one-time" | "recurring";
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  anonymous: boolean;
  createAccount: boolean;
  amount: number;
  currency: string;
  interval: "monthly" | "quarterly" | "yearly";
  password: string;
  confirm_password: string;
};
export type InitiateDonationToMinistryRequestAuth = {
  id: string;
  payment_mode: "one-time" | "recurring";
  anonymous: boolean;
  amount: number;
  currency: string;
  interval: "monthly" | "quarterly" | "yearly";
};
export type DonationResponse = {
  id: string;
  amount: number;
  currency: string;
  donor_id: string;
  txn_reference: string;
  status: string;
  createdAt: string;
  plan_id: number;
};
export type InitiateDonationResponseAuth = Response<{
  id: string;
  amount: number;
  currency: string;
  donor_id: string;
  txn_reference: string;
  status: string;
  createdAt: string;
  plan_id: number;
}>;
export type InitiateDonationToProjectRequestAuth = {
  id: string;
  currency: "NGN" | "USD";
  amount: number;
  anonymous: boolean;
};
export type InitiateDonationResponseUnauth = Response<{
  user: BasicUserInfo;
  token: Token;
  donation: DonationResponse;
}>;
