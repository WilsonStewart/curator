import { museums, users } from "@/schemas/drizzle-schema";
import { db } from "@/index";
import { eq } from "drizzle-orm";

export const LMuseumsSelectOne = async (id: string) => {
  return await db.select().from(museums).where(eq(museums.id, id)).execute();
};
