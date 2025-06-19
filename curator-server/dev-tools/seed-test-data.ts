import { db } from "@/lib/db"
import { knownResourceIds } from "@/lib/known-resources"
import { ETDYoutubeChannels, exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits"

const seedTestData = async () => {
    await db.transaction(async (tx) => {
        let insertToMainTable = await tx
            .insert(exhibits)
            .values(
                {
                    name: "dave's garage - youtube channel",
                    createdBy: knownResourceIds.users.SYSTEM,
                    exhibitTypeId: "01JXJXZJCREM9Q5W9XX3WB1C13",
                    museumId: knownResourceIds.musuems.DEFAULT_MUSEUM,
                    galleryId: knownResourceIds.galleries.ROOT
                }
            )
            .returning()
            .execute()

        let insertToTypeDataTable = await tx
            .insert(ETDYoutubeChannels)
            .values(
                {
                    name: "Dave's Garage",
                    youtubeId: "@DavesGarage",

                }
            )
    })

}