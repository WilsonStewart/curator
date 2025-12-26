import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { apiKey, openAPI } from "better-auth/plugins";
import { db } from "@/lib/db";
import env from "@/lib/dotenv";
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

const betterAuthPlugins: any = [apiKey({ defaultPrefix: "curator_" })];

export const auth = betterAuth({
	basePath: "/api/v1/auth",
	advanced: {
		database: {
			generateId: false,
		},
	},
	plugins:
		env.NODE_ENV === "production"
			? betterAuthPlugins
			: [
					...betterAuthPlugins,
					openAPI({
						disableDefaultReference: true,
					}),
				],
	database: drizzleAdapter(db, {
		provider: "pg",
		usePlural: true,
		schema: { users, sessions, accounts, verifications, apikeys },
	}),
	emailAndPassword: {
		enabled: true,
	},
});

export const authEnabledHono = () => {
	return new Hono<{
		Variables: {
			user: typeof auth.$Infer.Session.user | null;
			session: typeof auth.$Infer.Session.session | null;
		};
	}>();
};
