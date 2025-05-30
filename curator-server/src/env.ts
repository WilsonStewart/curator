import { z } from "zod";

const ZEnvSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  CURATOR_MODE: z.enum(["api", "supervisor", "worker"]),
  SERVER_PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
});

export type TEnvVars = z.infer<typeof ZEnvSchema>;