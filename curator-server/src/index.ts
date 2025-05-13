import "dotenv/config";
import { Hono } from "hono";
import { exhibitRoutes } from "./routes/exhibit-routes";
import { drizzle } from "drizzle-orm/node-postgres";

const app = new Hono();
export const db = drizzle(process.env.DATABASE_URL!);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/exhibit", exhibitRoutes);

export default app;
