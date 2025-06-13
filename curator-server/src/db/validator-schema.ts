import { museums } from "@/db/drizzle-schema";
import { validatorSchemaFactory } from "@/lib/validator-schema-factory";

import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import z from "zod";

export const VMuseumSelect = createSelectSchema(museums);
export const VMuseumInsert = createInsertSchema(museums)
  .omit({ id: true, createdAt: true, modifiedAt: true })
  .extend({
    displayName: z
      .string()
      .nonempty({ message: "displayName cannot be empty" }),
  }).shape;

export const VMuseum = validatorSchemaFactory(museums);
