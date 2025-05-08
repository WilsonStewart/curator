import { Hono } from "hono";
import { exhibit } from "./exhibit";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/exhibit", exhibit);

export default app;
