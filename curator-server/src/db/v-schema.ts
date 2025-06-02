import { museums } from "@/db/schema";

import { createSelectSchema } from "drizzle-arktype";

export const VMuseumSelect = createSelectSchema(museums);