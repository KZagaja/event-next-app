import index from "../../pages/api/event";
import { createMocks } from "node-mocks-http";
import { describe, expect, test } from "@jest/globals";

describe("unit test /api/event endpoint", () => {
  test("creating events with 201 response", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        lastName: "Batory",
        firstName: "Stefan",
        email: "stefan@batory.com",
        eventDate: new Date().toISOString(),
      },
    });

    await index(req, res);

    expect(res._getStatusCode()).toBe(201);
  });

  test("creating events with incomplete data", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        firstName: "Stefan",
        email: "stefan@batory.com",
        eventDate: new Date().toISOString(),
      },
    });

    await index(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  test("creating events with wrong email", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        lastName: "Batory",
        firstName: "Stefan",
        email: "stef'';;an@batory.com",
        eventDate: new Date().toISOString(),
      },
    });

    await index(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  test("get response with events", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await index(req, res);

    expect(res._getStatusCode()).toBe(200);
  });

  test("using wrong method test", async () => {
    const { req, res } = createMocks({
      method: "PATCH",
    });

    await index(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});
