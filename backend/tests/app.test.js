const request = require("supertest");

const { createApp } = require("../src/app");

describe("backend health and metrics endpoints", () => {
  const app = createApp();

  it("returns health information", async () => {
    const response = await request(app).get("/healthz");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      service: "backend",
    });
  });

  it("returns prometheus metrics", async () => {
    const response = await request(app).get("/metrics");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("three_tier_backend_http_requests_total");
  });
});
