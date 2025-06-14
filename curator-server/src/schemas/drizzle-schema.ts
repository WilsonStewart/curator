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
} from "./drizzle.common-schema";
import { check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { genUlid } from "@/lib/id-generators";

export const metadata = pgTable(
  "metadata",
  {
    id: text("id").default("curatorMetadata").primaryKey(),
    isInitialized: boolean("is_initialized").default(false),
  },
  (table) => [check("id", sql`${table.id} = 'curatorMetadata'`)]
);

//
// Start of better-auth gen'ed schema
//

export const user = pgTable("user", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const session = pgTable("session", {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

//
// End of better-auth gen'ed schema
//

export const museums = pgTable("museums", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUlid();
    }),
  displayName: text("display_name").notNull().unique(),
  ...ownerColumns,
  ...timestampColumns,
});

export const galleries = pgTable("galleries", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUlid();
    }),
  displayName: text("display_name").notNull(),
  parentGalleryId: text("parent_gallery_id").references(
    (): AnyPgColumn => galleries.id
  ),
  resultantPolicy: jsonb("resultant_policy"),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});

export const exhibitTypes = pgTable("exhibit_types", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUlid();
    }),
  displayName: text("display_name").notNull().unique(),
  isAlias: boolean("is_alias").notNull().default(false),
  aliasedTypeId: text("aliased_type_id").references(
    (): AnyPgColumn => exhibitTypes.id
  ),
  ...ownerColumns,
  ...timestampColumns,
});

export const ETYoutubeChannels = pgTable("exhibit_type_youtube_channels", {
  exhibitId: text("exhibit_id")
    .primaryKey()
    .references(() => exhibits.id),
  exhibitTypeId: text("exhibit_type_id").references(() => exhibitTypes.id),
  youtubeId: text("youtube_id").notNull().unique(),
  name: text("name").notNull(),
});

export const ETYoutubeVideos = pgTable("exhibit_type_youtube_videos", {
  exhibitId: text("exhibit_id")
    .primaryKey()
    .references(() => exhibits.id),
  youtubeId: text("youtube_id").notNull().unique(),
  youtubeChannelId: text("youtube_channel_id")
    .notNull()
    .references(() => ETYoutubeChannels.youtubeId),
  exhibitTypeId: text("exhibit_type_id").references(() => exhibitTypes.id),
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
  displayName: text("display_name").notNull().unique(),
  exhibitTypeId: text("exhibit_type_id")
    .notNull()
    .references(() => exhibitTypes.id),
  galleryId: text("gallery_id")
    .notNull()
    .references(() => galleries.id),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});

export const artifactTypes = pgTable("artifact_types", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUlid();
    }),
  displayName: text("display_name").notNull().unique(),
  isAlias: boolean("is_alias").notNull().default(false),
  aliasedTypeId: text("aliased_type_id").references(
    (): AnyPgColumn => artifactTypes.id
  ),
  ...ownerColumns,
  ...timestampColumns,
});

export const ATVideo = pgTable("artifact_type_video", {
  artifactId: text("artifact_id")
    .primaryKey()
    .references(() => artifacts.id),
  artifactTypeId: text("artifact_type_id").references(
    () => artifactTypes.id
  ),
  lengthSeconds: integer("length_seconds").notNull(),
});

export const ATAudio = pgTable("artifact_type_audio", {
  artifactId: text("artifact_id")
    .primaryKey()
    .references(() => artifacts.id),
  artifactTypeId: text("artifact_type_id").references(
    () => artifactTypes.id
  ),
  lengthSeconds: integer("length_seconds").notNull(),
});

export const ATImage = pgTable("artifact_type_image", {
  artifactId: text("artifact_id")
    .primaryKey()
    .references(() => artifacts.id),
  artifactTypeId: text("artifact_type_id").references(
    () => artifactTypes.id
  ),
  widthPx: integer("width_px").notNull(),
  heightPx: integer("height_px").notNull(),
});

export const artifacts = pgTable("artifacts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUlid();
    }),
  displayName: text("display_name"),
  fileName: text("file_name").notNull(),
  fileFormat: text("file_format").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  artifactTypeId: text("artifact_type_id")
    .notNull()
    .references(() => artifactTypes.id),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});

export const policyTypes = pgTable("policy_types", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUlid();
    }),
  displayName: text("display_name").notNull().unique(),
  isAlias: boolean("is_alias").notNull().default(false),
  aliasedTypeId: text("aliased_type_id").references(
    (): AnyPgColumn => policyTypes.id
  ),
  ...ownerColumns,
  ...timestampColumns,
});

export const policies = pgTable("policies", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUlid();
    }),
  displayName: text("display_name").notNull().unique(),
  policyTypeId: text("policy_type_id")
    .notNull()
    .references(() => policyTypes.id),
});

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

export const repositoryTypes = pgTable("repository_types", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUlid();
    }),
  displayName: text("display_name").notNull().unique(),
  isAlias: boolean("is_alias").notNull().default(false),
  aliasedTypeId: text("aliased_type_id").references(
    (): AnyPgColumn => repositoryTypes.id
  ),
  ...ownerColumns,
  ...timestampColumns,
});

export const RTLocalFilesystem = pgTable("repository_type_local_filesystem", {
  repositoryId: text("repository_id")
    .primaryKey()
    .references(() => repositories.id),
  repositoryTypeId: text("repository_type_id").references(
    () => repositoryTypes.id
  ),
  path: text("path").notNull(),
  capacityMb: bigint("capacity_mb", { mode: "number" }),
});

export const repositories = pgTable("repositories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUlid();
    }),
  displayName: text("display_name").notNull().unique(),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});