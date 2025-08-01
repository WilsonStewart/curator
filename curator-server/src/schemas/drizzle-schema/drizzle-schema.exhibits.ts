import { genUlid } from "@/lib/id-generators";
import { users } from "@/schemas/drizzle-schema/drizzle-schema.better-auth";
import { galleries } from "@/schemas/drizzle-schema/drizzle-schema.galleries";
import { museums } from "@/schemas/drizzle-schema/drizzle-schema.museums";
import {
  AnyPgColumn,
  boolean,
  pgTable,
  pgView,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const exhibitTypes = pgTable("exhibit_types", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUlid();
    }),
  name: text("name").notNull().unique(),
  isAlias: boolean("is_alias").notNull().default(false),
  aliasedTypeId: text("aliased_type_id").references(
    (): AnyPgColumn => exhibitTypes.id
  ),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const et_youtubeChannels = pgTable("et_youtubeChannels", {
  exhibitId: text("exhibit_id")
    .primaryKey()
    .references(() => exhibits.id),
  youtubeId: text("youtube_id").unique(),
  youtubeChannelHandle: text("youtube_channel_handle").unique(),
  name: text("name").notNull(),
});

export const et_youtubeVideos = pgTable("et_youtubeVideos", {
  exhibitId: text("exhibit_id")
    .primaryKey()
    .references(() => exhibits.id),
  youtubeId: text("youtube_id").notNull().unique(),
  youtubeChannelId: text("youtube_channel_id")
    .references(() => et_youtubeChannels.youtubeId),
  title: text("title").notNull(),
  description: text("description"),
  uploadDate: timestamp("upload_date").notNull(),
});

export const exhibits = pgTable("exhibits", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUlid();
    }),
  name: text("name").notNull().unique(),
  exhibitTypeId: text("exhibit_type_id")
    .notNull()
    .references(() => exhibitTypes.id),
  galleryId: text("gallery_id")
    .notNull()
    .references(() => galleries.id),
  museumId: text("museum_id")
    .notNull()
    .references(() => museums.id),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// export const exibitsTypesIdView = pgView("exhibits_types_id_view").as((qb) => {
//   return qb.select(
//     {
//       id: exhibits.id,
//       exhibitTypeId: exhibits.exhibitTypeId
//     }
//   )
//     .from(exhibits)
// })