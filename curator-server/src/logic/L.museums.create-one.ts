import { museums } from "@/schemas/drizzle-schema";
import { db } from "@/index";
import { z } from "zod";
import { VMuseumInsert } from "@/schemas/validator-schema";

export const LMuseumsCreateOne = async (
  body: z.infer<typeof VMuseumInsert>
) => {
  return await db.insert(museums).values(body).returning().execute();
};
