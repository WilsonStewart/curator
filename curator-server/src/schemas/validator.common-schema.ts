import z from "zod";

export const VOwnerKVs = {
    createdBy: z.string().ulid().nonempty()
}

export const VTimestampKVs = {
    createdAt: z.string().datetime().nonempty(),
    modifiedAt: z.string().datetime().nonempty()
};