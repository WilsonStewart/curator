import { Hono } from "hono";
import { exhibitRoutes } from "@/routes/exhibit-routes";
import { userRoutes } from "@/routes/user-routes";

export const api = () => {
  const server = new Hono();

  server.get("/", (c) => {
    return c.text("Hello Hono!");
  });

  server.route("/exhibit", exhibitRoutes);
  server.route("/users", userRoutes)
};
