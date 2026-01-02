import z from "zod";

export const VOwnerKVs = {
	createdBy: z.uuidv7().nonempty(),
};

export const VTimestampKVs = {
	createdAt: z.iso.datetime().nonempty(),
	updatedAt: z.iso.datetime().nonempty(),
};
