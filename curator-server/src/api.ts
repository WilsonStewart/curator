import { Hono } from "hono";
import { exhibitRoutes } from "@/routes/exhibit-routes";

export const api = () => {
  const server = new Hono();

  server.get("/", (c) => {
    return c.text("Hello Hono!");
  });

  server.route("/exhibit", exhibitRoutes);
};
