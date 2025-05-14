import { OpenAPIHono } from "@hono/zod-openapi";
import { db } from "@/index";
import { exhibits } from "@/db/schema";

export const exhibitRoutes = new OpenAPIHono();

exhibitRoutes.get("/", async (c) => {
  return c.json(await db.select().from(exhibits));
});
