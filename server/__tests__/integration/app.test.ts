import request  from "supertest";
import app from "../../src/app";
import { errorMeg } from "../../src/utils/num_to_roman";

describe("GET /", () => {
  test("should return 200 status", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Home Page");
  });
});

describe("GET /romannumeral", () => {
  test("should return 400 status for missing query", async () => {
    const response = await request(app).get("/romannumeral");
    expect(response.status).toBe(400);
    expect(response.text).toBe(errorMeg);
  });

  test("should return 400 status for invalid query", async () => {
    const response = await request(app).get("/romannumeral?query=abc");
    expect(response.status).toBe(400);
    expect(response.text).toBe(errorMeg);
  });

  test("should return 200 status for valid query", async () => {
    const response = await request(app).get("/romannumeral?query=1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ input: "1", output: "I" });
  });
});
