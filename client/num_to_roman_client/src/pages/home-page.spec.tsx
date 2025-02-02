import { fireEvent, render, screen } from "@testing-library/react";
import { HomePage, inputError } from "./home-page";
import { describe, expect, it } from "vitest";

describe("HomePage", () => {
  it("should render the home page", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", {
      name: /Roman numeral converter/i,
    });
    expect(heading).toBeTruthy();

    const textField = screen.getByRole("textbox");
    expect(textField).toBeTruthy();

    const button = screen.getByRole("button", { name: /convert/i });
    expect(button).toBeTruthy();
  });

  it("should not display an error message if the text field input is valid", () => {
    render(<HomePage />);
    const textField = screen.getByRole("textbox");
    fireEvent.change(textField, { target: { value: "" } });
    expect(screen.queryByText(inputError)).not.toBeTruthy();

    fireEvent.change(textField, { target: { value: "12" } });
    expect(screen.queryByText(inputError)).not.toBeTruthy();
  });

  it("should display an error message if the text field input is invalid", () => {
    render(<HomePage />);
    const textField = screen.getByRole("textbox");

    fireEvent.change(textField, { target: { value: "abc" } });
    expect(screen.getByText(inputError)).toBeTruthy();

    fireEvent.change(textField, { target: { value: "4000" } });
    expect(screen.getByText(inputError)).toBeTruthy();
  });
});
