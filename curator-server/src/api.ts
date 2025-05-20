import { OpenAPIHono } from "@hono/zod-openapi";

export const api = new OpenAPIHono();

api.get("/", (c) => {
  return c.text("Hello Hono!");
});
