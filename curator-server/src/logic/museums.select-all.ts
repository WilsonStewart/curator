import { museums, users } from "@/db/schema";
import { db } from "@/index";

export const LSelectAllMuseums = async () => {
  return await db.select().from(museums).execute();
};
