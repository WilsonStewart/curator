import { museums } from "@/schemas/drizzle-schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export const LMuseumsSelectOne = async (id: string) => {
  return await db.select().from(museums).where(eq(museums.id, id)).execute();
};
