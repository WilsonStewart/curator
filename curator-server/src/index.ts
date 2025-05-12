import "dotenv/config";
import { Hono } from "hono";
import { exhibit } from "./exhibit";
import { drizzle } from "drizzle-orm/node-postgres";

const app = new Hono();
export const db = drizzle(process.env.DATABASE_URL!);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/exhibit", exhibit);

export default app;
