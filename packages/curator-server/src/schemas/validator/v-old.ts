// import z from "zod";
// import { protectedResouces } from "@/lib/protected-resources";
// import { VOwnerKVs, VTimestampKVs } from "@/schemas/validator-schema.common";

// export const VMuseumSelect = z.object({
// 	id: z.string().uuid().nonempty(),
// 	name: z.string().nonempty(),
// 	...VOwnerKVs,
// 	...VTimestampKVs,
// });

// export const VMuseumInsert = VMuseumSelect.omit({
// 	id: true,
// 	createdAt: true,
// 	updatedAt: true,
// });

// export const VMuseumUpdate = VMuseumInsert.partial().omit({
// 	createdBy: true,
// });

// export const VMuseumIdParam = z.object({ id: z.string().uuid().nonempty() });

// export const VMuseumDelete = z
// 	.object({
// 		id: z.string().uuid().nonempty(),
// 	})
// 	.superRefine((data, c) => {
// 		let foundInProtectedResources = protectedResouces.fromDelete.museums.find(
// 			(i) => i.id === data.id,
// 		);

// 		if (foundInProtectedResources) {
// 			c.addIssue({
// 				code: z.ZodIssueCode.custom,
// 				path: ["id"],
// 				message: foundInProtectedResources.reason,
// 			});
// 		}
// 	});
