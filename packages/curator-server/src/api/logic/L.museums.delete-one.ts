// import { db } from "@/lib/db";
// import { museums } from "@/schemas/drizzle-schema/drizzle-schema.museums";
// import { eq } from "drizzle-orm";

// export const LMuseumsDeleteOne = async (id: string) => {
// 	return await db
// 		.delete(museums)
// 		.where(eq(museums.id, id))
// 		.returning()
// 		.execute();
// };
