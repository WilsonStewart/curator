import { museums } from "@/db/schema";

import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import z from "zod";

export const VMuseumSelect = createSelectSchema(museums);
export const VMuseumInsert = createInsertSchema(museums).omit({ eid: true, createdAt: true, modifiedAt: true }).extend({
    displayName: z
        .string()
        .nonempty({ message: "displayName cannot be empty" })
})
