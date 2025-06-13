import { museums } from "@/schemas/drizzle-schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export const LMuseumsDeleteOne = async (id: string) => {
  return await db.delete(museums).where(eq(museums.id, id)).returning().execute();
};
