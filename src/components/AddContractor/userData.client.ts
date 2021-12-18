import {
  BaseContractorData,
  Company,
  CombinedContractorData,
  Person,
  UserType,
} from "./userData.interface";

export const buildUserDataRequestBody = (
  values: CombinedContractorData
): Person | Company => {
  const { firstName, lastName, pesel, nip, type, image } = values;

  const baseRequestBody: Pick<
    BaseContractorData,
    "firstName" | "lastName" | "image"
  > = {
    firstName: firstName,
    lastName: lastName,
    image: image,
  };

  switch (type) {
    case UserType.PERSON:
      return {
        ...baseRequestBody,
        pesel,
        type: UserType.PERSON,
      };

    case UserType.COMPANY:
      return {
        ...baseRequestBody,
        nip,
        type: UserType.COMPANY,
      };

    default:
      throw new Error(`${type} is not supported`);
  }
};
