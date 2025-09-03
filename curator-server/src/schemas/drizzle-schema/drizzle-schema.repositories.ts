import { genUuidv7 } from "@/lib/id-generators";
import { users } from "@/schemas/drizzle-schema/drizzle-schema.better-auth";
import { museums } from "@/schemas/drizzle-schema/drizzle-schema.museums";
import {
  AnyPgColumn,
  bigint,
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const repositoryTypes = pgTable("repository_types", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUuidv7();
    }),
  name: text("name").notNull().unique(),
  isAlias: boolean("is_alias").notNull().default(false),
  aliasedTypeId: text("aliased_type_id").references(
    (): AnyPgColumn => repositoryTypes.id
  ),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const rt_localFilesystem = pgTable("rt_localFilesystem", {
  repositoryId: text("repository_id")
    .primaryKey()
    .references(() => repositories.id),
  path: text("path").notNull(),
  capacityMb: bigint("capacity_mb", { mode: "number" }),
});

export const repositories = pgTable("repositories", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUuidv7();
    }),
  repositoryTypeId: text("repository_type_id")
    .notNull()
    .references(() => repositoryTypes.id),
  name: text("name").notNull().unique(),
  role: text("role").notNull(),
  museumId: text("museum_id")
    .notNull()
    .references(() => museums.id),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});