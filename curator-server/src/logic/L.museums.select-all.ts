import { museums } from "@/schemas/drizzle-schema";
import { db } from "@/lib/db";

export const LMuseumsSelectAll = async () => {
  return await db.select().from(museums).execute();
};
