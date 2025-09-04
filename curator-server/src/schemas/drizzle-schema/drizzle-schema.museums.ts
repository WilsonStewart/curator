import { genUuidv7 } from "@/lib/id-generators";
import { users } from "@/schemas/drizzle-schema/drizzle-schema.better-auth";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const museums = pgTable("museums", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUuidv7();
    }),
  name: text("name").notNull(),
  safeName: text("name").notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
