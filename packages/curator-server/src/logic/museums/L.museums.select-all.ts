import { db } from "@/lib/db";
import { museums } from "@/schemas/drizzle-schema/drizzle-schema.museums";

export const LMuseumsSelectAll = async () => {
	return await db.select().from(museums).execute();
};
