import { VMuseumInsert } from "@/schemas/validator-schema";
import { VOwnerKVs, VTimestampKVs } from "@/schemas/validator-schema.common";
import z from "zod";

const VETYoutubeVideos = z.object({
    exhibitId: z.string().ulid().nonempty(),
    youtubeId: z.string().nonempty(),
    youtubeChannelId: z.optional(z.string().nonempty()),
    exhibitsTypeId: z.string().ulid().nonempty(),
    title: z.string().nonempty(),
    description: z.optional(z.string().nonempty()),
    uploadDate: z.string().datetime().nonempty()
})

const VETYoutubeChannels = z.object({
    exhibitId: z.string().ulid().nonempty(),
    exhibitsTypeId: z.string().ulid().nonempty(),
    youtubeId: z.string().nonempty(),
    name: z.string().nonempty()
})

const VExhibitsType = z.union([VETYoutubeVideos, VETYoutubeChannels,])

export const VExhibitsSelectBase = z.object(
    {
        id: z.string().ulid().nonempty(),
        name: z.string().nonempty(),
        exhibitTypeId: z.string().ulid().nonempty(),
        galleryId: z.string().ulid().nonempty(),
        museumId: z.string().ulid().nonempty(),
        ...VOwnerKVs,
        ...VTimestampKVs,
    }
)

// export const VExhibitsSelectAll = z.array(z.object(
//     {
//         exhibits: VExhibitsSelectBase,
//         etd_youtube_channels: z.nullable(VETYoutubeChannels),
//         etd_youtube_videos: z.nullable(VETYoutubeVideos)
//     }
// ))

export const VExhibitsSelect = z.object(
    {
        exhibits: VExhibitsSelectBase,
        typeData: VExhibitsType,
    }
)

export const VExhibitsInsert = VExhibitsSelect.extend({
    exhibits: VExhibitsSelect.shape.exhibits.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
    }),
})

export const VExhibitsUpdate = VExhibitsInsert.partial().extend({
    exhibits: z.optional(
        VExhibitsSelect.shape.exhibits
            .omit({
                id: true,
                createdBy: true,
                createdAt: true,
            })
            .partial()
    ),
    typeData: z.optional(
        VExhibitsSelect.shape.typeData
    )
})

export const VExhibitsDelete = z.object({
    id: z.string().ulid().nonempty(),
})

export const VExhibitsIdTypeIdParam = z.object(
    {
        id: z.string().ulid().nonempty(),
        exhibitTypeId: z.string().ulid().nonempty()
    }
);

export const VExhibitsUpdateType = z.object({
    updatedTypeId: z.string().ulid().nonempty(),
    updatedTypedData: z.union([VETYoutubeVideos, VETYoutubeChannels,]),
})