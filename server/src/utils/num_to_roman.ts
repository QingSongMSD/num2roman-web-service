export const errorMeg =
  "Invalid input. Please provide an integer number between 1 and 3999.";

// check if the query only contains digits and can be successfully parsed into an integer
export const validateQuery = (query: string): boolean => {
  return /^\d+$/.test(query) && !isNaN(parseInt(query));
};

export const numToRoman = (num: number): string => {
  if (num < 1 || num > 3999) {
    throw new Error(errorMeg);
  }
  const roman: string[] = [
    "I",
    "IV",
    "V",
    "IX",
    "X",
    "XL",
    "L",
    "XC",
    "C",
    "CD",
    "D",
    "CM",
    "M",
  ];
  const decimal: number[] = [
    1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000,
  ];
  let result: string = "";
  for (let i = roman.length - 1; i >= 0; i--) {
    while (num >= decimal[i]) {
      num -= decimal[i];
      result += roman[i];
    }
  }
  return result;
};
