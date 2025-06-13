import { museums, users } from "@/schemas/drizzle-schema";
import { db } from "@/index";

export const LMuseumsSelectAll = async () => {
  return await db.select().from(museums).execute();
};
