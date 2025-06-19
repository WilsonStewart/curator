import { db } from "@/lib/db";
import { knownTypeIds, TExhibitTypeId } from "@/lib/known-resources";
import { exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export const LExhibitsSelectOne = async (id: string, typeId: TExhibitTypeId) => {
    const typeData = alias(knownTypeIds.exhibits[typeId].table, "typeData")

    let r = await db
        .select()
        .from(exhibits)
        .where(eq(exhibits.id, id))
        .leftJoin((typeData), eq(exhibits.id, typeData.exhibitId))
        .execute()

    return r[0]
}