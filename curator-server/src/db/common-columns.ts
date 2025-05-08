import { timestamp, uuid } from "drizzle-orm/pg-core";
import { museums, users } from "./schema";

export const timestampColumns = {
  createdAt: timestamp().defaultNow().notNull(),
  modifiedAt: timestamp(),
};

export const ownerColumns = {
    createdBy: uuid('created_by').notNull().references(() => users.id),
}

export const museumColumns = {
      museumId: uuid("museum_id")
        .notNull()
        .references(() => museums.id),
}