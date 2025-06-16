import { galleries } from "@/schemas/drizzle-schema/drizzle-schema.galleries";
import { policies } from "@/schemas/drizzle-schema/drizzle-schema.policies";
import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const galleriesPolicies = pgTable(
  "galleries_policies",
  {
    policyId: text("policy_id").references(() => policies.id),
    galleryId: text("gallery_id").references(() => galleries.id),
  },
  (table) => [
    primaryKey({
      columns: [table.policyId, table.galleryId],
    }),
  ]
);
