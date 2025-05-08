import { Hono } from "hono";
import { db } from "..";
import { exhibits } from "../db/schema";

const exhibitRoutes = new Hono()

exhibitRoutes.get("/", async (c) => {
  return c.json(await db.select().from(exhibits));
});
