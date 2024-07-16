export type OrphanageRegistrationRequest = {
  [key: string]: any;
  name: string;
  email: string;
  phone: string;
  address: string;
  number_of_orphans: string;
  cac_document: File;
  declaration: boolean;
  location: string;
};
