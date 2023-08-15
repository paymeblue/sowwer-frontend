export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  verificationStatus: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  ministry: Ministry;
};

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
}>;

export type LoginRequest = {
  identifier: string;
  password: string;
  type: "ministry" | "donor";
};

export type LoginData = {
  message: string;
  data: {
    user: User;
    token: Token;
  };
};

export type PublishOrDraft = {
  id: string | null;
  query: string;
};

export type MinistryProjectsRequest = {
  id?: string;
  page?: number;
};

export type Ministry = {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cac_document: boolean | string;
  createdAt: string;
  state: string;
  updatedAt: string;
  website: string;
  ministryType: string;
};

type MinistryProfileRequest1 = {
  id?: string;
  name: string;
  address: string;
  postalCode: string;
  state: string;
  about: string;
};

type MinistryProfileRequest2 = {
  id?: string;
  email: string;
  phone: string;
};

export type MinistryProfileRequest =
  | MinistryProfileRequest1
  | MinistryProfileRequest2;

// id: string;
// user_id: string;
// name: string;
// email: string;
// phone: string;
// address: string;
// description: string;
// state: string;
// website: string;
// postal_code: string;
// cac_document: string;
// ministryType: string;
// createdAt: string;
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
  ministryType: string;
  ministryPhone: string;
  ministryEmail: string;
  ministryName: string;
  projectDescription: string;
  ministryState: string;
  ministrySocialLink: string;
  ministryAddress: string;
  cacDocument: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
};

export type DonorSignupRequest = {
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
};

export type DonorSignupResponse = Response<{
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

export type MinistryProjectsResponse = TResponse<{
  id: string;
  title: string;
  targetAmount: string;
  createdAt: string;
  category: string;
  amountRaised: string;
  status: string;
  donors: number;
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
  amount: number;
  category: string;
  title: string;
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

export type UpdateNotificationResponse = {
  success: boolean;
  message: string;
};
export type NotificationResponse = {
  id: string;
  user_id: string;
  projectDonation: boolean;
  projectTarget: boolean;
  generalDonation: boolean;
  payout: boolean;
  ongoingRecuringDonation: boolean;
  recuringDonation: boolean;
};
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
  website: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
};

export type UpdateSocialLinksResponse = {
  success: boolean;
  message: string;
};
