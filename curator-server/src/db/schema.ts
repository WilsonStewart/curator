// drizzle-schema.ts
import {
  pgTable,
  uuid,
  text,
  integer,
  jsonb,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ───────────────────────────────────────────────────────────────
// 1. USERS & TENANTS
// ───────────────────────────────────────────────────────────────
export const users = pgTable('users', {
  id:        uuid('id').primaryKey().defaultRandom(),
  email:     text('email').notNull().unique(),
  name:      text('name'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const museums = pgTable('museums', {
  id:        uuid('id').primaryKey().defaultRandom(),
  name:      text('name').notNull(),
  createdBy: uuid('created_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ───────────────────────────────────────────────────────────────
// 2. GALLERIES (self-hierarchy + resultant JSON policy)
// ───────────────────────────────────────────────────────────────
export const galleries = pgTable('galleries', {
  id:                uuid('id').primaryKey().defaultRandom(),
  name:              text('name').notNull(),
  museumId:          uuid('museum_id').notNull().references(() => museums.id),
  parentGalleryId:   uuid('parent_gallery_id').references(() => galleries.id),
  resultantPolicy:   jsonb('resultant_policy'),
  createdBy:         uuid('created_by').notNull().references(() => users.id),
  createdAt:         timestamp('created_at').notNull().defaultNow(),
  updatedAt:         timestamp('updated_at').notNull().defaultNow(),
});

export const galleriesRelations = relations(galleries, ({ many, one }) => ({
  museum:     one(museums,         { fields: [galleries.museumId],      references: [museums.id] }),
  parent:     one(galleries,       { fields: [galleries.parentGalleryId], references: [galleries.id] }),
  children:   many(galleries,      { relationName: 'parent' }),
  policies:   many(() => galleryPolicies),
}));

// ───────────────────────────────────────────────────────────────
// 3. EXHIBITS & EXHIBIT TYPES
// ───────────────────────────────────────────────────────────────
export const exhibitTypes = pgTable('exhibit_types', {
  id:        uuid('id').primaryKey().defaultRandom(),
  name:      text('name').notNull().unique(),
});

export const exhibitTypeAudio = pgTable('exhibit_type_audio', {
  exhibitTypeId: uuid('exhibit_type_id').primaryKey().references(() => exhibitTypes.id),
  bitrate:       integer('bitrate').notNull(),       // in kbps
  durationSec:   integer('duration_sec').notNull(),
});

export const exhibitTypeVideo = pgTable('exhibit_type_video', {
  exhibitTypeId: uuid('exhibit_type_id').primaryKey().references(() => exhibitTypes.id),
  resolution:    text('resolution').notNull(),       // e.g. "1920x1080"
  framerate:     integer('framerate').notNull(),     // e.g. 30
});

export const exhibits = pgTable('exhibits', {
  id:           uuid('id').primaryKey().defaultRandom(),
  name:         text('name').notNull(),
  exhibitTypeId: uuid('exhibit_type_id').notNull().references(() => exhibitTypes.id),
  galleryId:    uuid('gallery_id').notNull().references(() => galleries.id),
  museumId:     uuid('museum_id').notNull().references(() => museums.id),
  createdBy:    uuid('created_by').notNull().references(() => users.id),
  createdAt:    timestamp('created_at').notNull().defaultNow(),
  updatedAt:    timestamp('updated_at').notNull().defaultNow(),
});

export const exhibitsRelations = relations(exhibits, ({ one }) => ({
  type:    one(exhibitTypes,  { fields: [exhibits.exhibitTypeId], references: [exhibitTypes.id] }),
  gallery: one(galleries,     { fields: [exhibits.galleryId],       references: [galleries.id] }),
  museum:  one(museums,       { fields: [exhibits.museumId],        references: [museums.id] }),
}));

// ───────────────────────────────────────────────────────────────
// 4. ARTIFACTS & COPIES
// ───────────────────────────────────────────────────────────────
export const artifactTypes = pgTable('artifact_types', {
  id:   uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
});

export const artifactTypeImage = pgTable('artifact_type_image', {
  artifactTypeId: uuid('artifact_type_id').primaryKey().references(() => artifactTypes.id),
  width:          integer('width').notNull(),
  height:         integer('height').notNull(),
});

export const artifactTypeDocument = pgTable('artifact_type_document', {
  artifactTypeId: uuid('artifact_type_id').primaryKey().references(() => artifactTypes.id),
  pageCount:      integer('page_count').notNull(),
  language:       text('language').notNull(),
});

export const artifacts = pgTable('artifacts', {
  id:              uuid('id').primaryKey().defaultRandom(),
  name:            text('name').notNull(),
  sizeBytes:       integer('size_bytes').notNull(),
  fileFormat:      text('file_format').notNull(),
  datesCreated:    timestamp('dates_created').notNull(),
  datesModified:   timestamp('dates_modified').notNull(),
  artifactTypeId:  uuid('artifact_type_id').notNull().references(() => artifactTypes.id),
  exhibitId:       uuid('exhibit_id').notNull().references(() => exhibits.id),
  museumId:        uuid('museum_id').notNull().references(() => museums.id),
  createdBy:       uuid('created_by').notNull().references(() => users.id),
  createdAt:       timestamp('created_at').notNull().defaultNow(),
  updatedAt:       timestamp('updated_at').notNull().defaultNow(),
});

export const copies = pgTable('copies', {
  id:               uuid('id').primaryKey().defaultRandom(),
  name:             text('name').notNull(),
  storageType:      text('data_storage_type').notNull(), // e.g. 's3','gcs','filesystem'
  connectionString: text('path').notNull(),
  datesCreated:     timestamp('dates_created').notNull(),
  datesModified:    timestamp('dates_modified').notNull(),
  artifactId:       uuid('artifact_id').notNull().references(() => artifacts.id),
  museumId:         uuid('museum_id').notNull().references(() => museums.id),
  createdBy:        uuid('created_by').notNull().references(() => users.id),
  createdAt:        timestamp('created_at').notNull().defaultNow(),
  updatedAt:        timestamp('updated_at').notNull().defaultNow(),
});

export const artifactsRelations = relations(artifacts, ({ one, many }) => ({
  type:    one(artifactTypes, { fields: [artifacts.artifactTypeId], references: [artifactTypes.id] }),
  exhibit: one(exhibits,      { fields: [artifacts.exhibitId],      references: [exhibits.id] }),
  copies:  many(copies),
}));

// ───────────────────────────────────────────────────────────────
// 5. POLICIES & LINKING
// ───────────────────────────────────────────────────────────────
export const policyTypes = pgTable('policy_types', {
  id:   uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
});

export const policyTypeRetention = pgTable('policy_type_retention', {
  policyTypeId: uuid('policy_type_id').primaryKey().references(() => policyTypes.id),
  daysToKeep:   integer('days_to_keep').notNull(),
});

export const policyTypeAccess = pgTable('policy_type_access', {
  policyTypeId: uuid('policy_type_id').primaryKey().references(() => policyTypes.id),
  rolesAllowed: jsonb('roles_allowed').notNull(), // e.g. ["admin","viewer"]
});

export const policies = pgTable('policies', {
  id:             uuid('id').primaryKey().defaultRandom(),
  name:           text('name').notNull(),
  policyTypeId:   uuid('policy_type_id').notNull().references(() => policyTypes.id),
  museumId:       uuid('museum_id').notNull().references(() => museums.id),
  createdBy:      uuid('created_by').notNull().references(() => users.id),
  createdAt:      timestamp('created_at').notNull().defaultNow(),
  updatedAt:      timestamp('updated_at').notNull().defaultNow(),
});

export const galleryPolicies = pgTable('gallery_policies', {
  galleryId: uuid('gallery_id').notNull().references(() => galleries.id),
  policyId:  uuid('policy_id').notNull().references(() => policies.id),
}, table => ({
  pk: table.primaryKey('gallery_policies_pkey', [table.galleryId, table.policyId]),
}));

export const policiesRelations = relations(policies, ({ one, many }) => ({
  type:    one(policyTypes,    { fields: [policies.policyTypeId], references: [policyTypes.id] }),
  galleries: many(galleryPolicies),
}));