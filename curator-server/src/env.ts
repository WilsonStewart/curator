import { z } from "zod";
import "dotenv/config";

const ZEnvSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  CURATOR_MODE: z.enum(["api", "supervisor", "worker"]),
  SERVER_PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
});

// eslint-disable-next-line ts/no-redeclare
const { data: env, error } = ZEnvSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export type TEnvVars = z.infer<typeof ZEnvSchema>;

export default env!;
