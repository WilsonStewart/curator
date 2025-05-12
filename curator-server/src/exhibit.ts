import { Hono } from "hono";
import { db } from ".";
import { exhibits } from "./db/schema";

export const exhibit = new Hono().get("/", async (c) => {
  return c.json(await db.select().from(exhibits));
});
