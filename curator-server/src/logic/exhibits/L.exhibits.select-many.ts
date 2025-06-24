import { db } from "@/lib/db";
import { ETDYoutubeChannels, ETDYoutubeVideos, exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits";
import { VExhibitsSelectManyQuery } from "@/schemas/validator-schema/v-exhibits";
import { eq, like } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { z } from "zod";

export const LExhibitsSelectMany = async (query: z.infer<typeof VExhibitsSelectManyQuery>) => {
  console.log(query)

  const data = alias(exhibits, "data")
  const typeData_YoutubeChannels = alias(ETDYoutubeChannels, "typeData_YoutubeChannels")
  const typeData_YoutubeVideos = alias(ETDYoutubeVideos, "typeData_YoutubeVideos")

  let q = db
    .select()
    .from(data)
    .leftJoin(typeData_YoutubeChannels, eq(data.id, typeData_YoutubeChannels.exhibitId))
    .leftJoin(typeData_YoutubeVideos, eq(data.id, typeData_YoutubeVideos.exhibitId))

  if (Object.keys(query).length > 0) {
    Object.keys(query).forEach(k => {
      switch (k) {
        case "nameLike": {
          q.where(like(data.name, `%${query[k]}%`))
        }
        case "youtubeChannelHandle": {
          q.where(like(typeData_YoutubeChannels.youtubeChannelHandle, `%${query[k]}%`))
        }
      }
    });
  }

  console.log(q)

  let r = await q.execute()

  return r;
};
