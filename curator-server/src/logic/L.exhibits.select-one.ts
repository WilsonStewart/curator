import { lazyRedisHash, r } from "@/lib/cache";
import { db } from "@/lib/db";
import { knownResourceIds } from "@/lib/known-resources";
import { ETYoutubeChannels, exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits";
import { VExhibitsInsert } from "@/schemas/validator-schema/v-exhibits";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const LExhibitsSelectOne = async (id: string, typeId?: string): z.infer<typeof VExhibitsInsert> => {
    if (!typeId) {
        typeId = await lazyRedisHash(
            {
                key: "exhibits:idToTypeId",
                field: "01JXJXZJCREM9Q5W9XX3WB1CF",
                asyncLoader: async () => (
                    (await db
                        .select({ id: exhibits.id, exhibitTypeId: exhibits.exhibitTypeId })
                        .from(exhibits)
                        .leftJoin(ETYoutubeChannels => ())
                        .where(eq(exhibits.id, id))
                        .execute())[0].exhibitTypeId
                )
            }
        ) ?? undefined
    }

    const lookupTypeId(knownResourceIds.exhibitsTypes)
}


r.hget("exhibits:idToTypeId", "01JXJXZJCREM9Q5W9XX3WB1CF")