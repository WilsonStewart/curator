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
    .refine(o => Object.keys(0).length > 0, { message: "Update body must have at least 1 field." })

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
    .refine(o => Object.keys(0).length > 0, { message: "Update body must have at least 1 field." })

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
    .refine(o => Object.keys(0).length > 0, { message: "Update body must have at least 1 field." })

const VExhibitsBaseUpdate = VExhibitsBaseSelect
    .omit({ id: true, createdBy: true, createdAt: true, })
    .partial()

export const VExhibitsSelect = z.object(
    {
        data: VExhibitsBaseSelect,
        typeData: z.union([VETDYoutubeVideosSelect, VETDYoutubeChannelsSelect,]),
    }
)

export const VExhibitsInsert = z.object(
    {
        data: VExhibitsBaseInsert,
        typeData: z.union([VETDYoutubeVideosInsert, VETDYoutubeChannelsInsert,]),
    }
)

export const VExhibitsUpdate = z.object(
    {
        data: z.optional(VExhibitsBaseUpdate),
        typeData: z.optional(z.union([VETDYoutubeVideosUpdate, VETDYoutubeChannelsUpdate,])),
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