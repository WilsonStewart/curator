import { museums } from "@/db/schema";
import { db } from "@/index";
import { eq } from "drizzle-orm";
import { VMuseumCreate } from "@/db/v-schema";
import { z } from "zod";

export const LCreateOneMuseum = async (body: z.infer<typeof VMuseumCreate>) => {
    return await db.insert(museums).values(body).execute()
};
