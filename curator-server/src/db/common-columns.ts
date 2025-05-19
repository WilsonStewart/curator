import { bigint, integer, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { museums, users } from "./schema";

export const identityColumns = {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eid: text("eid").notNull().unique(),
};

export const timestampColumns = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  modifiedAt: timestamp("modified_at").notNull().defaultNow(),
};

export const ownerColumns = {
  createdBy: integer("created_by")
    .notNull()
    .references(() => users.id),
};

export const museumColumns = {
  museumId: integer("museum_id")
    .notNull()
    .references(() => museums.id),
};
