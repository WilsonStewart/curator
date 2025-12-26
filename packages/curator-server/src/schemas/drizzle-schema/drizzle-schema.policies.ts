import { users } from "@/schemas/drizzle-schema/drizzle-schema.better-auth";
import { sql } from "drizzle-orm";
import {
	type AnyPgColumn,
	boolean,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const policyTypes = pgTable("policy_types", {
	id: uuid("id").primaryKey().default(sql`uuidv7()`),
	name: text("name").notNull().unique(),
	safeName: text("safe_name").notNull().unique(),
	isAlias: boolean("is_alias").notNull().default(false),
	aliasedTypeId: uuid("aliased_type_id").references(
		(): AnyPgColumn => policyTypes.id,
	),
	createdBy: text("created_by")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const policies = pgTable("policies", {
	id: uuid("id").primaryKey().default(sql`uuidv7()`),
	name: text("name").notNull().unique(),
	policyTypeId: uuid("policy_type_id")
		.notNull()
		.references(() => policyTypes.id),
});
