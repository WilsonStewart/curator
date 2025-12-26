import { db } from "@/lib/db";
import {
	et_youtubeChannels,
	et_youtubeVideos,
	exhibits,
} from "@/schemas/drizzle-schema/drizzle-schema.exhibits";
import { eq } from "drizzle-orm";

export const LExhibitsSelectOne = async (id: string) => {
	let r = await db
		.select()
		.from(exhibits)
		.where(eq(exhibits.id, id))
		.leftJoin(et_youtubeChannels, eq(exhibits.id, et_youtubeChannels.exhibitId))
		.leftJoin(et_youtubeVideos, eq(exhibits.id, et_youtubeVideos.exhibitId))
		.execute();

	return r[0];
};
