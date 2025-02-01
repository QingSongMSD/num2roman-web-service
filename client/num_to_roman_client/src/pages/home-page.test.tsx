import { render, screen } from "@testing-library/react";
import { HomePage } from "./home-page";
import { expect, jest, test } from "@jest/globals";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("HomePage", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(JSON.stringify({ output: "I" }));
    });

    test("renders the homepage", () => {
        render(<HomePage />);
        expect(screen.getByTestId("homepage-heading")).toBeTruthy();
    });

});

