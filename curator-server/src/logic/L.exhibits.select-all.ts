import { db } from "@/lib/db";
import { ETDYoutubeChannels, ETDYoutubeVideos, exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits";
import { eq } from "drizzle-orm";

export const LExhibitsSelectAll = async () => {
    let r = await db
        .select()
        .from(exhibits)
        .leftJoin((ETDYoutubeChannels), eq(exhibits.id, ETDYoutubeChannels.exhibitId))
        .leftJoin((ETDYoutubeVideos), eq(exhibits.id, ETDYoutubeVideos.exhibitId))
        .execute()

    return r
}