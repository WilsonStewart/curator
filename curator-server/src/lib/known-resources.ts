import { ATDAudio, ATDImage, ATDVideo } from "@/schemas/drizzle-schema/drizzle-schema.artifacts"
import { ETDYoutubeChannels, ETDYoutubeVideos, exhibits } from "@/schemas/drizzle-schema/drizzle-schema.exhibits"

export const knownResourceIds = {
    users: {
        SYSTEM: "01JXJWRHD2N17HVE9KZZZDADDY"
    },
    galleries: {
        ROOT: "01JXJXWGH0X1Q1KZFY6PDDZT43"
    },
    musuems: {
        DEFAULT_MUSEUM: "01JXJYQXH6A9GXPJF5V50Q1WES"
    }
}

export const knownTypeIds = {
    exhibits: {
        "01JXJY0510HN94TB4Z4S9C5ZKM": {
            name: "YouTube Video",
            table: ETDYoutubeVideos
        },
        "01JXJXZJCREM9Q5W9XX3WB1C13": {
            name: "YouTube Channel",
            table: ETDYoutubeChannels
        },
    },
    artifacts: {
        "01JXJY0J4JBHR56N63CR082AZQ": {
            name: "Audio Recording",
            table: ATDAudio
        },
        "01JXJY0ZXVECEKEMJT548BMWP6": {
            name: "Video Recording",
            table: ATDVideo
        },
        "01JXJY18WSJ31PP536WWN4XRPV": {
            name: "Image",
            table: ATDImage
        },
    }
}

export type TExhibitTypeId =
    "01JXJY0510HN94TB4Z4S9C5ZKM" | // YouTube Video
    "01JXJXZJCREM9Q5W9XX3WB1C13"   // YouTube Channel
