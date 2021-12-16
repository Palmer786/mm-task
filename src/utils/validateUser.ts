import { UserType } from "../components/AddContractor/userData.interface";
import isValidPesel from "../utils/isValidPesel";
import isValidNip from "../utils/isValidNip";

export const validateUser = (
  firstName: string,
  lastName: string,
  type: UserType,
  nip: string,
  pesel: string
) => {
  if (firstName.length < 3) return "Imię powinno mieć minimum 3 znaki";

  if (firstName.length > 20)
    return "Imię powinno mieć nie więcej niż 20 znaków";

  if (lastName.length < 3) return "Nazwisko powinno mieć minimum 3 znaki";

  if (lastName.length > 20)
    return "Nazwisko powinno mieć nie więcej niż 20 znaków";

  if (!type) return "Wybierz typ";

  if (type === UserType.PERSON && !isValidPesel(pesel))
    return "Niepoprawny pesel";

  if (type === UserType.COMPANY && !isValidNip(nip)) return "Niepoprawny nip";

  return "";
};
