import { sql } from "drizzle-orm";
import { boolean, check, pgTable, text } from "drizzle-orm/pg-core";

export const metadata = pgTable(
	"metadata",
	{
		id: text("id").default("curatorMetadata").primaryKey(),
		isInitialized: boolean("is_initialized").default(false).notNull(),
		isBuiltinDataClean: boolean("is_builtin_data_clean")
			.default(false)
			.notNull(),
	},
	(table) => [check("id", sql`${table.id} = 'curatorMetadata'`)],
);
