import { db } from "@/index";
import { updateModifiedDateBody } from "@/lib/update-modified-date-body";
import { museums } from "@/schemas/drizzle-schema";
import { VMuseumUpdate } from "@/schemas/validator-schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const LMuseumsUpdateOne = async (id: string, body: z.infer<typeof VMuseumUpdate>) => {
    return await db
        .update(museums)
        .set(updateModifiedDateBody(body))
        .where(eq(museums.id, id))
        .returning()
        .execute()
};