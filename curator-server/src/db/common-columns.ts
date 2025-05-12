import { timestamp, uuid } from "drizzle-orm/pg-core";
import { museums, users } from "./schema";

export const timestampColumns = {
  createdAt: timestamp().defaultNow().notNull(),
  modifiedAt: timestamp().defaultNow().notNull(),
};

export const ownerColumns = {
    createdBy: uuid().notNull().references(() => users.id),
}

export const museumColumns = {
      museumId: uuid()
        .notNull()
        .references(() => museums.id),
}