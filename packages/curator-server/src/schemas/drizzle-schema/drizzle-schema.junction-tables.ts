import { galleries } from "@/schemas/drizzle-schema/drizzle-schema.galleries";
import { policies } from "@/schemas/drizzle-schema/drizzle-schema.policies";
import { pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";

export const galleriesPolicies = pgTable(
	"galleries_policies",
	{
		policyId: uuid("policy_id").references(() => policies.id),
		galleryId: uuid("gallery_id").references(() => galleries.id),
	},
	(table) => [
		primaryKey({
			columns: [table.policyId, table.galleryId],
		}),
	],
);
