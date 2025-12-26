import { db } from "@/lib/db";
import { metadata } from "@/schemas/drizzle-schema/drizzle-schema.metadata";
import { eq } from "drizzle-orm";

export const LInitializeGetStatus = async () => {
	let r = await db
		.select({
			isInitialized: metadata.isInitialized,
			isBuiltinDataClean: metadata.isBuiltinDataClean,
		})
		.from(metadata)
		.where(eq(metadata.id, "curatorMetadata"))
		.execute();

	return r[0];
};
