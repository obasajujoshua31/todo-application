import request from "supertest";
import app from "../../app";

describe("User Controller Test", () => {
  it("should return a statuscode of 200 for the home page", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
