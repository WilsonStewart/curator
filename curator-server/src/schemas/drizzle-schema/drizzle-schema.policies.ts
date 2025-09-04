import { genUuidv7 } from "@/lib/id-generators";
import { users } from "@/schemas/drizzle-schema/drizzle-schema.better-auth";
import {
  AnyPgColumn,
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const policyTypes = pgTable("policy_types", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUuidv7();
    }),
  name: text("name").notNull().unique(),
  isAlias: boolean("is_alias").notNull().default(false),
  aliasedTypeId: uuid("aliased_type_id").references(
    (): AnyPgColumn => policyTypes.id
  ),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const policies = pgTable("policies", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => {
      return genUuidv7();
    }),
  name: text("name").notNull().unique(),
  policyTypeId: uuid("policy_type_id")
    .notNull()
    .references(() => policyTypes.id),
});
