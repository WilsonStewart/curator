import { at_audio_recordings, at_images, at_videos } from "@/schemas/drizzle-schema/drizzle-schema.artifacts"
import { et_youtubeChannels, et_youtubeVideos } from "@/schemas/drizzle-schema/drizzle-schema.exhibits"

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
        byId: {
            "01JXJY0510HN94TB4Z4S9C5ZKM": {
                name: "YouTube Video",
                table: et_youtubeVideos
            },
            "01JXJXZJCREM9Q5W9XX3WB1C13": {
                name: "YouTube Channel",
                table: et_youtubeChannels
            },
        },
        byTableName: {
            etd_youtube_video: "01JXJY0510HN94TB4Z4S9C5ZKM",
            etd_youtube_channel: "01JXJXZJCREM9Q5W9XX3WB1C13"
        }
    },
    artifacts: {
        byId: {
            "01JXJY0J4JBHR56N63CR082AZQ": {
                name: "Audio Recording",
                table: at_audio_recordings
            },
            "01JXJY0ZXVECEKEMJT548BMWP6": {
                name: "Video Recording",
                table: at_videos
            },
            "01JXJY18WSJ31PP536WWN4XRPV": {
                name: "Image",
                table: at_images
            },
        },
        byTableName: {
            atd_audio: "01JXJY0J4JBHR56N63CR082AZQ",
            atd_video: "01JXJY0ZXVECEKEMJT548BMWP6",
            atd_image: "01JXJY18WSJ31PP536WWN4XRPV"
        }
    }
}

export type TExhibitTypeId =
    "01JXJY0510HN94TB4Z4S9C5ZKM" | // YouTube Video
    "01JXJXZJCREM9Q5W9XX3WB1C13"   // YouTube Channel
