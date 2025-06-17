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

export const VExhibitsSelect = z.object({
    id: z.string().ulid().nonempty(),
    name: z.string().nonempty(),
    exhibitTypeId: z.string().ulid().nonempty(),
    exhibitTypeData: z.union([VETYoutubeVideos, VETYoutubeChannels,]),
    galleryId: z.string().ulid().nonempty(),
    museumId: z.string().ulid().nonempty(),
    ...VOwnerKVs,
    ...VTimestampKVs,
})

export const VExhibitsInsert = VExhibitsSelect.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
})

export const VExhibitsUpdate = VExhibitsInsert.partial().omit({
    exhibitTypeId: true
})

export const VExhibitsDelete = z.object({
    id: z.string().ulid().nonempty(),
})

export const VExhibitsIdParam = z.object({ id: z.string().ulid().nonempty() });

export const VExhibitsUpdateType = z.object({
    updatedTypeId: z.string().ulid().nonempty(),
    updatedTypedData: z.union([VETYoutubeVideos, VETYoutubeChannels,]),
})