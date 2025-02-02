import { fireEvent, render, screen } from "@testing-library/react";
import { HomePage, inputError, UNKNOWN_ERROR } from "./home-page";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

global.fetch = vi.fn();

describe("HomePage", () => {
  beforeEach(() => {
    (global.fetch as ReturnType<typeof vi.fn>).mockReset();
  });
  afterEach(() => {
    (global.fetch as ReturnType<typeof vi.fn>).mockClear();
  });

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

  it("should display the Roman numeral when the convert successes", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ output: "XII" }),
    });

    render(<HomePage />);
    const textField = screen.getByRole("textbox");
    fireEvent.change(textField, { target: { value: "12" } });
    const button = screen.getByRole("button", { name: /convert/i });
    fireEvent.click(button);
    expect(await screen.findByText("XII")).toBeTruthy();
  });

  it("should display an error message when the convert fails with an error message", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Invalid input" }),
    });

    render(<HomePage />);
    const textField = screen.getByRole("textbox");
    // Bypass the validation check at the client side
    fireEvent.change(textField, { target: { value: "123" } });
    const button = screen.getByRole("button", { name: /convert/i });
    fireEvent.click(button);
    expect(await screen.findByText("Invalid input")).toBeTruthy();
  });

  it("should display unknown error when the server failed without error message", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      text: async () => UNKNOWN_ERROR,
    });

    render(<HomePage />);
    const textField = screen.getByRole("textbox");
    fireEvent.change(textField, { target: { value: "123" } });
    const button = screen.getByRole("button", { name: /convert/i });
    fireEvent.click(button);
    expect(await screen.findByText(UNKNOWN_ERROR)).toBeTruthy();
  });

  it("should display unknown error  when network fails", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error());

    render(<HomePage />);
    const textField = screen.getByRole("textbox");
    fireEvent.change(textField, { target: { value: "123" } });
    const button = screen.getByRole("button", { name: /convert/i });
    fireEvent.click(button);
    expect(await screen.findByText(UNKNOWN_ERROR)).toBeTruthy();
  });
});
