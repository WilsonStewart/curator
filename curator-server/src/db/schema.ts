import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
  AnyPgColumn,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";
import {
  ownerColumns,
  museumColumns,
  timestampColumns,
} from "./common-columns";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  userId: text().notNull().unique(),
  firstName: text(),
  lastName: text(),
  ...timestampColumns,
});

export const museums = pgTable("museums", {
  id: uuid().primaryKey(),
  name: text().notNull().unique(),
  ...ownerColumns,
  ...timestampColumns,
});

export const galleries = pgTable("galleries", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  parentGalleryId: uuid().references((): AnyPgColumn => galleries.id),
  resultantPolicy: jsonb(),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});

export const exhibitTypes = pgTable("exhibit_types", {
  id: uuid().primaryKey(),
  name: text().notNull().unique(),
  displayName: text().notNull().unique(),
  isAlias: boolean().notNull().default(false),
  aliasedTypeId: uuid().references((): AnyPgColumn => exhibitTypes.id),
  ...ownerColumns,
  ...timestampColumns,
});

export const ETYoutubeChannels = pgTable("exhibit_type_youtube_channels", {
  exhibitId: uuid()
    .primaryKey()
    .references(() => exhibits.id),
  exhibitTypeId: uuid().references(() => exhibitTypes.id),
  youtubeId: text().notNull().unique(),
  name: text().notNull(),
});

export const ETYoutubeVideos = pgTable("exhibit_type_youtube_videos", {
  exhibitId: uuid()
    .primaryKey()
    .references(() => exhibits.id),
  exhibitTypeId: uuid().references(() => exhibitTypes.id),
  title: text().notNull(),
  description: text(),
  uploadDate: timestamp().notNull(),
  youtubeId: text().notNull().unique(),
  youtubeChannelId: text()
    .notNull()
    .references(() => ETYoutubeChannels.youtubeId),
});

export const exhibits = pgTable("exhibits", {
  id: uuid().primaryKey(),
  name: text().notNull(),
  exhibitTypeId: uuid()
    .notNull()
    .references(() => exhibitTypes.id),
  galleryId: uuid()
    .notNull()
    .references(() => galleries.id),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});

export const artifactTypes = pgTable("artifact_types", {
  id: uuid().primaryKey(),
  name: text().notNull().unique(),
  displayName: text().notNull().unique(),
  isAlias: boolean().notNull().default(false),
  aliasedTypeId: uuid().references((): AnyPgColumn => artifactTypes.id),
  ...ownerColumns,
  ...timestampColumns,
});

export const ATVideo = pgTable("artifact_types_video", {
  artifactId: uuid()
    .primaryKey()
    .references(() => artifacts.id),
  artifactTypeId: uuid().references(() => artifactTypes.id),
  lengthSeconds: integer().notNull(),
});

export const ATAudio = pgTable("artifact_types_audio", {
  artifactId: uuid()
    .primaryKey()
    .references(() => artifacts.id),
  artifactTypeId: uuid().references(() => artifactTypes.id),
  lengthSeconds: integer().notNull(),
});

export const ATImage = pgTable("artifact_types_image", {
  artifactId: uuid()
    .primaryKey()
    .references(() => artifacts.id),
  artifactTypeId: uuid().references(() => artifactTypes.id),
  widthPx: integer(),
  heightPx: integer(),
});

export const artifacts = pgTable("artifacts", {
  id: uuid().primaryKey(),
  name: text().notNull(),
  fileName: text().notNull(),
  fileFormat: text().notNull(),
  sizeBytes: integer().notNull(),
  artifactTypeId: uuid()
    .notNull()
    .references(() => artifactTypes.id),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});

export const policyTypes = pgTable("policy_types", {
  id: uuid().primaryKey(),
  name: text().notNull().unique(),
  displayName: text().notNull().unique(),
  isAlias: boolean().notNull().default(false),
  aliasedTypeId: uuid().references((): AnyPgColumn => policyTypes.id),
  ...ownerColumns,
  ...timestampColumns,
});

export const policies = pgTable("policies", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  policyTypeId: uuid()
    .notNull()
    .references(() => policyTypes.id),
});

export const galleriesPolicies = pgTable(
  "galleries_policies",
  {
    policyId: uuid().references(() => policies.id),
    galleryId: uuid().references(() => galleries.id),
  },
  (table) => [
    primaryKey({
      columns: [table.policyId, table.galleryId],
    }),
  ]
);
