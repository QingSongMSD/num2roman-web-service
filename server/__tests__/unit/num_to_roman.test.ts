import { describe, expect, test } from "@jest/globals";
import { validateQuery, numToRoman } from "../../src/utils/num_to_roman";

const validQueries = ["1", "3999", "5", "88", "999", "1020", "020", "4000000000"];
const invalidQueries = ["", "abc", "1.1", "-1", " 4 ", "1  1", "  "];
const validNumbers = [1, 3999, 5, 88, 999, 1020];
const invalidNumbers = [0, 4000, -1, 4000000000];

describe("validateQuery", () => {
  test.each(validQueries)("should return true for valid query %s", (query) => {
    expect(validateQuery(query)).toBe(true);
  });

  test.each(invalidQueries)("should return false for invalid query %s", (query) => {
    expect(validateQuery(query)).toBe(false);
  });
});

describe("numToRoman", () => {
  test.each(validNumbers)("should return valid roman numeral for number %s", (num) => {
    expect(numToRoman(num)).toBeTruthy();
  });

  test.each(invalidNumbers)("should throw error for invalid number %s", (num) => {
    expect(() => numToRoman(num)).toThrow();
  });
});
