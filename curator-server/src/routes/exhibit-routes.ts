import { Hono } from "hono";
import { db } from "../index";
import { exhibits } from "../db/schema";

export const exhibitRoutes = new Hono();

exhibitRoutes.get("/", async (c) => {
  return c.json(await db.select().from(exhibits));
});
