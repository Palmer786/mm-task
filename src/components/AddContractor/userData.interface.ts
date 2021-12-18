export enum UserType {
  PERSON = "person",
  COMPANY = "company",
}

export interface BaseContractorData {
  firstName: string;
  lastName: string;
  image: string;
  type: UserType;
}

export interface Person extends BaseContractorData {
  type: UserType.PERSON;
  pesel: string;
}

export interface Company extends BaseContractorData {
  type: UserType.COMPANY;
  nip: string;
}

export interface CombinedContractorData {
  firstName: string;
  lastName: string;
  type: UserType;
  image: string;
  pesel: string;
  nip: string;
}

export interface UserValidationError {
  firstName: string;
  lastName: string;
  type: string;
  pesel: string;
  nip: string;
}
