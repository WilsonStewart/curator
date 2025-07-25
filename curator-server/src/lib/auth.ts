import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { admin, apiKey, openAPI, organization } from "better-auth/plugins";
import { db } from "@/lib/db";
import env from "@/dotenv";
import { genUlid } from "@/lib/id-generators";
import { Hono } from "hono";
import {
  accounts,
  apikeys,
  sessions,
  users,
  verifications,
} from "@/schemas/drizzle-schema/drizzle-schema.better-auth";

// let betterAuthPlugins: any = [];

let betterAuthPlugins: any = [apiKey({ defaultPrefix: "curator_" })];

export const auth = betterAuth({
  advanced: {
    database: {
      generateId: genUlid,
    },
  },
  plugins:
    env.NODE_ENV === "production"
      ? betterAuthPlugins
      : [...betterAuthPlugins, openAPI()],
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: { users, sessions, accounts, verifications, apikeys },
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export const authHono = () => {
  return new Hono<{
    Variables: {
      user: typeof auth.$Infer.Session.user | null;
      session: typeof auth.$Infer.Session.session | null;
    };
  }>();
};
