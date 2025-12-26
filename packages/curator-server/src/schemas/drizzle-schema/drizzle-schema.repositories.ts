import { users } from "@/schemas/drizzle-schema/drizzle-schema.better-auth";
import { sql } from "drizzle-orm";
import {
	type AnyPgColumn,
	bigint,
	boolean,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const repositoryTypes = pgTable("repository_types", {
	id: uuid("id").primaryKey().default(sql`uuidv7()`),
	name: text("name").notNull().unique(),
	safeName: text("safe_name").notNull().unique(),
	isAlias: boolean("is_alias").notNull().default(false),
	aliasedTypeId: uuid("aliased_type_id").references(
		(): AnyPgColumn => repositoryTypes.id,
	),
	createdBy: text("created_by")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const rt_localFilesystem = pgTable("rt_local_filesystem", {
	repositoryId: uuid("repository_id")
		.primaryKey()
		.references(() => repositories.id),
	path: text("path").notNull(),
	capacityMb: bigint("capacity_mb", { mode: "number" }),
});

export const repositories = pgTable("repositories", {
	id: uuid("id").primaryKey().default(sql`uuidv7()`),
	repositoryTypeId: uuid("repository_type_id")
		.notNull()
		.references(() => repositoryTypes.id),
	name: text("name").notNull().unique(),
	safeName: text("safe_name").notNull().unique(),
	role: text("role").notNull(),
	createdBy: text("created_by")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
