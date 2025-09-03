import "dotenv/config";
import z from "zod";

const ZEnvSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  CURATOR_MODE: z.enum(["api", "boss", "worker"]),
  SERVER_URL: z.string().url(),
  SERVER_PORT: z.coerce.number().min(2),
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  REDIS_URL: z.string().url(),
  REDIS_PORT: z.coerce.number().min(2),
  REDIS_PASSWORD: z.string(),
});

// const VEnv = type({
//   NODE_ENV: type.enumerated("production", "development"),
//   CURATOR_MODE: type.enumerated("api", "super", "worker"),
//   SERVER_PORT: "string.integer",
//   DATABASE_URL: "string.url",
// });

const { data: env, error } = ZEnvSchema.safeParse(process.env);
// const env = VEnv.assert(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(error.flatten());
  process.exit(1);
}
// if (env instanceof type.errors) {
//   console.error("❌ Invalid env:");
//   console.error(env.summary);
//   process.exit(1);
// }

export default env!;
