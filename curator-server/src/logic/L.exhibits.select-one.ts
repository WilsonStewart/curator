import { typeIdLookup } from "@/lib/cache";
import { db } from "@/lib/db";
import { TExhibitTypeId } from "@/lib/known-resources";
import { ETYoutubeChannels, ETYoutubeVideos, exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits";
import { VExhibitsInsert } from "@/schemas/validator-schema/v-exhibits";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const LExhibitsSelectOne = async (id: string, typeId?: string) => {
    let t = <TExhibitTypeId>""
    if (!typeId) {
        let t = await typeIdLookup(
            {
                key: "exhibits:idToTypeId",
                field: "01JXJXZJCREM9Q5W9XX3WB1CF",
                asyncLoader: async () => (
                    (await db
                        .select({ id: exhibits.id, exhibitTypeId: exhibits.exhibitTypeId })
                        .from(exhibits)

                        .where(eq(exhibits.id, id))
                        .execute())[0].exhibitTypeId
                )
            }
        ) ?? undefined
    }

    // const lookupTypeId = (knownResourceIds.exhibitsTypes) => { }

    let lookup = {
        "01JXJY0510HN94TB4Z4S9C5ZKM": ETYoutubeChannels,
        "01JXJXZJCREM9Q5W9XX3WB1C13": ETYoutubeVideos
    }

    let bob = await db.select().from(exhibits).leftJoin((lookup[t]), eq(exhibits.id, lookup[t].exhibitId)).execute()
    console.log(bob)
}