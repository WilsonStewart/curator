import { db } from "@/lib/db"
import { knownTypeIds, TExhibitTypeId } from "@/lib/known-resources"
import { exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits"
import { VExhibitsUpdate } from "@/schemas/validator-schema/v-exhibits"
import { eq } from "drizzle-orm"
import { z } from "zod"

export const LExhibitsUpdateOne = async (opts: { id: string, exhibitTypeId: TExhibitTypeId, body: z.infer<typeof VExhibitsUpdate> }) => {
    let dataToSubmit = {
        exhibits: opts.body.exhibits ?? {},
        typeData: opts.body.typeData ?? {}
    }

    dataToSubmit.exhibits.updatedAt = dataToSubmit.exhibits.updatedAt ?? new Date().toISOString()

    let r = {}

    if (opts.body.exhibits) {
        r = {
            ...r, ...{
                exhibits: (await db
                    .update(exhibits)
                    .set(opts.body.exhibits)
                    .where(eq(exhibits.id, opts.id))
                    .returning()
                    .execute())[0]
            }
        }
    }
    if (opts.body.typeData) {
        r = {
            ...r, ...{
                exhibits: (await db
                    .update(knownTypeIds.exhibits.byId[opts.exhibitTypeId].table)
                    .set(opts.body.typeData)
                    .where(eq(knownTypeIds.exhibits.byId[opts.exhibitTypeId].table.exhibitId, opts.id))
                    .returning()
                    .execute())[0]
            }
        }
    }
    return r
}