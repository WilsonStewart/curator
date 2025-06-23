import { db } from "@/lib/db";
import { knownTypeIds, TExhibitTypeId } from "@/lib/known-resources";
import { exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export const LExhibitsSelectOne = async (id: string, typeId: TExhibitTypeId) => {
    const data = alias(exhibits, "data")
    const typeData = alias(knownTypeIds.exhibits.byId[typeId].table, "typeData")

    let r = await db
        .select()
        .from(data)
        .where(eq(data.id, id))
        .leftJoin((typeData), eq(data.id, typeData.exhibitId))
        .execute()

    return r[0]
}