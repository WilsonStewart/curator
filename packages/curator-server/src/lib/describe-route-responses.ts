import { resolver } from "hono-openapi/zod";
import { z, ZodTypeAny } from "zod";

export const res200Successful = (opts: {
	zodSchema?: ZodTypeAny;
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
	zodSchema?: ZodTypeAny;
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
