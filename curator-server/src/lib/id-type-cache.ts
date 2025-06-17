import { r } from "@/lib/cache"
import { MtoMS } from "@/lib/converters"
import { db } from "@/lib/db"
import { exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits"

export const refreshExhibitIdTypeIdCache = async (): Promise<void> => {
    let doRefresh = false

    let updatedAt = await r.hget("exhibits:idTypeId", "updatedAt")
    if (updatedAt) { if ((Date.now() - parseInt(updatedAt)) > MtoMS(5)) { doRefresh = true } }
    else { doRefresh = true }

    if (doRefresh) {
        let dbResults = await db
            .select({ id: exhibits.id, exhibitTypeId: exhibits.exhibitTypeId })
            .from(exhibits)
            .execute()

        await r.hset(
            "exhibits:idTypeId",
            Object.fromEntries(
                dbResults.map(({ id, exhibitTypeId }) => { return [id, exhibitTypeId] })
            )
        )

        await r.hset(
            "exhibits:idTypeId",
            { updatedAt: Date.now() }
        )
    }
}