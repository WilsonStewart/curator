import { db } from "@/lib/db"
import { knownTypeIds, TExhibitTypeId } from "@/lib/known-resources"
import { ETDYoutubeChannels, exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits"
import { VExhibitsUpdate } from "@/schemas/validator-schema/v-exhibits"
import { eq } from "drizzle-orm"
import { z } from "zod"

export const LExhibitsUpdateOne = async (
    opts: {
        id: string,
        exhibitTypeId: TExhibitTypeId,
        body: z.infer<typeof VExhibitsUpdate>,
    }
) => {

    let TDTable = knownTypeIds.exhibits.byId[opts.exhibitTypeId].table

    if (opts.body.data || opts.body.typeData) {
        let dataToSubmit = {
            data: opts.body.data ?? {},
            typeData: opts.body.typeData ?? {}
        }

        dataToSubmit.data.updatedAt = dataToSubmit.data.updatedAt ?? new Date().toISOString()

        let r = {}

        r = {
            ...r, ...{
                exhibits: (await db
                    .update(exhibits)
                    .set(dataToSubmit.data)
                    .where(eq(exhibits.id, opts.id))
                    .returning()
                    .execute())[0]
            }
        }

        if (opts.body.typeData) {
            r = {
                ...r, ...{
                    exhibits: (await db
                        .update(TDTable)
                        .set(dataToSubmit.typeData)
                        .where(eq(TDTable.exhibitId, opts.id))
                        .returning()
                        .execute())[0]
                }
            }
        }
        return r
    }
    else { return { message: "nothing" } }
}