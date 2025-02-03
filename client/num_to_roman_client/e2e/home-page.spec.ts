import { test, expect } from "@playwright/test";

// Make sure to start your server before running the tests
test.describe("e2e tests for Roman numeral converter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("should display the correct components, convert button disabled without input", async ({
    page,
  }) => {
    await expect(page.getByTestId("homepage-heading")).toContainText(
      "Roman numeral converter"
    );
    await expect(page.getByText("Enter a number")).toContainText(
      "Enter a number"
    );
    await expect(page.getByTestId("convert-button")).toContainText(
      "Convert to roman numeral"
    );
    await expect(page.getByTestId("convert-button")).toBeDisabled();
  });

  test("should convert number to Roman numeral", async ({ page }) => {
    await page.getByTestId("input-field").fill("1");
    await expect(page.getByTestId("convert-button")).not.toBeDisabled();
    await page.getByTestId("convert-button").click();
    await expect(page.getByTestId("output-field")).toContainText(
      "Roman Numeral: I"
    );
  });

  test("should display client error message and disable convert button for invalid input", async ({
    page,
  }) => {
    await page.getByTestId("input-field").fill("ss");
    await expect(page.getByTestId("convert-button")).toBeDisabled();
    await expect(
      page.getByText("Please provide an integer number between 1 and 3999.")
    ).toBeTruthy();
  });

  test("should display client error message and disable convert button for out of range input", async ({
    page,
  }) => {
    await page.getByTestId("input-field").fill("10000");
    await expect(page.getByTestId("convert-button")).toBeDisabled();
    await expect(
      page.getByText("Please provide an integer number between 1 and 3999.")
    ).toBeTruthy();
  });
});
