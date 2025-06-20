import { db } from "@/lib/db";
import { exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits";

export const LExhibitsSelectAll = async () => {
    let r = await db
        .select()
        .from(exhibits)
        .execute()

    return r
}