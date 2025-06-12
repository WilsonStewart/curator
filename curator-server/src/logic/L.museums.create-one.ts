import { museums } from "@/db/drizzle-schema";
import { db } from "@/index";
import { eq } from "drizzle-orm";
import { VMuseumInsert } from "@/db/validator-schema";
import { z } from "zod";

export const LCreateOneMuseum = async (body: z.infer<typeof VMuseumInsert>) => {
  return await db.insert(museums).values(body).returning().execute();
};
