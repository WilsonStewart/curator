import { VMuseumInsert } from "@/schemas/validator-schema";
import { VOwnerKVs, VTimestampKVs } from "@/schemas/validator-schema.common";
import z from "zod";

const VETDYoutubeVideosSelect = z.object({
    exhibitId: z.string().ulid().nonempty(),
    youtubeId: z.string().nonempty(),
    youtubeChannelId: z.optional(z.string().nonempty()),
    title: z.string().nonempty(),
    description: z.optional(z.string().nonempty()),
    uploadDate: z.string().datetime().nonempty()
})

const VETDYoutubeVideosInsert = VETDYoutubeVideosSelect

const VETDYoutubeVideosUpdate = VETDYoutubeVideosSelect
    .omit({ exhibitId: true })
    .partial()

const VETDYoutubeChannelsSelect = z.object({
    exhibitId: z.string().ulid().nonempty(),
    exhibitsTypeId: z.string().ulid().nonempty(),
    youtubeId: z.string().nonempty(),
    name: z.string().nonempty()
})

const VETDYoutubeChannelsInsert = VETDYoutubeChannelsSelect

const VETDYoutubeChannelsUpdate = VETDYoutubeChannelsSelect
    .omit({ exhibitId: true })
    .partial()

const VExhibitsBaseSelect = z.object(
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

const VExhibitsBaseInsert = VExhibitsBaseSelect
    .omit({ id: true, createdBy: true, createdAt: true, updatedAt: true, })

const VExhibitsBaseUpdate = VExhibitsBaseSelect
    .omit({ id: true, createdBy: true, createdAt: true, })
    .partial()

export const VExhibitSelect = z.object(
    {
        exhibits: VExhibitsBaseSelect,
        typeData: z.union([VETDYoutubeVideosSelect, VETDYoutubeChannelsSelect,]),
    }
)

export const VExhibitsInsert = z.object(
    {
        exhibits: VExhibitsBaseInsert,
        typeData: z.union([VETDYoutubeVideosInsert, VETDYoutubeChannelsInsert,]),
    }
)

export const VExhibitsUpdate = z.object(
    {
        exhibits: VExhibitsBaseUpdate,
        typeData: z.union([VETDYoutubeVideosUpdate, VETDYoutubeChannelsUpdate,])
    }
)

export const VExhibitsDelete = z.object({
    id: z.string().ulid().nonempty(),
})

export const VExhibitsIdTypeIdParam = z.object(
    {
        id: z.string().ulid().nonempty(),
        exhibitTypeId: z.string().ulid().nonempty()
    }
);