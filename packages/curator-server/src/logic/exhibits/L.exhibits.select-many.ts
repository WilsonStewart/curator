import { db } from "@/lib/db";
import {
	et_youtubeChannels,
	et_youtubeVideos,
	exhibits,
} from "@/schemas/drizzle-schema/drizzle-schema.exhibits";
import { VExhibitsSelectManyQuery } from "@/schemas/validator-schema/v-exhibits";
import { eq, like } from "drizzle-orm";
import { z } from "zod";

export const LExhibitsSelectMany = async (
	query: z.infer<typeof VExhibitsSelectManyQuery>,
) => {
	let q = db
		.select()
		.from(exhibits)
		.leftJoin(et_youtubeChannels, eq(exhibits.id, et_youtubeChannels.exhibitId))
		.leftJoin(et_youtubeVideos, eq(exhibits.id, et_youtubeVideos.exhibitId));

	Object.keys(query).forEach((k) => {
		switch (k) {
			case "nameLike": {
				q.where(like(exhibits.name, `%${query[k]}%`));
			}
			case "youtubeChannelHandle": {
				q.where(like(et_youtubeChannels.youtubeChannelHandle, `%${query[k]}%`));
			}
		}
	});

	let r = await q.execute();

	return r;
};
