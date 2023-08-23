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

export type PublishOrDraftRequest = {
  id: string | null;
  query: string;
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
  status?: "in-progress" | "active" | "drafted" | "completed";
};

export type Ministry = {
  id: string;
  userId: string;
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
  cacDocument: any;
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
  category: "widows" | "orphans" | "missions";
  amountRaised: string;
  status: string;
  image: string | null;
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

export type PlainResponse = {
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

export type GetDonorsForProjectResponse = TResponse<{
  createdAt: string;
  id: string;
  name: string;
  amount: string;
}>;
export type MinistryProjectDonorsResponse = TResponse<{
  title: string;
  category: "widows" | "orphans" | "widows";
  organisedBy: string;
  description: string | null;
  targetAmount: string;
  image: string | null;
  amountRaised: string;
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
export type ExploreProjectsRequest = { page: number; query: string | null };
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

export type RegisterDonorRequest = {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm_password: string;
};

export type GetProjectDetailsResponse = Response<{
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
}>;

export type GetMinistryDetailsResponse = Response<
  {
    id: string;
    user_id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    state: string;
    website: string;
    postal_code: string | null;
    cac_document: string;
    ministryType: string;
    createdAt: string;
  } & {
    paginationInfo: number;
  }
>;
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
  password_confirm: string;
};
export type VerifyAccountRequest = { account_number: string; bank_id: string };
export type AccountResponse = Response<{
  accountName: string;
  accountNumber: string;
  bank_name: string;
  createdAt: string;
  id: string;
}>;
export type PayoutHistoryResponse = TResponse<{}>;
export type MinistryDonationResponse = TResponse<{}>;
