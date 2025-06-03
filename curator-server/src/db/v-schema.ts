import { museums } from "@/db/schema";

import { createSelectSchema } from "drizzle-zod";

export const VMuseumSelect = createSelectSchema(museums);
