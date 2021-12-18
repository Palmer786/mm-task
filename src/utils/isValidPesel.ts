const isValidPesel = (pesel: string) => {
  if (!pesel) return false;
  if (pesel.length !== 11) return false;

  let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  let controlNumber = +pesel.substring(10, 11);

  for (let i = 0; i < weight.length; i++) {
    sum += +pesel.substring(i, i + 1) * weight[i];
  }
  sum = sum % 10;
  return (10 - sum) % 10 === controlNumber;
};

export default isValidPesel;
