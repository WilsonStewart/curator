import { integer, text, timestamp } from "drizzle-orm/pg-core";
import { museums, users } from "./drizzle-schema";

export const identityColumns = {
  id: text("id").primaryKey(),
};

export const timestampColumns = {
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  modifiedAt: timestamp("modified_at", { mode: "string" })
    .notNull()
    .defaultNow(),
};

export const ownerColumns = {
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
};

export const museumColumns = {
  museumId: text("museum_id")
    .notNull()
    .references(() => museums.id),
};
