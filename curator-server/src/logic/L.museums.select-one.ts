import { museums, users } from "@/db/schema";
import { db } from "@/index";
import { eq } from "drizzle-orm";

export const LSelectOneMuseum = async (eid: string) => {
  return await db.select().from(museums).where(eq(museums.eid, eid)).execute();
};
