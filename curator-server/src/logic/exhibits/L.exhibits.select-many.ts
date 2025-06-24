import { db } from "@/lib/db";
import { exhibitsData, exhibitsTypeData_YoutubeChannels, exhibitsTypeData_YoutubeVideos } from "@/lib/table-aliases";
import { VExhibitsSelectManyQuery } from "@/schemas/validator-schema/v-exhibits";
import { eq, like } from "drizzle-orm";
import { z } from "zod";

export const LExhibitsSelectMany = async (query: z.infer<typeof VExhibitsSelectManyQuery>) => {
  let q = db
    .select()
    .from(exhibitsData)
    .leftJoin(exhibitsTypeData_YoutubeChannels, eq(exhibitsData.id, exhibitsTypeData_YoutubeChannels.exhibitId))
    .leftJoin(exhibitsTypeData_YoutubeVideos, eq(exhibitsData.id, exhibitsTypeData_YoutubeVideos.exhibitId))

  Object.keys(query).forEach(k => {
    switch (k) {
      case "nameLike": {
        q.where(like(exhibitsData.name, `%${query[k]}%`))
      }
      case "youtubeChannelHandle": {
        q.where(like(exhibitsTypeData_YoutubeChannels.youtubeChannelHandle, `%${query[k]}%`))
      }
    }
  });

  let r = await q.execute()

  return r;
};
