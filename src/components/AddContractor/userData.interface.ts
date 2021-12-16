export enum UserType {
  PERSON = "person",
  COMPANY = "company",
}

export interface Base {
  firstName: string;
  lastName: string;
  image: string;
  type: UserType;
}

export interface Person extends Base {
  type: UserType.PERSON;
  pesel: string;
}

export interface Company extends Base {
  type: UserType.COMPANY;
  nip: string;
}

export interface DataToTransform {
  firstName: string;
  lastName: string;
  type: UserType;
  image: string;
  pesel?: string;
  nip?: string;
}
