import { integer, text, timestamp } from "drizzle-orm/pg-core";
import { museums, user } from "./drizzle-schema";

export const identityColumns = {
  id: text("id").primaryKey(),
};

export const timestampColumns = {
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .defaultNow(),
};

export const ownerColumns = {
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id),
};

export const museumColumns = {
  museumId: text("museum_id")
    .notNull()
    .references(() => museums.id),
};
