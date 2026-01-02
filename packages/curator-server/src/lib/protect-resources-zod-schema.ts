import { z, ZodAny } from "zod";

type ProtectedItem = { id: string; reason: string };

/**
 * Enhances any Zod object‐schema that has an `id: string` property,
 * adding a `superRefine` step to block protected IDs.
 */
export function protectResourcesZodSchema<S extends ZodAny>(
	schema: S,
	protectedList: ProtectedItem[],
): S {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (schema as any).superRefine((data: any, ctx: any) => {
		const blocked = protectedList.find((x) => x.id === data.id);
		if (blocked) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["id"],
				message: blocked.reason,
			});
		}
	}) as S;
}
