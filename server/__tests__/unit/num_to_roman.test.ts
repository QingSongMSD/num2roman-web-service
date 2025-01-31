import { describe, expect, test } from "@jest/globals";
import { validateQuery, numToRoman } from "../../src/utils/num_to_roman";

const validQueries = ["1", "3999", "5", "88", "999", "1020", "020", "4000000000"];
const invalidQueries = ["", "abc", "1.1", "-1", " 4 ", "1  1", "  "];
const validNumToRoman = [
  {num: 1, roman: "I"},
  {num: 3999, roman: "MMMCMXCIX"},
  {num: 5, roman: "V"},
  {num: 88, roman: "LXXXVIII"},
  {num: 999, roman: "CMXCIX"},
  {num: 1020, roman: "MXX"},
];
const invalidNums = [0, 4000, -1, 4000000000];

describe("validateQuery", () => {
  test.each(validQueries)("should return true for valid query %s", (query) => {
    expect(validateQuery(query)).toBe(true);
  });

  test.each(invalidQueries)("should return false for invalid query %s", (query) => {
    expect(validateQuery(query)).toBe(false);
  });
});

describe("numToRoman", () => {
  test.each(validNumToRoman)(
    "should return valid roman numeral $roman for number $num",
    ({num, roman}) => {
      expect(numToRoman(num)).toBe(roman);
    }
  );

  test.each(invalidNums)("should throw error for invalid number %s", (num) => {
    expect(() => numToRoman(num)).toThrow();
  });
});
