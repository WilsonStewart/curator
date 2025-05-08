// drizzle-schema.ts
import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";
import {
  ownerColumns,
  museumColumns,
  timestampColumns,
} from "./common-columns";

// // ───────────────────────────────────────────────────────────────
// // 1. USERS & TENANTS
// // ───────────────────────────────────────────────────────────────
export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
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

// // ───────────────────────────────────────────────────────────────
// // 2. GALLERIES (self-hierarchy + resultant JSON policy)
// // ───────────────────────────────────────────────────────────────
export const galleries = pgTable("galleries", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  // parentGalleryId:   uuid('parent_gallery_id').references(() => galleries.id),
  resultantPolicy: jsonb(),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});

// export const galleriesRelations = relations(galleries, ({ many, one }) => ({
//   museum:     one(museums,         { fields: [galleries.museumId],      references: [museums.id] }),
//   parent:     one(galleries,       { fields: [galleries.parentGalleryId], references: [galleries.id] }),
//   children:   many(galleries,      { relationName: 'parent' }),
//   policies:   many(() => galleryPolicies),
// }));

// // ───────────────────────────────────────────────────────────────
// // 3. EXHIBITS & EXHIBIT TYPES
// // ───────────────────────────────────────────────────────────────
export const exhibitTypes = pgTable("exhibit_types", {
  id: uuid().primaryKey(),
  name: text().notNull().unique(),
});

export const ETYoutubeChannels = pgTable("exhibit_type_youtube_channels", {
  exhibitId: uuid()
    .primaryKey()
    .references(() => exhibits.id),
  youtubeId: text().notNull().unique(),
  name: text().notNull(),
});

export const ETYoutubeVideos = pgTable("exhibit_type_youtube_videos", {
  exhibitId: uuid()
    .primaryKey()
    .references(() => exhibits.id),
  title: text().notNull(),
  description: text(),
  uploadDate: timestamp().notNull(),
  youtubeId: text().notNull().unique(),
  youtubeChannelId: uuid()
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

// export const exhibitsRelations = relations(exhibits, ({ one }) => ({
//   type:    one(exhibitTypes,  { fields: [exhibits.exhibitTypeId], references: [exhibitTypes.id] }),
//   gallery: one(galleries,     { fields: [exhibits.galleryId],       references: [galleries.id] }),
//   museum:  one(museums,       { fields: [exhibits.museumId],        references: [museums.id] }),
// }));

// // ───────────────────────────────────────────────────────────────
// // 4. ARTIFACTS & COPIES
// // ───────────────────────────────────────────────────────────────
export const artifactTypes = pgTable("artifact_types", {
  id: uuid().primaryKey(),
  name: text().notNull().unique(),
});

export const artifactTypeAliases = pgTable("artifact_type_aliases", {
  id: uuid().primaryKey(),
  name: text().notNull().unique(),
});

export const ATVideos = pgTable("artifact_types_videos", {
  artifactId: uuid()
    .primaryKey()
    .references(() => artifacts.id),
  lengthSeconds: integer().notNull(),
});

export const ATAudio = pgTable("artifact_types_videos", {
  artifactId: uuid()
    .primaryKey()
    .references(() => artifacts.id),
  lengthSeconds: integer().notNull(),
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
  artifactTypeAliasId: uuid().references(() => artifactTypeAliases.id),
  ...museumColumns,
  ...ownerColumns,
  ...timestampColumns,
});

// export const artifactsRelations = relations(artifacts, ({ one, many }) => ({
//   type:    one(artifactTypes, { fields: [artifacts.artifactTypeId], references: [artifactTypes.id] }),
//   exhibit: one(exhibits,      { fields: [artifacts.exhibitId],      references: [exhibits.id] }),
//   copies:  many(copies),
// }));

// // ───────────────────────────────────────────────────────────────
// // 5. POLICIES & LINKING
// // ───────────────────────────────────────────────────────────────
export const policyTypes = pgTable("policy_types", {
  id: uuid().primaryKey(),
  name: text().notNull().unique(),
});

export const policies = pgTable("policies", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  policyTypeId: uuid()
    .notNull()
    .references(() => policyTypes.id),
});

// export const galleryPolicies = pgTable("gallery_policies", {
//   galleryId: uuid("gallery_id")
//     .notNull()
//     .references(() => galleries.id),
//   policyId: uuid("policy_id")
//     .notNull()
//     .references(() => policies.id),
// });

// export const policiesRelations = relations(policies, ({ one, many }) => ({
//   type:    one(policyTypes,    { fields: [policies.policyTypeId], references: [policyTypes.id] }),
//   galleries: many(galleryPolicies),
// }));
