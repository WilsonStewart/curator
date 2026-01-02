import { galleries } from "./drizzle.galleries";
import { policies } from "./drizzle.policies";
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
