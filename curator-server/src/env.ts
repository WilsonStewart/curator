import "dotenv/config";
import z from "zod";

const ZEnvSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  CURATOR_MODE: z.enum(["api", "super", "worker"]),
  SERVER_PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
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
