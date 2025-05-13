import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("dev"),
  SERVER_PORT: z.coerce.number().default(3100),
  DATABASE_URL: z.string().url(),
});

export type env = z.infer<typeof EnvSchema>;
