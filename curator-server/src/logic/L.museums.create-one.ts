import { museums } from "@/db/schema";
import { db } from "@/index";
import { eq } from "drizzle-orm";
import { VMuseumInsert } from "@/db/v-schema";
import { z } from "zod";

export const LCreateOneMuseum = async (body: z.infer<typeof VMuseumInsert>) => {
  return await db.insert(museums).values(body).returning().execute();
};
