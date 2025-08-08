import { db } from "@/lib/db"
import { knownResourceIds, knownTypeIds } from "@/lib/known-resources"
import { et_youtubeChannels, et_youtubeVideos, exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits"

const seedTestData = async () => {
    try {
        await db.transaction(async (tx) => {
            let insertToMainTable = await tx
                .insert(exhibits)
                .values(
                    {
                        name: "dave's garage - youtube channel",
                        createdBy: knownResourceIds.users.SYSTEM,
                        exhibitTypeId: knownTypeIds.exhibits.byTableName.et_youtube_channel,
                        museumId: knownResourceIds.musuems.DEFAULT_MUSEUM,
                        galleryId: knownResourceIds.galleries.ROOT
                    }
                )
                .returning()
                .execute()

            let insertToTypeDataTable = await tx
                .insert(et_youtubeChannels)
                .values(
                    {
                        exhibitId: insertToMainTable[0].id,
                        name: "Dave's Garage",
                        youtubeChannelHandle: "@DavesGarage",
                    }
                )
        })
    } catch { }

    try {
        await db.transaction(async (tx) => {
            let insertToMainTable = await tx
                .insert(exhibits)
                .values(
                    {
                        name: "how I made task manager",
                        createdBy: knownResourceIds.users.SYSTEM,
                        exhibitTypeId: knownTypeIds.exhibits.byTableName.et_youtube_video,
                        museumId: knownResourceIds.musuems.DEFAULT_MUSEUM,
                        galleryId: knownResourceIds.galleries.ROOT
                    }
                )
                .returning()
                .execute()

            let insertToTypeDataTable = await tx
                .insert(et_youtubeVideos)
                .values(
                    {
                        exhibitId: insertToMainTable[0].id,
                        title: "how I made task manager",
                        youtubeId: "1234_taskman",
                        uploadDate: new Date()
                    }
                )
        })
    } catch { }

}

seedTestData()