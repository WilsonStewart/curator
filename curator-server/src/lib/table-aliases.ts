import { ETDYoutubeChannels, ETDYoutubeVideos, exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits"
import { alias } from "drizzle-orm/pg-core"

export const exhibitsData = alias(exhibits, "data")
export const exhibitsTypeData_YoutubeChannels = alias(ETDYoutubeChannels, "typeData_YoutubeChannels")
export const exhibitsTypeData_YoutubeVideos = alias(ETDYoutubeVideos, "typeData_YoutubeVideos")