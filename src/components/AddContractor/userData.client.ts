import {
  Base,
  Company,
  DataToTransform,
  Person,
  UserType,
} from "./userData.interface";

export const buildRequestBody = (values: DataToTransform): Person | Company => {
  const { firstName, lastName, pesel, nip, type, image } = values;

  const baseRequestBody: Pick<Base, "firstName" | "lastName" | "image"> = {
    firstName: firstName,
    lastName: lastName,
    image: image,
  };

  switch (type) {
    case UserType.PERSON:
      if (!pesel) {
        throw new Error("Pesel is required");
      }

      return {
        ...baseRequestBody,
        pesel,
        type: UserType.PERSON,
      };

    case UserType.COMPANY:
      if (!nip) {
        throw new Error("Nip is required");
      }

      return {
        ...baseRequestBody,
        nip,
        type: UserType.COMPANY,
      };

    default:
      throw new Error(`${type} is not supported`);
  }
};
