import {
  pgTable,
  integer,
  text,
  timestamp,
  jsonb,
  AnyPgColumn,
  primaryKey,
  boolean,
  bigint,
} from "drizzle-orm/pg-core";
import {
  ownerColumns,
  museumColumns,
  timestampColumns,
  identityColumns,
} from "./common-columns";
import { check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const metadata = pgTable(
  "metadata",
  {
    id: text("id").default("curatorMetadata").primaryKey(),
    isInitialized: boolean("is_initialized").default(false),
  },
  (table) => [check("id", sql`${table.id} = 'curatorMetadata'`)]
);

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eid: text("eid").notNull().unique(),
  userId: text("user_id").notNull().unique(),
  userPassword: text("user_password"),
  displayName: text("display_name").notNull(),
  ...timestampColumns,
});

export const museums = pgTable("museums", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eid: text("eid").notNull().unique(),
  displayName: text("display_name").notNull().unique(),
  ...ownerColumns,
  ...timestampColumns,
});

export const galleries = pgTable("galleries", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eid: text("eid").notNull().unique(),
  displayName: text("display_name").notNull(),
  parentGalleryId: integer("parent_gallery_id").references(
    (): AnyPgColumn => galleries.id
  ),
  resultantPolicy: jsonb("resultant_policy"),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});

export const exhibitTypes = pgTable("exhibit_types", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eid: text("eid").notNull().unique(),
  displayName: text("display_name").notNull().unique(),
  isAlias: boolean("is_alias").notNull().default(false),
  aliasedTypeId: integer("aliased_type_id").references(
    (): AnyPgColumn => exhibitTypes.id
  ),
  ...ownerColumns,
  ...timestampColumns,
});

export const ETYoutubeChannels = pgTable("exhibit_type_youtube_channels", {
  exhibitId: integer("exhibit_id")
    .primaryKey()
    .references(() => exhibits.id),
  exhibitTypeId: integer("exhibit_type_id").references(() => exhibitTypes.id),
  youtubeId: text("youtube_id").notNull().unique(),
  name: text("name").notNull(),
});

export const ETYoutubeVideos = pgTable("exhibit_type_youtube_videos", {
  exhibitId: integer("exhibit_id")
    .primaryKey()
    .references(() => exhibits.id),
  youtubeId: text("youtube_id").notNull().unique(),
  youtubeChannelId: text("youtube_channel_id")
    .notNull()
    .references(() => ETYoutubeChannels.youtubeId),
  exhibitTypeId: integer("exhibit_type_id").references(() => exhibitTypes.id),
  title: text("title").notNull(),
  description: text("description"),
  uploadDate: timestamp("upload_date").notNull(),
});

export const exhibits = pgTable("exhibits", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eid: text("eid").notNull().unique(),
  displayName: text("display_name").notNull().unique(),
  exhibitTypeId: integer("exhibit_type_id")
    .notNull()
    .references(() => exhibitTypes.id),
  galleryId: integer("gallery_id")
    .notNull()
    .references(() => galleries.id),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});

export const artifactTypes = pgTable("artifact_types", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eid: text("eid").notNull().unique(),
  displayName: text("display_name").notNull().unique(),
  isAlias: boolean("is_alias").notNull().default(false),
  aliasedTypeId: integer("aliased_type_id").references(
    (): AnyPgColumn => artifactTypes.id
  ),
  ...ownerColumns,
  ...timestampColumns,
});

export const ATVideo = pgTable("artifact_type_video", {
  artifactId: integer("artifact_id")
    .primaryKey()
    .references(() => artifacts.id),
  artifactTypeId: integer("artifact_type_id").references(
    () => artifactTypes.id
  ),
  lengthSeconds: integer("length_seconds").notNull(),
});

export const ATAudio = pgTable("artifact_type_audio", {
  artifactId: integer("artifact_id")
    .primaryKey()
    .references(() => artifacts.id),
  artifactTypeId: integer("artifact_type_id").references(
    () => artifactTypes.id
  ),
  lengthSeconds: integer("length_seconds").notNull(),
});

export const ATImage = pgTable("artifact_type_image", {
  artifactId: integer("artifact_id")
    .primaryKey()
    .references(() => artifacts.id),
  artifactTypeId: integer("artifact_type_id").references(
    () => artifactTypes.id
  ),
  widthPx: integer("width_px").notNull(),
  heightPx: integer("height_px").notNull(),
});

export const artifacts = pgTable("artifacts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eid: text("eid").notNull().unique(),
  displayName: text("display_name"),
  fileName: text("file_name").notNull(),
  fileFormat: text("file_format").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  artifactTypeId: integer("artifact_type_id")
    .notNull()
    .references(() => artifactTypes.id),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});

export const policyTypes = pgTable("policy_types", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eid: text("eid").notNull().unique(),
  displayName: text("display_name").notNull().unique(),
  isAlias: boolean("is_alias").notNull().default(false),
  aliasedTypeId: integer("aliased_type_id").references(
    (): AnyPgColumn => policyTypes.id
  ),
  ...ownerColumns,
  ...timestampColumns,
});

export const policies = pgTable("policies", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eid: text("eid").notNull().unique(),
  displayName: text("display_name").notNull().unique(),
  policyTypeId: integer("policy_type_id")
    .notNull()
    .references(() => policyTypes.id),
});

export const galleriesPolicies = pgTable(
  "galleries_policies",
  {
    policyId: integer("policy_id").references(() => policies.id),
    galleryId: integer("gallery_id").references(() => galleries.id),
  },
  (table) => [
    primaryKey({
      columns: [table.policyId, table.galleryId],
    }),
  ]
);

export const repositoryTypes = pgTable("repository_types", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eid: text("eid").notNull().unique(),
  displayName: text("display_name").notNull().unique(),
  isAlias: boolean("is_alias").notNull().default(false),
  aliasedTypeId: integer("aliased_type_id").references(
    (): AnyPgColumn => repositoryTypes.id
  ),
  ...ownerColumns,
  ...timestampColumns,
});

export const RTLocalFilesystem = pgTable("repository_type_local_filesystem", {
  repositoryId: integer("repository_id")
    .primaryKey()
    .references(() => repositories.id),
  repositoryTypeId: integer("repository_type_id").references(
    () => repositoryTypes.id
  ),
  path: text("path").notNull(),
  capacityMb: bigint("capacity_mb", { mode: "number" }),
});

export const repositories = pgTable("repositories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eid: text("eid").notNull().unique(),
  displayName: text("display_name").notNull().unique(),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});
