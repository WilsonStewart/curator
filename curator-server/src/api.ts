import { OpenAPIHono } from "@hono/zod-openapi";

export const api = () => {
  const server = new OpenAPIHono();

  server.get("/", (c) => {
    return c.text("Hello Hono!");
  });
};
