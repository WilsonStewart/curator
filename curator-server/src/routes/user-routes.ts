import { Hono } from "hono";
import { db } from "..";
import { users } from "../db/schema";

const userRoutes = new Hono()

userRoutes.get("/", async (c) => {
  return c.json(await db.select().from(users));
});
