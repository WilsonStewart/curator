import { OpenAPIHono } from "@hono/zod-openapi";
import { db } from "@/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { genUuid } from "@/util/uuid";

export const userRoutes = new OpenAPIHono();

//
// Create a user
//
userRoutes.post("/", async (c) => {
  const id = genUuid();
});

//
// Get all users
//
userRoutes.get("/", async (c) => {
  return c.json(await db.select().from(users));
});

//
// Get one user by db id
//
userRoutes.get("/:id", async (c) => {
  return c.json(
    await db
      .select()
      .from(users)
      .where(eq(users.id, c.req.param("id")))
  );
});

//
// Get one user by user's userId
//
userRoutes.get("/uid/:uid", async (c) => {
  return c.json(
    await db
      .select()
      .from(users)
      .where(eq(users.userId, c.req.param("uid")))
  );
});
