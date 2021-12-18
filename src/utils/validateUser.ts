import {
  UserType,
  UserValidationError,
} from "../components/AddContractor/userData.interface";
import isValidPesel from "../utils/isValidPesel";
import isValidNip from "../utils/isValidNip";

export const validateUser = (
  firstName: string,
  lastName: string,
  type: UserType,
  nip: string,
  pesel: string
) => {
  let userValidationError: UserValidationError = {
    firstName: "",
    lastName: "",
    type: "",
    nip: "",
    pesel: "",
  };
  let isUserValid = false;

  if (!firstName) {
    userValidationError.firstName = "Imię jest wymagane";
  } else if (firstName.length < 3) {
    userValidationError.firstName = "Imię powinno mieć minimum 3 znaki";
  } else if (firstName.length > 20) {
    userValidationError.firstName =
      "Imię nie powinno mieć wiecej niż 20 znaków";
  }

  if (!lastName) {
    userValidationError.lastName = "Nazwisko jest wymagane";
  } else if (lastName.length < 3) {
    userValidationError.lastName = "Nazwisko powinno mieć minimum 3 znaki";
  } else if (lastName.length > 20) {
    userValidationError.lastName =
      "Nazwisko nie powinno mieć wiecej niż 20 znaków";
  }

  if (!type) {
    userValidationError.type = "Typ jest wymagany";
  } else if (type !== UserType.PERSON && type !== UserType.COMPANY) {
    userValidationError.type = "Nieobsługiwany typ użytkownika";
  }

  if (type === UserType.PERSON && !isValidPesel(pesel)) {
    userValidationError.pesel = "Niepoprawny pesel";
  }

  if (type === UserType.COMPANY && !isValidNip(nip)) {
    userValidationError.nip = "Niepoprawny nip";
  }

  if (Object.values(userValidationError).every((error) => !error)) {
    isUserValid = true;
  }
  return { userValidationError, isUserValid };
};
