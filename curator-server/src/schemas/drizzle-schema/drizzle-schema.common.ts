// import { users } from "@/schemas/drizzle-schema/drizzle-schema.auth";
// import { museums } from "@/schemas/drizzle-schema/drizzle-schema.museums";
// import { text, timestamp } from "drizzle-orm/pg-core";

// export const identityColumns = {
//   id: text("id").primaryKey(),
// };

// export const timestampColumns = {
//   createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
//   updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
// };

// export const ownerColumns = {
//   createdBy: text("created_by")
//     .notNull()
//     .references(() => users.id),
// };

// export const museumColumns = {
//   museumId: text("museum_id")
//     .notNull()
//     .references(() => museums.id),
// };
