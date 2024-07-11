export type OrphanageRegistrationRequest = {
  [key: string]: any;
  name: string;
  email: string;
  phone: string;
  address: string;
  number_of_ophans: string;
  cac_document: File;
  declaration: boolean;
};
