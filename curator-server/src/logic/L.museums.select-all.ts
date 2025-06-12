import { museums, users } from "@/db/drizzle-schema";
import { db } from "@/index";

export const LSelectAllMuseums = async () => {
  return await db.select().from(museums).execute();
};
