import { museums } from "@/db/drizzle-schema";
import { db } from "@/index";
import { eq } from "drizzle-orm";

export const LDeleteOneMuseum = async (eid: string) => {
  return await db.delete(museums).where(eq(museums.eid, eid)).returning().execute();
};
