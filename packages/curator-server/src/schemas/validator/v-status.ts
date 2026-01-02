import z from "zod";

export const VStatusUnauthenticated = z.object({
	product: z.literal("com.bellbellbell.curator-server"),
	version: z.string(),
	versionBw: z.number(),
	serviceStatus: z.number(),
	timestamp: z.iso.datetime(),
});
