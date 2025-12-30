import { resolver } from "hono-openapi";
import { type ZodAny, z } from "zod";

export const res200Successful = (opts: {
	zodSchema?: ZodAny;
	descriptionOverride?: string;
}) => {
	return {
		200: {
			description: opts.descriptionOverride ?? "Successful",
			content: {
				"application/json": {
					schema: resolver(
						opts.zodSchema ?? z.object({ message: z.string().nonempty() }),
					),
				},
			},
		},
	};
};

export const res401Unauthorized = (opts: {
	zodSchema?: ZodAny;
	descriptionOverride?: string;
}) => {
	return {
		401: {
			description: opts.descriptionOverride ?? "Unauthorized",
			content: {
				"application/json": {
					schema: resolver(
						opts.zodSchema ??
							z.object({
								success: z.boolean().default(false),
								message: z.string(),
								error: z.optional(z.string()),
							}),
					),
				},
			},
		},
	};
};
