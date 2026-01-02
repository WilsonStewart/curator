import { db } from "../src/lib/db";
import { sql } from "drizzle-orm";

const dbSchemasReinit = async () => {
	try {
		await db.execute(sql`drop schema PUBLIC cascade;`);
	} catch {}
	try {
		await db.execute(sql`drop schema DRIZZLE cascade;`);
	} catch {}
	try {
		await db.execute(sql`create schema PUBLIC;`);
	} catch {}
};

dbSchemasReinit();
