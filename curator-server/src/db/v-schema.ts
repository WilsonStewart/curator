import { museums } from "@/db/schema";

import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const VMuseumSelect = createSelectSchema(museums);
export const VMuseumCreate = createInsertSchema(museums);