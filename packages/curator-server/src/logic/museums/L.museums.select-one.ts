import { db } from "@/lib/db";
import { museums } from "@/schemas/drizzle-schema/drizzle-schema.museums";
import { eq } from "drizzle-orm";

export const LMuseumsSelectOne = async (id: string) => {
	return await db.select().from(museums).where(eq(museums.id, id)).execute();
};
