import z from "zod";

export const VOwnerKVs = {
	createdBy: z.string().uuid().nonempty(),
};

export const VTimestampKVs = {
	createdAt: z.string().datetime().nonempty(),
	updatedAt: z.string().datetime().nonempty(),
};
