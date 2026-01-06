import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/schemas/drizzle-schema",
	dialect: "postgresql",
	casing: "snake_case",
	dbCredentials: {
		url:
			process.env.DATABASE_URL ||
			"postgres://postgres:1234@localhost:5432/postgres",
	},
});
