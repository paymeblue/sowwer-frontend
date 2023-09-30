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
  ministry?: Ministry;
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

type MinistryUserInfo = {
  ministry: Ministry;
};

type DonorUser = BasicUserInfo;

type MinistryUser = BasicUserInfo & MinistryUserInfo;

export type User = DonorUser | MinistryUser;
