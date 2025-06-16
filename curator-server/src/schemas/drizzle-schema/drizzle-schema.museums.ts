import { genUlid } from "@/lib/id-generators";
import { users } from "@/schemas/drizzle-schema/drizzle-schema.better-auth";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const museums = pgTable("museums", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUlid();
    }),
  name: text("name").notNull().unique(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
