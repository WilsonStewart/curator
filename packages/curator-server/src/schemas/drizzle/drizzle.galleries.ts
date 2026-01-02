import { users } from "./drizzle.better-auth";
import { museums } from "./drizzle.museums";
import { sql } from "drizzle-orm";
import {
	type AnyPgColumn,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const galleries = pgTable("galleries", {
	id: uuid("id").primaryKey().default(sql`uuidv7()`),
	name: text("name").notNull(),
	safeName: text("safe_name").notNull(),
	parentGalleryId: uuid("parent_gallery_id").references(
		(): AnyPgColumn => galleries.id,
	),
	resultantPolicy: jsonb("resultant_policy"),
	museumId: uuid("museum_id")
		.notNull()
		.references(() => museums.id),
	createdBy: text("created_by")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
