import z from "zod";

export const VStatusUnauthenticated = z.object({
	product: z.literal("com.bellbellbell.curator-server"),
	version: z.string(),
	// versionBw: z.number(), Disabled until I re-work the bw version number, or retire it -ws 1/2/26
	serviceStatus: z.number(),
	timestamp: z.iso.datetime(),
});
