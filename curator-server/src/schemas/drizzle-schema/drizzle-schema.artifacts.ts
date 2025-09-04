import { genUuidv7 } from "@/lib/id-generators";
import { users } from "@/schemas/drizzle-schema/drizzle-schema.better-auth";
import { museums } from "@/schemas/drizzle-schema/drizzle-schema.museums";
import {
  AnyPgColumn,
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const artifactTypes = pgTable("artifact_types", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUuidv7();
    }),
  name: text("name").notNull().unique(),
  isAlias: boolean("is_alias").notNull().default(false),
  aliasedTypeId: uuid("aliased_type_id").references(
    (): AnyPgColumn => artifactTypes.id
  ),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const at_videos = pgTable("at_videos", {
  artifactId: uuid("artifact_id")
    .primaryKey()
    .references(() => artifacts.id),
  lengthSeconds: integer("length_seconds").notNull(),
});

export const at_audio_recordings = pgTable("at_audio_recordings", {
  artifactId: uuid("artifact_id")
    .primaryKey()
    .references(() => artifacts.id),
  lengthSeconds: integer("length_seconds").notNull(),
});

export const at_images = pgTable("at_images", {
  artifactId: uuid("artifact_id")
    .primaryKey()
    .references(() => artifacts.id),
  widthPx: integer("width_px").notNull(),
  heightPx: integer("height_px").notNull(),
});

export const artifacts = pgTable("artifacts", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUuidv7();
    }),
  name: text("name"),
  fileName: text("file_name").notNull(),
  fileFormat: text("file_format").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  artifactTypeId: uuid("artifact_type_id")
    .notNull()
    .references(() => artifactTypes.id),
  museumId: uuid("museum_id")
    .notNull()
    .references(() => museums.id),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
